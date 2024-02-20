import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faTrash } from '@fortawesome/free-solid-svg-icons';
import { updateDoc, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import fetchUserProfilePicture from '../functions/fetchUserProfilePicture';
import formatTimeDifference from '../functions/formatTimeDifference';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth } from '../firebase';
import fetchUsernameWithUID from '../functions/fetchUsernameWithUID';
import { Link } from 'react-router-dom';

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

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  componentDidMount() {
    this.fetchUserData();
    this.fetchComments(); // Fetch comments and replies when component mounts
  }

  fetchComments = async () => {
    const { comment } = this.props;
    const comments = []; // Declare the comments variable here
  
    try {
      const commentsRef = collection(db, 'comments');
      const q = query(commentsRef, where('parentCommentId', '==', comment.id));
      const querySnapshot = await getDocs(q);
      console.log('Query snapshot:', querySnapshot.docs);
  
      for (const doc of querySnapshot.docs) {
        const commentData = doc.data();
        console.log('Fetching replies for comment:', commentData);
        const replies = await this.fetchReplies(doc.id); // Fetch replies for the current comment
        const commentWithReplies = { id: doc.id, ...commentData, replies };
        comments.push(commentWithReplies);
      }
  
      if (comments.length > 0) {
        const updatedReplies = comments[0].replies || [];
        this.setState({ comments, replies: updatedReplies, loadingReplies: false }); // Set replies state here
      } else {
        this.setState({ comments, loadingReplies: false });
      }
    } catch (error) {
      console.error('Error fetching comments and replies:', error);
      this.setState({ loadingReplies: false });
    }
  };
  
  fetchReplies = async (commentId) => {
    try {
      const commentDocRef = doc(db, 'comments', commentId);
      const commentDocSnap = await getDoc(commentDocRef);
  
      if (commentDocSnap.exists()) {
        const commentData = commentDocSnap.data();
        const replies = commentData.replies || [];
        console.log('Fetched replies:', replies); // Log fetched replies to the console
        return replies;
      } else {
        console.error('Comment document does not exist');
        return [];
      }
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
    const { comment, onDelete } = this.props;

    try {
      await deleteDoc(doc(db, 'comments', comment.id));

      // Log success message to console
      console.log('Comment deleted successfully.');

      // Update parent component to remove the deleted comment from its state
      onDelete(comment.id);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  handleSubmitReply = async () => {
    const { comment, currentUser } = this.props;
    const { replyText } = this.state;

    try {
      // Get reference to the comment document in Firestore
      const commentDocRef = doc(db, 'comments', comment.id);

      // Get a snapshot of the comment document
      const commentDocSnap = await getDoc(commentDocRef);

      // Check if the comment document exists
      if (commentDocSnap.exists()) {
        // Get the data of the comment document
        const commentData = commentDocSnap.data();

        // Get the current replies of the comment from the document data, or initialize an empty array if replies don't exist
        const updatedReplies = commentData.replies || [];

        // Add the new reply to the updated replies array
        updatedReplies.push({
          uid: currentUser.uid,
          text: replyText,
          createdAt: new Date(),
        });

        // Update the comment document in Firestore with the updated replies
        await updateDoc(commentDocRef, {
          replies: updatedReplies,
        });

        // Refresh comments after updating to reflect the changes
        this.fetchComments();

        // Update component state to reflect that reply submission is complete and clear the reply text input
        this.setState({
          isReplying: false,
          replyText: '',
        });
      } else {
        // Log an error if the comment document does not exist
        console.error('Comment document does not exist');
      }
    } catch (error) {
      // Log an error if there's any issue submitting the reply
      console.error('Error submitting reply:', error);
    }
  };

  render() {
    const { currentUser } = this.props;
    const { userProfilePicture, username, isReplying, replyText, replies, loadingReplies } = this.state;

    // Function to check if the current user is the author of the comment
    const isAuthor = currentUser && currentUser.uid === this.props.comment.uid;

    return (
      <li className="h-full  flex flex-row space-x-4 py-2 max-w-3/4 border">
        <Link to={`/users/${username}`} className='ml-2 w-12 h-12  m-auto '>
          {userProfilePicture && <img src={userProfilePicture} alt="Profile" className="rounded-full w-12 h-12" />}
        </Link>

        <div className="flex-grow border p-1">
          <div className="flex justify-between">
            <Link to={`/users/${username}`} className="text-lg font-bold">{username}</Link>
            <span className="text-sm text-gray-500">{formatTimeDifference(this.props.comment.createdAt)}</span>
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

          {loadingReplies && <p>Loading replies...</p>} {/* Show loading indicator while fetching replies */}

          {!loadingReplies && replies.length === 0 && <p>No replies yet.</p>} {/* Show message if no replies */}

          {replies.map(reply => (
            <div key={reply.id} className="flex flex-col items-start bg-gray-100 rounded-lg p-4 mb-4">
              <p className="text-gray-800">{reply.text}</p>
              <div className="flex items-center mt-2">
                {reply.userProfilePicture && (
                  <img src={reply.userProfilePicture} alt="User" className="w-6 h-6 rounded-full mr-2" />
                )}
                <p className="text-sm text-gray-600">Posted by: {reply.username}</p>
              </div>
            </div>
          ))}
        </div>
      </li>
    );
}
}

export default CommentComponent;
