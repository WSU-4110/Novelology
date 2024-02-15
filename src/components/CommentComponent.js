import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faTrash } from '@fortawesome/free-solid-svg-icons';
import { updateDoc, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import fetchUserProfilePicture from '../functions/fetchUserProfilePicture';
import ReplyItem from './ReplyItem';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth } from '../firebase';
import fetchUsernameWithUID from '../functions/fetchUsernameWithUID';

class CommentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfilePicture: null,
      username: '',
      isReplying: false,
      replyText: '',
      replies: [],
      loadingReplies: true, // Set to true initially
    };
  }

  static propTypes = {
    comment: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    onReply: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.fetchUserData();
    this.fetchComments(); // Fetch comments and replies when component mounts
  }

  fetchUserData = async () => {
    const { comment } = this.props;

    try {
      // Fetch user data
      const userDoc = doc(db, 'users', comment.uid);
      const userDocSnap = await getDoc(userDoc);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        this.setState({
          username: userData.username,
        });
      } else {
        console.error('User document does not exist');
      }

      // Fetch user profile picture
      const userProfilePicture = await fetchUserProfilePicture(comment.uid);
      this.setState({ userProfilePicture });

      // Fetch comments and replies
      this.fetchComments();
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Inside the fetchComments method of CommentComponent
  fetchComments = async () => {
    const { comment } = this.props;

    try {
      const commentsRef = collection(db, 'comments');
      const q = query(commentsRef, where('parentCommentId', '==', comment.id));
      const querySnapshot = await getDocs(q);
      const replies = [];
      querySnapshot.forEach((doc) => {
        const replyData = doc.data();
        replies.push({ id: doc.id, ...replyData });
      });

      this.setState({ replies, loadingReplies: false });
    } catch (error) {
      console.error('Error fetching replies:', error);
      this.setState({ loadingReplies: false });
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


  handleDeleteComment = async () => {
    const { comment } = this.props;

    try {
      const commentDocRef = doc(db, 'comments', comment.id);
      await deleteDoc(commentDocRef);

      // Refresh comments after deleting
      this.fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };
    

  handleSubmitReply = async () => {
    const { comment, currentUser } = this.props;
    const { replyText } = this.state;

    try {
      const commentDocRef = doc(db, 'comments', comment.id);
      const commentDocSnap = await getDoc(commentDocRef);

      if (commentDocSnap.exists()) {
        const commentData = commentDocSnap.data();
        const updatedReplies = commentData.replies || [];

        updatedReplies.push({
          uid: currentUser.uid,
          text: replyText,
          createdAt: new Date(),
        });

        await updateDoc(commentDocRef, {
          replies: updatedReplies,
        });

        // Refresh comments after updating
        this.fetchComments();

        this.setState({
          isReplying: false,
          replyText: '',
          replies: updatedReplies,
        });
      } else {
        console.error('Comment document does not exist');
      }
    } catch (error) {
      console.error('Error submitting reply:', error);
    }
  };

  render() {
    const { comment, currentUser } = this.props;
    const { userProfilePicture, username, isReplying, replyText, replies, loadingReplies } = this.state;

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
          {fetchUsernameWithUID(auth.currentUser.uid) == username && (
            <button onClick={this.handleDeleteComment} className="text-sm text-red-500 mr-1 border rounded-md">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          )}
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

          <h3>Replies</h3>
          
        </div>
      </li>
    );
  }
}

export default CommentComponent;
