import React, { Component } from 'react';
import { collection, getDocs, doc, addDoc, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faThumbsUp, faShare } from '@fortawesome/free-solid-svg-icons';
import fetchPFP from '../functions/fetchPFP';

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
    this.createdAt = data.createdAt;
    this.likes = data.likes || 0;
    this.parentCommentId = data.parentCommentId || null; // If it's a reply, store the parent comment's ID
  }
}

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      filteredPosts: [],
      sortBy: 'time', // Default sorting by time
      isLoading: false, // Flag to track loading state
      allPostsFetched: false, // Flag to track if all posts have been fetched
      comments: {}, // Store comments for each post
      newComments: {}, // Store new comment text for each post
    };
    this.postContainerRef = React.createRef();
    this.totalPosts = 0; // Total number of posts available
  }

  componentDidMount() {
    this.fetchPosts();
    // Add scroll event listener
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    // Remove scroll event listener when component unmounts
    window.removeEventListener('scroll', this.handleScroll);
  }

  fetchPosts = async () => {
    const { posts } = this.state;
    if (this.totalPosts && posts.length >= this.totalPosts) {
      // All posts have been fetched
      this.setState({ isLoading: false, allPostsFetched: true });
      return;
    }
    // Simulate loading delay
    this.setState({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const querySnapshot = await getDocs(collection(db, 'posts'));
    const fetchedPosts = [];
    querySnapshot.forEach((doc) => {
      const post = new Post(doc.id, doc.data());
      fetchedPosts.push(post);
      this.fetchCommentsForPost(post);
    });
    // Combine existing posts with newly fetched posts
    this.setState({
      posts: [...posts, ...fetchedPosts],
      filteredPosts: [...posts, ...fetchedPosts], // Initialize filtered posts with all posts
      isLoading: false,
    });
    this.totalPosts = querySnapshot.size; // Update total number of posts available
  };

  fetchCommentsForPost = async (post) => {
    const commentsRef = collection(db, 'comments');
    const q = query(commentsRef, where('postId', '==', post.id));
    const querySnapshot = await getDocs(q);
    const comments = [];
    querySnapshot.forEach((doc) => {
      const commentData = doc.data();
      const createdAt = commentData.createdAt && commentData.createdAt.toDate();
      const comment = new Comment(doc.id, {
        ...commentData,
        // Ensure createdAt is a Date object or null
        createdAt: createdAt instanceof Date ? createdAt : null,
      });
      comments.push(comment);
    });
    this.setState((prevState) => ({
      comments: {
        ...prevState.comments,
        [post.id]: comments,
      },
    }));
  };
  
  
  handleAddComment = async (postId) => {
    const { newComments } = this.state;
    const newCommentText = newComments[postId] || '';
    if (!newCommentText.trim()) return;
    try {
      const newCommentDocRef = await addDoc(collection(db, 'comments'), {
        postId,
        text: newCommentText.trim(),
        createdAt: new Date(),
      });
      // Update local state with the new comment
      this.setState((prevState) => ({
        comments: {
          ...prevState.comments,
          [postId]: prevState.comments[postId] ? [...prevState.comments[postId], new Comment(newCommentDocRef.id, { postId, text: newCommentText.trim(), createdAt: new Date() })] : [new Comment(newCommentDocRef.id, { postId, text: newCommentText.trim(), createdAt: new Date() })],
        },
        newComments: {
          ...prevState.newComments,
          [postId]: '',
        },
      }));
    } catch (error) {
      console.error('Error adding comment: ', error);
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

  handleFilter = (filterType) => {
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
      // Fetch more posts when user scrolls to the bottom of the post container
      this.fetchPosts();
    }
  };

  // Placeholder function for rendering replies (implement as needed)
  renderReplies = (parentCommentId) => {
    // Implementation for
    // rendering replies goes here
};

// Placeholder function for handling likes on comments (implement as needed)
handleLikeComment = (commentId) => {
  // Implementation for handling likes on comments goes here
};

// Placeholder function for handling replies to comments (implement as needed)
handleReplyToComment = (commentId) => {
  // Implementation for handling replies to comments goes here
};

render() {
  const { filteredPosts, isLoading, allPostsFetched, comments, newComments } = this.state;

  return (
    <div className="feed-container">
      {/* Filter buttons */}
      <div>
        <button onClick={() => this.handleFilter('all')}>All</button>
        <button onClick={() => this.handleFilter('image')}>Images</button>
        <button onClick={() => this.handleFilter('video')}>Videos</button>
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
          <div key={post.id} className="post" style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            {/* Render post content */}
            <p>{post.data.text}</p>
            {/* Add rendering logic for file, image, video, etc. */}
            {/* Display comments for the post */}
            {comments[post.id] && (
            <div>
                <h4>Comments:</h4>
                <ul>
                {comments[post.id].map((comment) => (
                    <li key={comment.id}>
                    <div>
                        {/* Display commenter's profile picture */}
                        <img src={fetchPFP(comment.uid)} alt="Profile" style={{ width: '20px', height: '20px', borderRadius: '50%' }} />
                        {/* Display commenter's name */}
                        <span>{comment.uid}</span>
                    </div>
                    {/* Display comment text */}
                    <p>{comment.text}</p>
                    {/* Add like button and number of likes */}
                    <button onClick={() => this.handleLikeComment(comment.id)}>
                        <FontAwesomeIcon icon={faThumbsUp} /> {comment.likes}
                    </button>
                    {/* Add reply button */}
                    <button onClick={() => this.handleReplyToComment(comment.id)}>Reply</button>
                    {/* Display timestamp */}
                    <p>{comment.createdAt instanceof Date ? comment.createdAt.toLocaleString() : "Invalid Date"}</p>
                    {/* Display replies recursively */}
                    {this.renderReplies(comment.id)}
                    </li>
                ))}
                </ul>
            </div>
            )}
            {/* Add comment form */}
            <form onSubmit={(e) => { e.preventDefault(); this.handleAddComment(post.id); }}>
              <input type="text" value={newComments[post.id] || ''} onChange={(e) => this.handleCommentChange(e, post.id)} placeholder="Add a comment..." />
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

export default Feed;
