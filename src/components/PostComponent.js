import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentComponent from './CommentComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faThumbsUp, faShare } from '@fortawesome/free-solid-svg-icons';

class PostComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        comments: [], // Initialize comments array
      };
    }

  static propTypes = {
    post: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    newCommentText: PropTypes.string.isRequired,
    onAddComment: PropTypes.func.isRequired,
    onCommentChange: PropTypes.func.isRequired,
  };

  

  render() {
    const { post, comments, newCommentText, currentUser, onAddComment, onCommentChange, fetchComments } = this.props;

    // Function to format time difference
    const formatTimeDifference = (timestamp) => {
      const currentTime = new Date();
      const postTime = new Date(timestamp);
      const differenceInSeconds = Math.floor((currentTime - postTime) / 1000);
    
      if (differenceInSeconds < 60) {
        return 'just now';
      } else if (differenceInSeconds < 3600) {
        const minutes = Math.floor(differenceInSeconds / 60);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
      } else if (differenceInSeconds < 86400) {
        const hours = Math.floor(differenceInSeconds / 3600);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
      } else {
        const days = Math.floor(differenceInSeconds / 86400);
        return `${days} day${days > 1 ? 's' : ''} ago`;
      }
    };
    


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
  currentUser={currentUser} // Make sure currentUser prop is passed
  onReply={this.handleReply} // Assuming this is how you handle replies
/>


))}
          </ul>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onAddComment(post.id); }}>
          <input type="text" value={newCommentText} onChange={(e) => onCommentChange(e, post.id)} placeholder="Add a comment..." />
          <button type="submit">Post</button>
        </form>
        <div>
          <button><FontAwesomeIcon icon={faComment} /> Comment</button>
          <button><FontAwesomeIcon icon={faThumbsUp} /> Like</button>
          <button><FontAwesomeIcon icon={faShare} /> Share</button>
        </div>
      </div>
    );
  }
}

PostComponent.propTypes = {
    post: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    newCommentText: PropTypes.string.isRequired,
    onAddComment: PropTypes.func.isRequired,
    onCommentChange: PropTypes.func.isRequired,
  };
  
  export default PostComponent;