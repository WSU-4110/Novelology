import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faTrash } from '@fortawesome/free-solid-svg-icons';
import { updateDoc, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import fetchUserProfilePicture from '../functions/fetchUserProfilePicture';

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
      showReplies: false,
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

  
  

fetchReplies = async () => {
  const { comment } = this.props;

  try {
    const repliesRef = collection(db, 'comments', comment.id);
    const q = query(repliesRef, where('parentCommentId', '==', comment.id));
    const querySnapshot = await getDocs(q);
    const replies = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log('Replies:', replies);
    this.setState({ replies }); // Update state with fetched replies
  } catch (error) {
    console.error('Error fetching replies:', error);
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
    const { replyText, replies } = this.state; // Get current replies from state
  
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
          replies: updatedReplies, // Update replies state with updatedReplies
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

    // Toggle the visibility of replies
  // Toggle the visibility of replies
  handleShowReplies = () => {
    try {
      console.log('Show Replies button clicked');
      this.setState(prevState => ({
        showReplies: !prevState.showReplies,
      }));
    } catch (error) {
      console.error('Error toggling replies visibility:', error);
    }
  };
  
  render() {
    const { currentUser } = this.props;
    const { userProfilePicture, username, isReplying, replyText, replies, loadingReplies, showReplies } = this.state;
  
    console.log('showReplies:', showReplies); // Add this line
  
    // Function to check if the current user is the author of the comment
    const isAuthor = currentUser && currentUser.uid === this.props.comment.uid;
  
    return (
      <li className="h-full  flex flex-row space-x-4 py-2 max-w-3/4 border"> {/*Render comment content here*/}
        {/* Display user profile picture w/ linking to their profile */}
        <Link to={`/users/${username}`} className='ml-2 w-12 h-12  m-auto '>
          {userProfilePicture && <img src={userProfilePicture} alt="Profile" className="rounded-full w-12 h-12" />}
        </Link>
  
        {/* Display username of commenter w/ linking to their profile */}
        <div className="flex-grow border p-1">
          <div className="flex justify-between">
            <Link to={`/users/${username}`} className="text-lg font-bold">{username}</Link>
  
            {/* Display time stamp of comment */}
            <span className="text-sm text-gray-500">{this.formatTimeDifference(this.props.comment.createdAt)}</span>
          </div>
  
          {/* Display comment text */}
          <p className="text-sm">{this.props.comment.text}</p>
  
          {/* Display buttons for replying, deleting, and liking comments 
              Delete button is shown conditionally, if you are the author*/}
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
  
          {/* Render "Show Replies" button if there are replies */}
          <button className="text-sm text-gray-400 border rounded-md" onClick={this.handleShowReplies}>
            Show Replies
          </button>
  
          {showReplies && replies.map(reply => (
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
