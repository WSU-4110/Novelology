import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faThumbsUp, faShare } from '@fortawesome/free-solid-svg-icons';
import fetchUserProfilePicture from '../functions/fetchUserProfilePicture'; // Import the function here
import { doc, getDoc } from 'firebase/firestore';
import { serverTimestamp, updateDoc } from 'firebase/firestore';
import fetchUsernameWithUID from '../functions/fetchUsernameWithUID';

// Define Post class
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
    this.likes = data.likes || 0; // New property to store the number of likes
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
      const querySnapshot = await getDocs(collection(db, 'posts'));
      const fetchedPosts = [];
      querySnapshot.forEach((doc) => {
        const postData = doc.data();
        const createdAt = postData.createdAt ? postData.createdAt.toDate() : null; // Convert Firestore timestamp to JavaScript Date object
        const post = new Post(doc.id, {
          ...postData,
          createdAt: createdAt, // Assign converted createdAt value
        });
        fetchedPosts.push(post);
        this.fetchCommentsForPost(post);
      });
      this.setState({
        posts: [...posts, ...fetchedPosts],
        filteredPosts: [...posts, ...fetchedPosts],
        isLoading: false,
      });
      this.totalPosts = querySnapshot.size;
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
        const createdAt = commentData.createdAt; // Keep original createdAt value
        const comment = new Comment(doc.id, {
          ...commentData,
          createdAt: createdAt, // Assign original createdAt value
        });
        comments.push(comment);
      });
      this.setState((prevState) => ({
        comments: {
          ...prevState.comments,
          [post.id]: comments,
        },
      }));
    } catch (error) {
      console.error(`Error fetching comments for post ${post.id}:`, error);
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
        uid: this.props.currentUser.uid, // Assuming currentUser is available from props
      });
      const newComment = new Comment(newCommentDocRef.id, {
        postId,
        text: newCommentText.trim(),
        createdAt: new Date(),
        uid: this.props.currentUser.uid,
      });
      this.setState((prevState) => ({
        comments: {
          ...prevState.comments,
          [postId]: [...(prevState.comments[postId] || []), newComment], // Add the new comment to the comments array for the post
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
  
  handleCommentChange = (e, postId) => {
    const { value } = e.target;
    this.setState((prevState) => ({
      newComments: {
        ...prevState.newComments,
        [postId]: value,
      },
    }));
  };
  
  
  handleFilterByType = (filterType) => {
    const { posts } = this.state;
    if (filterType === 'all') {
      this.setState({ filteredPosts: posts });
    } else {
      const filtered = posts.filter((post) => post.data.type === filterType);
      this.setState({ filteredPosts: filtered });
    }
  };

  handleSortBy = (sortByType) => {
    const { filteredPosts } = this.state;
    let sortedPosts;
    if (sortByType === 'time') {
      sortedPosts = [...filteredPosts].sort((a, b) => b.data.createdAt - a.data.createdAt);
    } else if (sortByType === 'popularity') {
      // Implement sorting by popularity logic
    }
    this.setState({ filteredPosts: sortedPosts });
  };

  handleScroll = () => {
    const postContainer = this.postContainerRef.current;
    if (!this.state.isLoading && !this.state.allPostsFetched && postContainer && window.innerHeight + window.scrollY >= postContainer.offsetHeight) {
      this.fetchPosts();
    }
  };

  render() {
    const { filteredPosts, isLoading, allPostsFetched, comments, newComments } = this.state;
    const { currentUser } = this.props;

    return (
      <div className="max-w-md">
        {/* Filter buttons */}
        <div>
          <button onClick={() => this.handleFilterByType('all')}>All</button>
          <button onClick={() => this.handleFilterByType('image')}>Images</button>
          <button onClick={() => this.handleFilterByType('video')}>Videos</button>
          {/* Add more filter buttons for other post types */}
        </div>

        {/* Sort by buttons */}
        <div>
          <button onClick={() => this.handleSortBy('time')}>Sort by Time</button>
          <button onClick={() => this.handleSortBy('popularity')}>Sort by Popularity</button>
        </div>

        {/* Post container */}
        <div ref={this.postContainerRef} className="post-container" style={{ minHeight: 'calc(100vh - 100px)' }}>
          {filteredPosts.map((post) => (
            <PostComponent
              key={post.id}
              post={post}
              comments={comments[post.id] || []}
              newCommentText={newComments[post.id] || ''}
              currentUser={currentUser}
              onAddComment={this.handleAddComment}
              onCommentChange={(e) => this.handleCommentChange(e, post.id)}
            />
          ))}
          {/* Loading indicator */}
          {isLoading && <p>Loading...</p>}
          {/* All posts have been fetched */}
          {allPostsFetched && <p>No more posts to show</p>}
        </div>
      </div>
    );
  }
}

class PostComponent extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired,
    newCommentText: PropTypes.string.isRequired,
    currentUser: PropTypes.object.isRequired,
    onAddComment: PropTypes.func.isRequired,
    onCommentChange: PropTypes.func.isRequired,
  };

  render() {
    const { post, comments, newCommentText, currentUser, onAddComment, onCommentChange } = this.props;

    return (
      <div key={post.id} className="post" style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
        {/* Render post content */}
        <p>{post.data.text}</p>
        {/* Add rendering logic for file, image, video, etc. */}
        {/* Display comments for the post */}
        <div>
          <h4>Comments:</h4>
          <ul>
            {comments.map((comment) => (
              <CommentComponent
                key={comment.id}
                comment={comment}
                currentUser={currentUser}
                onReply={this.handleReply} // Pass the handleReply function as a prop
              />
            ))}
          </ul>
        </div>
        {/* Add comment form */}
        <form onSubmit={(e) => { e.preventDefault(); onAddComment(post.id); }}>
          <input type="text" value={newCommentText} onChange={(e) => onCommentChange(e, post.id)} placeholder="Add a comment..." />
          <button type="submit">Post</button>
        </form>
        {/* Add action buttons */}
        <div>
          <button>
            <FontAwesomeIcon icon={faComment} /> Comment
          </button>
          <button>
            <FontAwesomeIcon icon={faThumbsUp} /> Like
          </button>
          <button>
            <FontAwesomeIcon icon={faShare} /> Share
          </button>
        </div>
      </div>
    );
  }
}

class CommentComponent extends Component {
  state = {
    userProfilePicture: null,
    username: '', // Initialize username as an empty string
    isReplying: false,
    replyText: '',
    replies: [],
    showReplies: false, // New state variable to track whether replies should be shown or hidden
  };
  fetchUserData = async () => {
    const { comment } = this.props;
  
    try {
      console.log('Comment UID:', comment.uid); // Check the value of comment.uid
      console.log('DB instance:', db); // Check the db instance
  
      const userDoc = doc(db, 'users', comment.uid);
      console.log('User Doc:', userDoc); // Check the userDoc variable
  
      const userDocSnap = await userDoc.get();
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        this.setState({
          username: userData.username,
        });
      }
      const userProfilePicture = await fetchUserProfilePicture(comment.uid);
      this.setState({ userProfilePicture });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  


  componentDidMount() {
    this.fetchUserData();
    this.fetchReplies();
  }

  fetchReplies = async () => {
    const { comment } = this.props;

    try {
      const commentDocRef = doc(db, 'comments', comment.id);
      const commentDocSnap = await getDoc(commentDocRef);

      if (commentDocSnap.exists()) {
        const commentData = commentDocSnap.data();
        const replies = commentData.replies || [];

        this.setState({ replies });
      } else {
        console.error('Comment document does not exist');
      }
    } catch (error) {
      console.error('Error fetching replies:', error);
    }
  };

  handleReply = () => {
    this.setState({ isReplying: true });
  };

  handleCloseReply = () => {
    this.setState({ isReplying: false, replyText: '' });
  };

  handleReplyTextChange = (e) => {
    this.setState({ replyText: e.target.value });
  };

  handleSubmitReply = async () => {
    const { comment } = this.props;
    const { replyText } = this.state;
    const { uid } = this.props.currentUser;

    try {
      const commentDocRef = doc(db, 'comments', comment.id);
      const commentDocSnap = await getDoc(commentDocRef);
      if (commentDocSnap.exists()) {
        const commentData = commentDocSnap.data();
        let updatedReplies = commentData.replies || [];
        updatedReplies.push({
          uid,
          text: replyText,
          createdAt: new Date(),
        });

        await updateDoc(commentDocRef, {
          replies: updatedReplies,
        });

        this.setState((prevState) => ({
          isReplying: false,
          replyText: '',
          replies: updatedReplies,
        }));
      } else {
        console.error('Comment document does not exist');
      }
    } catch (error) {
      console.error('Error submitting reply:', error);
    }
  };

  toggleShowReplies = () => {
    this.setState((prevState) => ({
      showReplies: !prevState.showReplies,
    }));
  };

  render() {
    const { comment, currentUser } = this.props;
    const { userProfilePicture, username, isReplying, replyText, replies, showReplies, createdAt } = this.state;

    const formatTimeDifference = (timestamp) => {
      const now = new Date();
      const diff = Math.floor((now - timestamp) / 1000); // Difference in seconds
      if (diff < 60) {
        return 'just now';
      } else if (diff < 3600) {
        return `${Math.floor(diff / 60)} minutes ago`;
      } else if (diff < 86400) {
        return `${Math.floor(diff / 3600)} hours ago`;
      } else {
        // Return the formatted date if it's more than a day old
        return createdAt instanceof Date ? createdAt.toLocaleString() : 'Invalid Date';
      }
    };


    return (
      <li className="flex items-start space-x-4 py-2 max-w-3/4">
        {userProfilePicture && <img src={userProfilePicture} alt="Profile" className="w-8 h-8 rounded-full" />}

        <div className="flex-grow">
          <div className="flex justify-between">
            <span className="font-bold">{username || comment.uid}</span>
            <span className="text-sm text-gray-500">{comment.createdAt instanceof Date ? comment.createdAt.toLocaleString() : 'Invalid Date'}</span>
          </div>
          <p className="text-sm">{comment.text}</p>

          <button onClick={this.handleReply} className="text-sm text-blue-500">
            Reply
          </button>

          {isReplying && (
            <div>
              <input type="text" value={replyText} onChange={this.handleReplyTextChange} placeholder="Reply to this comment..." />
              <button onClick={this.handleSubmitReply}>Submit</button>
              <button onClick={this.handleCloseReply}>Cancel</button>
            </div>
          )}

          {replies.length > 0 && !showReplies && (
            <button onClick={this.toggleShowReplies} className="text-sm text-blue-500">
              Show Replies
            </button>
          )}

          {showReplies && (
            <div>
              <ul>
                {replies.map((reply, index) => (
                  <li key={index}>{reply.text}</li>
                ))}
              </ul>
              <button onClick={this.toggleShowReplies} className="text-sm text-blue-500">
                Hide Replies
              </button>
            </div>
          )}

          {replies.length > 0 && (
            <div style={{ borderLeft: '2px solid #ccc', paddingLeft: '8px', marginTop: '8px' }}>
              {/* Vertical line to indicate replies */}
              {showReplies && (
                <ul>
                  {replies.map((reply, index) => (
                    <li key={index}>{reply.text}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </li>
    );
  }
}

CommentComponent.propTypes = {
  comment: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
};


export default Feed;
