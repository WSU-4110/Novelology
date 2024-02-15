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
    currentUser: PropTypes.object.isRequired,
    onReply: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.fetchUserData();
    this.fetchComments(); // Fetch comments and replies when component mounts
  }

  fetchUserData = async () => {
    const { uid } = this.props.comment;

    try {
      // Fetch user data
      const userDoc = doc(db, 'users', uid);
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
      const userProfilePicture = await fetchUserProfilePicture(uid);
      this.setState({ userProfilePicture });

      // Fetch comments and replies
      this.fetchComments();
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
  
      for (const doc of querySnapshot.docs) {
        const commentData = doc.data();
        const replies = await this.fetchReplies(doc.id); // Fetch replies for the current comment
        const commentWithReplies = { id: doc.id, ...commentData, replies };
        comments.push(commentWithReplies);
      }
  
      this.setState({ comments, loadingReplies: false });
    } catch (error) {
      console.error('Error fetching comments and replies:', error);
      this.setState({ loadingReplies: false });
    }
  };
  
  

  fetchReplies = async (commentId) => {
    try {
      const repliesRef = collection(db, 'comments', commentId); // Reference to the replies collection for a specific comment
      const q = query(repliesRef, where('parentCommentId', '==', commentId));
      const querySnapshot = await getDocs(q);
      const replies = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('Replies:', replies);
      return replies;
    } catch (error) {
      console.error('Error fetching replies:', error);
      return [];
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
      await deleteDoc(doc(db, 'comments', comment.id));

      // Log success message to console
      console.log('Comment deleted successfully.');

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

  formatTimeDifference = (timestamp) => {
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

  render() {
    const { currentUser } = this.props;
    const { userProfilePicture, username, isReplying, replyText, replies, loadingReplies } = this.state;

    // Function to check if the current user is the author of the comment
    const isAuthor = currentUser && currentUser.uid === this.props.comment.uid;

    return (
      <li className="flex items-start space-x-4 py-2 max-w-3/4">
        {userProfilePicture && <img src={userProfilePicture} alt="Profile" className="w-8 h-8 rounded-full" />}

        <div className="flex-grow border p-1">
          <div className="flex justify-between">
            <span className="">{username}</span>
            <span className="text-sm text-gray-500">{this.formatTimeDifference(this.props.comment.createdAt)}</span>
          </div>
          <p className="text-sm">{this.props.comment.text}</p>
          
          {isAuthor && (
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

          {/* Render replies */}
          {replies.map(reply => (
            <div key={reply.id}>
              {/* Implement rendering logic for replies here */}
            </div>
          ))}
          
        </div>
      </li>
    );
  }
}

export default CommentComponent;
