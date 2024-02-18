import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentComponent from './CommentComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faThumbsUp, faShare } from '@fortawesome/free-solid-svg-icons';
import fetchUserProfilePicture from '../functions/fetchUserProfilePicture'; // Import fetchUserProfilePicture
import fetchUsernameWithUID from '../functions/fetchUsernameWithUID'; // Import fetchUsernameWithUID

class PostComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [], // Initialize comments array
      creatorProfilePicture: null, // Store post creator's profile picture URL
      isLoadingProfilePicture: false, // Loading state for profile picture
      profilePictureError: null, // Error state for fetching profile picture
      username: null, // Store post creator's username
      isLoadingUsername: false, // Loading state for username
      usernameError: null, // Error state for fetching username
    };
  }

  // Function to format time difference
  formatTimeDifference = (timestamp) => {

    console.log("Timestamp received:", timestamp); // Log the timestamp received


    if (!timestamp) {
      return 'Unknown time';
    }

    const currentTime = new Date();
    const postTime = new Date(timestamp); // Remove seconds * 1000
    const differenceInSeconds = Math.floor((currentTime - postTime) / 1000);

    if (differenceInSeconds < 60) {
      return 'Just Now';
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

  componentDidMount() {
    this.fetchPostCreatorData(); // Fetch post creator's profile picture and username when component mounts
  }

  // Fetch the post creator's profile picture using the UID
  fetchPostCreatorData = async () => {
    const { post } = this.props;
    const { uid } = post.data;

    if (!uid) return;

    try {
      // Fetch profile picture
      this.setState({ isLoadingProfilePicture: true });
      const profilePictureURL = await fetchUserProfilePicture(uid);
      this.setState({ creatorProfilePicture: profilePictureURL });

      // Fetch username
      this.setState({ isLoadingUsername: true });
      const username = await fetchUsernameWithUID(uid);
      this.setState({ username });
    } catch (error) {
      this.setState({ profilePictureError: error.message, usernameError: error.message });
    } finally {
      this.setState({ isLoadingProfilePicture: false, isLoadingUsername: false });
    }
  };

  // Function to handle deletion of comment in parent component
  handleDeleteComment = (deletedCommentId) => {
    this.setState(prevState => ({
      comments: prevState.comments.filter(comment => comment.id !== deletedCommentId)
    }));
  };

  render() {
    const { post, comments, newCommentText, currentUser, onAddComment, onCommentChange } = this.props;
    const { creatorProfilePicture, isLoadingProfilePicture, profilePictureError, username, isLoadingUsername, usernameError } = this.state;

    return (
      <div key={post.id} className="border-b border-gray-300 pb-8 mb-8">
        {/* Post Header */}
        <div className="flex items-center mb-4 border-b border-gray-300 pb-4">
          {/* Display post creator's profile picture */}
          {isLoadingProfilePicture ? (
            <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div>
          ) : profilePictureError ? (
            <p>Error loading profile picture: {profilePictureError}</p>
          ) : (
            creatorProfilePicture && <img src={creatorProfilePicture} alt="Profile" className="w-10 h-10 rounded-full mr-4" />
          )}

          {/* Post Creator Info */}
          <div>
            {isLoadingUsername ? (
              <p>Loading username...</p>
            ) : usernameError ? (
              <p>Error loading username: {usernameError}</p>
            ) : (
              <p className="font-bold">{username}</p> 
            )}
          <p className="text-sm text-gray-500 cursor-help" title={post.data.createdAt && post.data.createdAt.toString()}>
            {this.formatTimeDifference(post.data.createdAt ? new Date(post.data.createdAt).getTime() : '')}
          </p>
          </div>
        </div>

        {/* Render post content */}
        <p>{post.data.text}</p>

        {/* Render comments */}
        <div className="border-t border-gray-300 pt-4">
          <h4>Comments:</h4>
          <ul>
            {comments[post.id].map((comment) => (
              <CommentComponent
              key={comment.id}
              comment={comment}
              comments={comments[post.id]} // Pass comments for the specific post
              onDelete={this.handleDeleteComment}
              currentUser={currentUser}
              onReply={() => this.handleReply(comment)} // Pass comment as an argument to handleReply function
            />

            ))}
          </ul>
        </div>

        {/* Form to add new comment */}
        <form onSubmit={(e) => { e.preventDefault(); onAddComment(post.id); }} className="pt-4">
          <input type="text" value={newCommentText} onChange={(e) => onCommentChange(e, post.id)} placeholder="Add a comment..." />
          <button type="submit">Post</button>
        </form>

        {/* Buttons for actions */}
        <div className="pt-4">
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
