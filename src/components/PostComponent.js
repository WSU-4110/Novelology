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

  // Function to handle deletion of comment in parent component
  handleDeleteComment = (deletedCommentId) => {
    this.setState(prevState => ({
      comments: prevState.comments.filter(comment => comment.id !== deletedCommentId)
    }));
  };

  render() {
    const { post, comments, newCommentText, currentUser, onAddComment, onCommentChange } = this.props;

    // Check if comments for the current post exist and are an array
    if (!Array.isArray(comments[post.id])) {
      console.error("Comments is not an array:", comments[post.id]);
      return (
        <div key={post.id} className="feed-container" style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <p>{post.data.text}</p>
          <h4>No comments yet.</h4>
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

    // Render post content and comments
    return (
      <div key={post.id} className="feed-container" style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
        {/* Render post content */}
        <p>{post.data.text}</p>

        <div>
          <h4>Comments:</h4>
          <ul>
            {comments[post.id].map((comment) => (
              <CommentComponent
                key={comment.id}
                comment={comment}
                comments={comments[post.id]} // Pass comments for the specific post
                onDelete={this.handleDeleteComment}
                currentUser={currentUser}
                onReply={this.handleReply}
              />
            ))}
          </ul>

        </div>

        {/* Form to add new comment */}
        <form onSubmit={(e) => { e.preventDefault(); onAddComment(post.id); }}>
          <input type="text" value={newCommentText} onChange={(e) => onCommentChange(e, post.id)} placeholder="Add a comment..." />
          <button type="submit">Post</button>
        </form>

        {/* Buttons for actions */}
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
