import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faTrash } from '@fortawesome/free-solid-svg-icons';
import { updateDoc, doc, getDoc, deleteDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import fetchUserProfilePicture from '../../functions/fetchUserProfilePicture';
import formatTimeDifference from '../../functions/formatTimeDifference';
import { Link } from 'react-router-dom';

class CommentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfilePicture: null,
      username: '',
      isReplying: false,
      replyText: '',
      replies: [], // Array to store direct replies to this comment
      loadingReplies: true,
    };
  }

  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.fetchUserData();
    this.fetchReplies();
  }

  fetchUserData = async () => {
    const { uid } = this.props.comment;

    try {
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

      const userProfilePicture = await fetchUserProfilePicture(uid);
      this.setState({ userProfilePicture });

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  fetchReplies = async () => {
    const { comment } = this.props;
    const replies = [];
  
    try {
      // Fetch the comment document from Firestore
      const commentDocRef = doc(db, 'comments', comment.id);
      const commentDocSnap = await getDoc(commentDocRef);
  
      if (commentDocSnap.exists()) {
        const commentData = commentDocSnap.data();
        const nestedReplies = commentData.replies || []; // Array of nested replies
  
        // Iterate through each nested reply and add it to the replies array
        for (const nestedReply of nestedReplies) {
          // Fetch user profile picture for the nested reply author
          const userProfilePicture = await fetchUserProfilePicture(nestedReply.uid);
          
          // Push the nested reply with additional data (profile picture) to the replies array
          replies.push({
            id: nestedReply.id, // Assuming each nested reply has its own unique ID
            ...nestedReply,
            userProfilePicture,
          });
        }
  
        // Update the state with the fetched replies
        this.setState({ replies, loadingReplies: false });
      } else {
        console.error('Comment document does not exist');
        this.setState({ loadingReplies: false });
      }
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

        this.fetchReplies();
        this.setState({
          isReplying: false,
          replyText: '',
        });
      } else {
        console.error('Comment document does not exist');
      }
    } catch (error) {
      console.error('Error submitting reply:', error);
    }
  };

  handleDeleteComment = async () => {
    const { comment, onDelete } = this.props;

    try {
      await deleteDoc(doc(db, 'comments', comment.id));
      console.log('Comment deleted successfully.');
      onDelete(comment.id);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  handleDeleteReply = async (replyId) => {
    try {
      const { comment } = this.props;
      const commentDocRef = doc(db, 'comments', comment.id);
      const commentDocSnap = await getDoc(commentDocRef);
  
      if (commentDocSnap.exists()) {
        const commentData = commentDocSnap.data();
        const updatedReplies = commentData.replies.filter(reply => reply.id !== replyId);
  
        await updateDoc(commentDocRef, {
          replies: updatedReplies,
        });
  
        // Fetch replies again to reflect changes
        this.fetchReplies();
      } else {
        console.error('Comment document does not exist');
      }
    } catch (error) {
      console.error('Error deleting reply:', error);
    }
  };
  

  renderReplies = (replies) => {
    const { currentUser } = this.props;
  
    return replies.map(reply => (
      <div key={reply.id} className="flex flex-col items-start bg-gray-100 rounded-lg p-4 mb-4">
        <p className="text-gray-800">{reply.text}</p>
        <div className="flex items-center mt-2">
          {reply.userProfilePicture && (
            <img src={reply.userProfilePicture} alt="User" className="w-6 h-6 rounded-full mr-2" />
          )}
          <p className="text-sm text-gray-600">Posted by: {reply.username}</p>
          <p className="text-sm text-gray-600 ml-auto">{formatTimeDifference(reply.createdAt)}</p> {/* Timestamp */}
          {/* Delete button */}
          {currentUser && currentUser.uid === reply.uid && (
            <button onClick={() => this.handleDeleteReply(reply.id)} className="text-sm text-red-500 border rounded-md ml-2">
              Delete
            </button>
          )}
        </div>
        {/* Recursively render nested replies */}
        {reply.replies && this.renderReplies(reply.replies)}
      </div>
    ));
  };
  

render() {
  const { currentUser, comment } = this.props;
  const { userProfilePicture, username, isReplying, replyText, replies, loadingReplies } = this.state;
  const isAuthor = currentUser && currentUser.uid === comment.uid;

  return (
    <li className="flex flex-row space-x-4 py-2 border">
      <Link to={`/users/${username}`} className="w-12 h-12 m-auto">
        {userProfilePicture && <img src={userProfilePicture} alt="Profile" className="rounded-full w-12 h-12" />}
      </Link>

      <div className="flex-grow border p-4">
        <div className="flex justify-between">
          <Link to={`/users/${username}`} className="text-lg font-bold">{username}</Link>
          <span className="text-sm text-gray-500">{formatTimeDifference(comment.createdAt)}</span>
        </div>

        <p className="text-sm">{comment.text}</p>

        {isAuthor && (
          <button onClick={this.handleDeleteComment} className="text-sm text-red-500 border rounded-md">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}

        {!isReplying && (
          <button onClick={this.handleReply} className="text-sm text-gray-400 border rounded-md">
            <FontAwesomeIcon icon={faReply} />
          </button>
        )}

        {isReplying && (
          <div>
            <input type="text" value={replyText} onChange={this.handleReplyTextChange} placeholder="Reply to this comment..." />
            <button onClick={this.handleSubmitReply} className="text-sm border rounded-md">Submit</button>
            <button onClick={this.handleCloseReply} className="text-sm border rounded-md">Cancel</button>
          </div>
        )}

        {loadingReplies && <p>Loading replies...</p>}

        {/* Render replies */}
        {replies.length > 0 && !loadingReplies && this.renderReplies(replies)}

        {/* Show message if no replies */}
        {!loadingReplies && replies.length === 0 && <p>No replies yet.</p>}
      </div>
    </li>
  );
}

}

export default CommentComponent;
