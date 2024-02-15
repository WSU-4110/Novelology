import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import { updateDoc, doc, getDoc } from 'firebase/firestore'; // Correct import path for Firestore functions
import { db } from '../firebase'; // Assuming '../firebase' is the correct relative path to your Firebase configuration
import fetchUserProfilePicture from '../functions/fetchUserProfilePicture'; // Assuming '../functions/fetchUserProfilePicture' is the correct relative path to your function
import CommentItem from './CommentItem'; // Assuming './CommentItem' is the correct relative path to your CommentItem component
import { collection, getDocs, query, where } from 'firebase/firestore'; // Correct import path for Firestore functions

class CommentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfilePicture: null,
      username: '',
      isReplying: false,
      replyText: '',
      replies: props.comment.replies || [], // Initialize replies state with comment's replies
      showReplies: false,
      comments: [], // Initialize comments array
    };
  }

  static propTypes = {
    comment: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    onReply: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.fetchUserData();
    this.fetchComments(); // Fetch comments for this comment
  }

  fetchUserData = async () => {
    const { comment } = this.props;

    try {
      const userDoc = doc(db, 'users', comment.uid); // Assuming 'users' is the collection name
      const userDocSnap = await getDoc(userDoc);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        this.setState({
          username: userData.username,
        });
      } else {
        console.error('User document does not exist');
      }

      const userProfilePicture = await fetchUserProfilePicture(comment.uid);
      this.setState({ userProfilePicture });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  fetchComments = async () => {
    const { comment } = this.props;

    try {
      const commentsRef = collection(db, 'comments');
      const q = query(commentsRef, where('parentCommentId', '==', comment.id));
      const querySnapshot = await getDocs(q);
      const comments = [];
      querySnapshot.forEach((doc) => {
        // Assuming each comment document has a 'text' field
        const commentData = doc.data();
        comments.push({ id: doc.id, text: commentData.text });
      });
      this.setState({ comments, loading: false });
    } catch (error) {
      console.error('Error fetching comments:', error);
      this.setState({ error: 'Error fetching comments', loading: false });
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

        this.setState({
          isReplying: false,
          replyText: '',
          showReplies: true, // Show replies after submitting a new reply
          comments: [...this.state.comments, { text: replyText, createdAt: new Date(), replies: [] }], // Add the new reply to the comments array
        });
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
    const { userProfilePicture, username, isReplying, replyText, showReplies, comments } = this.state;

    const formatTimeDifference = (timestamp) => {
      if (isNaN(timestamp)) {
        return 'Just Now';
      }
    
      const currentTime = new Date();
      const commentTime = new Date(timestamp);
      const differenceInSeconds = Math.floor((currentTime - commentTime) / 1000);
    
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
      <li className="flex items-start space-x-4 py-2 max-w-3/4">
        {userProfilePicture && <img src={userProfilePicture} alt="Profile" className="w-8 h-8 rounded-full" />}

        <div className="flex-grow border p-1">
          <div className="flex justify-between">
            <span className="">{username}</span>
            <span className="text-sm text-gray-500">{formatTimeDifference(comment.createdAt)}</span>

          </div>
          <p className="text-sm">{comment.text}</p>

          {/* Button and input for replying */}
          {!isReplying && (
            <button onClick={this.handleReply} className="text-sm text-gray-400 mr-1 border rounded-md">
              <FontAwesomeIcon icon={faReply} />
            </button>
          )}

          {isReplying && (
            <div>
              <input type="text" value={replyText} onChange={this.handleReplyTextChange} placeholder="Reply to this comment..." />
              <button onClick={this.handleSubmitReply}>Submit</button>
              <button onClick={this.handleCloseReply}>Cancel</button>
            </div>
          )}

          {/* Show/hide replies */}
          <button onClick={this.toggleShowReplies} className="text-sm text-blue-500">
            {showReplies ? 'Hide Replies' : `Show ${comments.length} Replies`}
          </button>

          {/* Render replies */}
          {showReplies && (
            <div style={{ borderLeft: '2px solid #ccc', paddingLeft: '8px', marginTop: '8px' }}>
              {comments.map((reply, index) => (
                <CommentItem
                  key={index}
                  comment={reply}
                  userProfilePicture={null} // Pass userProfilePicture as per your data structure
                  username={currentUser.displayName} // Pass username as per your data structure
                  formatTimeDifference={(timestamp) => formatTimeDifference(timestamp)} // Pass formatTimeDifference function
                />
              ))}
            </div>
          )}
        </div>
      </li>
    );
  }
}

export default CommentComponent;
