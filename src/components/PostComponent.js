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
    onReply={this.handleReply}
    comments={comments} // Pass the comments prop to the CommentComponent
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