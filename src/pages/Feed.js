import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { collection, getDocs, addDoc, query, where, getDoc, doc} from 'firebase/firestore';
import { db } from '../firebase';
import PostComponent from '../components/Posts/PostComponent';
import { FaSpinner } from 'react-icons/fa';


class Post {
  constructor(id, data) {
    this.id = id;
    this.data = data;
  }
}

class Comment {
  constructor(id, data) {
    this.id = id;
    this.uid = data.uid;
    this.text = data.text;
    this.createdAt = data.createdAt ? new Date(data.createdAt.seconds * 1000) : null;
    this.likes = data.likes || 0;
    this.parentCommentId = data.parentCommentId || null;
  }
}

class Feed extends Component {
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
  };

  state = {
    posts: [],
    filteredPosts: [],
    isLoading: false,
    allPostsFetched: false,
    comments: {},
    newComments: {},
  };

  postContainerRef = React.createRef();
  totalPosts = 0;

  componentDidMount() {
    this.fetchPosts();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  fetchPosts = async () => {
    try {
      const { posts } = this.state;
      if (this.totalPosts && posts.length >= this.totalPosts) {
        this.setState({ isLoading: false, allPostsFetched: true });
        return;
      }
      this.setState({ isLoading: true });
      await new Promise((resolve) => setTimeout(resolve, 1000));
  
      const currentUserID = this.props.currentUser.uid;
  
      // Fetch the following list and muted list from the current user document
      const userDocRef = doc(db, 'users', currentUserID);
      const userDocSnapshot = await getDoc(userDocRef);
      const userData = userDocSnapshot.exists() ? userDocSnapshot.data() : {};
      const followingList = userData.following || [];
      const mutedList = userData.muted || [];
  
      // Filter out muted users from the following list
      const filteredFollowingList = followingList.filter(userID => !mutedList.includes(userID));
  
      // Fetch posts from users in the filtered following list
      const fetchedPosts = [];
      for (const followedUserID of filteredFollowingList) {
        const q = query(collection(db, 'posts'), where('uid', '==', followedUserID));
        const userPostsSnapshot = await getDocs(q);
        userPostsSnapshot.forEach((doc) => {
          const postData = doc.data();
          const createdAt = postData.createdAt && postData.createdAt.toDate ? postData.createdAt.toDate() : null;
          const post = new Post(doc.id, {
            ...postData,
            createdAt: createdAt,
          });
          fetchedPosts.push(post);
          this.fetchCommentsForPost(post);
        });
      }
  
      // Sort fetched posts by their creation date in descending order
      fetchedPosts.sort((a, b) => b.data.createdAt - a.data.createdAt);
      this.setState((prevState) => ({
        posts: fetchedPosts, // Replace existing posts with fetched posts
        filteredPosts: [...prevState.filteredPosts, ...fetchedPosts.filter(newPost => 
          !prevState.filteredPosts.some(oldPost => oldPost.id === newPost.id)
        )], // Add fetched posts to filteredPosts, avoiding duplicates
        isLoading: false,
      }));
      this.totalPosts = fetchedPosts.length;
    } catch (error) {
      console.error('Error fetching posts:', error);
      this.setState({ isLoading: false });
    }
  };
  
  
  
  fetchCommentsForPost = async (post) => {
    try {
      const commentsRef = collection(db, 'comments');
      const q = query(commentsRef, where('postId', '==', post.id));
      const querySnapshot = await getDocs(q);
      const comments = [];
      
      querySnapshot.forEach((doc) => {
        const commentData = doc.data();
        const createdAt = commentData.createdAt;
        const comment = new Comment(doc.id, {
          ...commentData,
          createdAt: createdAt,
        });
        comments.push(comment);
      });
      
      // Sort comments by timestamp in descending order
      comments.sort((a, b) => b.createdAt - a.createdAt);
  
      console.log('Comments for post:', post.id, comments); // Log comments here
  
      this.setState((prevState) => ({
        comments: {
          ...prevState.comments,
          [post.id]: comments,
        },
      }));
    } catch (error) {
      console.error(`Error fetching comments for post ${post.id}:`, error);
      // Log error details
      console.error('Error Details:', error.message);
    }
  };
  
  
  

  handleAddComment = async (postId) => {
    const { newComments, comments } = this.state;
    const newCommentText = newComments[postId] || '';
    if (!newCommentText.trim()) return;
    try {
      const newCommentDocRef = await addDoc(collection(db, 'comments'), {
        postId,
        text: newCommentText.trim(),
        createdAt: new Date(),
        uid: this.props.currentUser.uid,
      });
      const newComment = new Comment(newCommentDocRef.id, {
        postId,
        text: newCommentText.trim(),
        createdAt: new Date(),
        uid: this.props.currentUser.uid,
      });
  
      // Prepend the new comment to the existing comments array
      const updatedComments = [newComment, ...comments[postId]];
  
      this.setState((prevState) => ({
        comments: {
          ...prevState.comments,
          [postId]: updatedComments,
        },
        newComments: {
          ...prevState.newComments,
          [postId]: '',
        },
      }));
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  // takes the event and the postId as arguments
  // immediately destructures the value from the event object
  // then updates the newComments state object with the new value for the postId.
  handleCommentChange = ({ target: { value } }, postId) =>
  this.setState(({ newComments }) => ({
    newComments: { ...newComments, [postId]: value }
  }));


  handleDeleteComment = async (deletedCommentId) => {
    const { comments } = this.state;
    const updatedComments = Object.keys(comments).reduce((acc, postId) => {
      acc[postId] = comments[postId].filter(comment => comment.id !== deletedCommentId);
      return acc;
    }, {});
    this.setState({ comments: updatedComments });
  };

  handleFilterByType = (filterType) => {
    const { posts } = this.state;
    if (filterType === 'all') {
      this.setState({ filteredPosts: posts });
    } else {
      const filtered = posts.filter((post) => post.data.postType === filterType);
      this.setState({ filteredPosts: filtered });
    }
  };

  handleSortBy = (sortByType) => {
    const { filteredPosts } = this.state;
    let sortedPosts;
  
    if (sortByType === 'newest') {
      sortedPosts = [...filteredPosts].sort((a, b) => b.data.createdAt - a.data.createdAt);
    } else if (sortByType === 'oldest') {
      sortedPosts = [...filteredPosts].sort((a, b) => a.data.createdAt - b.data.createdAt);
    } else if (sortByType === 'popularity') {
      sortedPosts = [...filteredPosts].sort((a, b) => (b.data.likes || 0) - (a.data.likes || 0));
    } else if (sortByType === 'comments') {
      sortedPosts = [...filteredPosts].sort((a, b) => (b.data.commentsCount || 0) - (a.data.commentsCount || 0));
    } else if (sortByType === 'engagement') {
      sortedPosts = [...filteredPosts].sort((a, b) => {
        const engagementA = (a.data.likes || 0) + (a.data.commentsCount || 0);
        const engagementB = (b.data.likes || 0) + (b.data.commentsCount || 0);
        return engagementB - engagementA;
      });
    } else if (sortByType === 'textLength') {
      sortedPosts = [...filteredPosts].sort((a, b) => b.data.text.length - a.data.text.length);
    } else {
      sortedPosts = filteredPosts; // Default case
    }
  
    this.setState({ filteredPosts: sortedPosts });
  };
  

  

  handleScroll = () => {
    const { isLoading, allPostsFetched } = this.state;
    const postContainer = this.postContainerRef.current;
  
    // Check if the user is scrolling near the bottom of the post container
    const isScrollingNearBottom = postContainer &&
      window.innerHeight + window.scrollY >= postContainer.offsetHeight - 100; // Adjust the offset for earlier triggering
  
    // Debounce the scroll event to avoid excessive calls
    if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      // Fetch more posts if the user is scrolling near the bottom
      if (!isLoading && !allPostsFetched && isScrollingNearBottom) {
        this.setState({ isLoading: true }); // Set loading state
        this.fetchPosts();
      }
    }, 100); // Adjust the debounce time as needed
  };

  render() {
    const { filteredPosts, isLoading, allPostsFetched, comments, newComments } = this.state;
    const { currentUser } = this.props;
  
    return (
      <div className="w-full mx-auto">
        <div className="mb-7">
          <button className="mr-2" onClick={() => this.handleFilterByType('all')}>All</button>
          <button className="mr-2" onClick={() => this.handleFilterByType('image')}>Images</button>
          <button onClick={() => this.handleFilterByType('video')}>Videos</button>
        </div>
        <div className="mb-4">
          <label className="mr-4">Sort by:</label>
          <select onChange={(e) => this.handleSortBy(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="popularity">Popularity</option>
            <option value="comments">Comments</option>
            <option value="engagement">Engagement</option>
          </select>
        </div>
        <div ref={this.postContainerRef} className="post-container" style={{ minHeight: 'calc(100vh - 100px)' }}>
          {filteredPosts.map((post, index) => (
            comments[post.id] && (
              <div key={post.id} className={`mb-8 ${index !== filteredPosts.length - 1 ? 'pb-8 border-b' : ''}`}>
                <PostComponent
                  post={post}
                  comments={comments} // Pass comments as a prop
                  newCommentText={newComments[post.id] || ''} // Pass newCommentText for this post
                  currentUser={currentUser}
                  onAddComment={this.handleAddComment} // Pass handleAddComment function
                  onCommentChange={this.handleCommentChange} // Pass handleCommentChange function
                  onDeleteComment={this.handleDeleteComment} // Pass handleDeleteComment function
                />
              </div>
            )
          ))}
          {isLoading && 
            <FaSpinner className="animate-spin w-24 h-24 align-middle text-gray-400"/>
          }
          {allPostsFetched && <p>No more posts to show</p>}
        </div>
      </div>
    );
  }
}
  
export default Feed;
