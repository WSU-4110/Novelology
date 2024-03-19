import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentComponent from './CommentComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import fetchUsernameWithUID from '../../functions/fetchUsernameWithUID';
import { Link } from 'react-router-dom';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import PostOptionsPopup from './PostOptionsPopup';
import ReactDOM from 'react-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import formatTimeDifference from '../../functions/formatTimeDifference';
import fetchPFP from '../../functions/fetchPFP';
import { runTransaction } from 'firebase/firestore';
import LazyImage from '../shared/LazyImage';
import DOMPurify from 'dompurify';

class PostComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      creatorProfilePicture: null,
      isLoadingProfilePicture: false,
      profilePictureError: null,
      username: null,
      isLoadingUsername: false,
      usernameError: null,
      showPostOptionsPopup: false,
      liked: null, // Initialize liked state to null
    };
    this.popupContainer = document.createElement('div');
    document.body.appendChild(this.popupContainer);
    this.togglePostOptionsPopup = this.togglePostOptionsPopup.bind(this);
  }

  componentDidMount() {
    this.fetchPostCreatorData();
    this.checkLikedState(); // Move the checkLikedState call here
    
  }

  

  componentDidUpdate(prevProps) {
    if (prevProps.post.id !== this.props.post.id) {
      this.fetchPostCreatorData();
      this.checkLikedState();
    }
  }
  
  
  toggleLike = async () => {
    const { post, currentUser } = this.props;
    const currentUserId = currentUser.uid;
    const postRef = doc(db, 'posts', post.id);
  
    try {
      // Ensures atomic read-modify-write operations in Firestore
      // Locks documents to prevent concurrent modifications
      // Retries automatically if conflicts occur
      // Allows handling errors gracefully
      await runTransaction(db, async (transaction) => {
        const postDoc = await transaction.get(postRef);
        const postData = postDoc.data();
  
        let likedBy = postData.likedBy || [];
        let currentLikes = postData.likes || 0;
        let liked = likedBy.includes(currentUserId);
  
        if (liked) {
          // Unlike the post
          currentLikes--;
          likedBy = likedBy.filter(uid => uid !== currentUserId);
        } else {
          // Like the post
          currentLikes++;
          likedBy.push(currentUserId);
        }
  
        // Update the Firestore document
        transaction.update(postRef, { likedBy, likes: currentLikes });
  
        // Update the state with the new number of likes and liked state
        this.setState({ likedBy, likes: currentLikes, liked: !liked });
      });
  
      console.log("Firebase document updated successfully");
    } catch (error) {
      console.error("Error updating Firebase document:", error);
    }
  };
  
  
  
  
  
  
  
  checkLikedState = async () => {
    const { post, currentUser } = this.props;
    const currentUserId = currentUser.uid;
  
    try {
      const postRef = doc(db, 'posts', post.id);
      const docSnap = await getDoc(postRef);
  
      if (docSnap.exists()) {
        const postData = docSnap.data();
        const likedBy = postData.likedBy || [];
  
        const liked = likedBy.includes(currentUserId);
        this.setState({ liked });
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching liked state:", error);
    }
  };
  
  
  
  
    
  togglePostOptionsPopup = () => {
    this.setState(prevState => ({
      showPostOptionsPopup: !prevState.showPostOptionsPopup,
    }));
  };
  

  // Fetch the post creator's profile picture using the UID
  fetchPostCreatorData = async () => {
    const { post } = this.props;
    const { uid } = post.data;

    if (!uid) return;
        
    try {
// Fetch profile picture
      this.setState({ isLoadingProfilePicture: true });
      const profilePictureURL = await fetchPFP(uid);
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
    const { showPostOptionsPopup } = this.state;
    const { liked, likes} = this.state;

    const defaultProfilePicture = require('../../assets/default-profile-picture.jpg');

    return (
      <div key={post.id} className="border p-4 border-gray-300 pb-8 mb-8">
        {/* Post Header */}
        <div className="flex flex-row items-center mb-4 border-b border-gray-300 pb-4">
          {/* Display post creator's profile picture */}

          <Link to={`/users/${username}`} className=' '>
          <LazyImage
            src={creatorProfilePicture || defaultProfilePicture}
            alt="Profile"
            width={40} // Adjust the width as needed
            height={40} // Adjust the height as needed
            className="rounded-full" // Apply rounded styling
          />
        </Link>

          {/* Post Creator Info */}
          <div>
            {isLoadingUsername ? (
              <p>Loading username...</p>
            ) : usernameError ? (
              <p>Error loading username: {usernameError}</p>
            ) : (
              <Link to={`/users/${username}`} className="text-lg font-semibold">
                <span className='text-blue-400'> @</span>{username}
              </Link>
            )}
            <p className="text-sm text-gray-500 cursor-help" title={post.data.createdAt && post.data.createdAt.toString()}>
              {formatTimeDifference(post.data.createdAt ? new Date(post.data.createdAt).getTime() : '')}
            </p>
          </div>

          {/* Options button */}
          <button onClick={this.togglePostOptionsPopup}
          className="float-right">
            <FontAwesomeIcon icon={faEllipsisH} />
          </button>
          {showPostOptionsPopup && ReactDOM.createPortal(
            <PostOptionsPopup onClose={this.togglePostOptionsPopup} postId={post.id}/>,
            this.popupContainer
          )}
        </div>

        {/* Render media component if available */}
        {post.data.image && (
          <LazyImage src={post.data.image} alt="Post Image" className="max-w-full mb-4 border m-auto" />
        )}


        {/* Render post content and JSON purify it */}
        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.data.text) }} />

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
          <div>
          <button onClick={this.toggleLike}>
        <FontAwesomeIcon icon={faHeart} style={{ color: liked ? 'blue' : 'gray' }} />
        {liked ? ' Unlike' : ' Like'} {/* Toggle text based on whether the post is liked */}
        {likes >= 0 && <span>{likes}</span>} {/* Display number of likes if it's not negative */}
      </button>

        </div>
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
