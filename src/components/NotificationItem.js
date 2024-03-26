import React, { Component } from 'react';
import formatTimeDifference from '../functions/formatTimeDifference';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { auth, db } from '../firebase';
import { doc, setDoc, collection, addDoc, deleteDoc, arrayUnion, arrayRemove, updateDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import MiniUserCard from './user/MiniUserCard';
import fetchUsernameWithUID from '../functions/fetchUsernameWithUID';
import { Link } from 'react-router-dom';
import fetchPFP from '../functions/fetchPFP';

class NotificationItem extends Component {
  state = {
    showMiniUserCard: false,
    username: '',
    pfpURL: '',
  };

  async componentDidMount() {
    const { fromUserId } = this.props;
    const username = await fetchUsernameWithUID(fromUserId);
    const pfpURL = await fetchPFP(fromUserId);
    this.setState({ username, pfpURL });
  }

  handleMouseEnter = () => {
    this.setState({ showMiniUserCard: true });
  };

  handleMouseLeave = () => {
    this.setState({ showMiniUserCard: false });
  };

  handleDismiss = async () => {
    const currentUser = auth.currentUser;
    const notificationId = this.props.id;
  
    try {
      // Delete the notification from the user's notifications collection
      const notificationRef = doc(db, 'users', currentUser.uid, 'notifications', notificationId);
      await deleteDoc(notificationRef);
  
      // If the notification is a follow request, delete the request from the user's requests collection
      if (this.props.type === 'follow_request') {
       //requests are stored in an array in the user's document
       // each item is just a string of the user id they are requesting to follow
        // so we can just remove the user id from the array
        const currentUserDocRef = doc(db, 'users', currentUser.uid);
        await updateDoc(currentUserDocRef, {
          requested: arrayRemove(this.props.fromUserId),
        });
      }
    } catch (error) {
      console.error('Error dismissing notification: ', error);
    }
  };

  handleMarkAsRead = async () => {
    const currentUser = auth.currentUser;
    const notificationId = this.props.id;

    try {
      const notificationRef = doc(db, 'users', currentUser.uid, 'notifications', notificationId);
      await updateDoc(notificationRef, {
        read: true,
      });
    } catch (error) {
      console.error('Error marking notification as read: ', error);
    }
  };

  handleMarkAsUnread = async () => {
    const currentUser = auth.currentUser;
    const notificationId = this.props.id;
    
    try {
      const notificationRef = doc(db, 'users', currentUser.uid, 'notifications', notificationId);
      await updateDoc(notificationRef, {
        read: false,
      });
    } catch (error) {
      console.error('Error marking notification as unread: ', error);
    }
  };
  
  handleAccept = async () => {
    if (this.props.type === 'follow_request') {
      const currentUser = auth.currentUser;
      const requesterId = this.props.fromUserId;
      const currentUserDocRef = doc(db, 'users', currentUser.uid);
      const { username } = this.state;
  
      try {
        // Add the current user to the requester's following
        const requesterFollowersRef = doc(db, 'users', requesterId);
        await updateDoc(requesterFollowersRef, {
          following: arrayUnion(currentUser.uid),
        });
  
        // Add the requester to the current user's followers field array
        await updateDoc(currentUserDocRef, {
          followers: arrayUnion(requesterId),
        });

        
  
        // Create a new notification for the requester
        const newNotificationRef = collection(db, 'users', requesterId, 'notifications');
        await addDoc(newNotificationRef, {
          type: 'follow_accepted',
          fromUserId: currentUser.uid,
          timestamp: serverTimestamp(),
          read: false,
          deletable: false,
        });
  
        // Delete the follow request notification
        this.handleDismiss();
      } catch (error) {
        console.error('Error accepting follow request: ', error);
      }

      toast.success( username + " now follows you!");
    }
  };
  

  renderNotificationContent = () => {
    const { type, fromUserId, timestamp } = this.props;
    const formattedTime = formatTimeDifference(timestamp);
    const { showMiniUserCard, username, pfpURL } = this.state;
    
    const notifText = {
      follow_request: 'accepted your follow request.',
      follow_accepted: 'is now following you.',
      like: 'liked your post.',
    };

    switch (type) {
      case 'follow_request':
        return (
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between text-center gap-2">
              <Link to={`users/${username}`} className="font-bold flex items-center">
                <img src={pfpURL} className="w-8 h-8 rounded-full mr-2" alt="Profile" />
                {username}
              </Link>
              <p>requested to follow you.</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-1 w-20 h-8 bg-green-600 text-white rounded-md hover:bg-green-200" onClick={this.handleAccept}>
                Approve
              </button>
              <button className="p-1 w-20 bg-red-600 h-8 text-white rounded-md hover:bg-red-200" onClick={this.handleDismiss}>
                Deny
              </button>
            </div>
          </div>
        );
        
      case 'follow_accepted':
        return (
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center text-center gap-2">
              <Link to={`users/${username}`} className="font-bold flex items-center">
                <img src={pfpURL} className="w-8 h-8 rounded-full mr-2" alt="Profile" />
                {username}
              </Link>
              <p>{notifText[type]}</p>
            </div>
          </div>
        );
        case 'like':
          return (
            <div className="flex items-center gap-2">
              <Link to={`users/${username}`} className="font-bold flex items-center">
              <img src={pfpURL} className="w-8 h-8 rounded-full mr-2" alt="Profile" />
              <span className="font-bold">{username}</span> 
              </Link>
              liked your post.
              <div className="flex items-center justify-center">
                <Link to={`/posts/${this.props.postId}`} className="text-blue-500 hover:underline">View Post</Link>
              </div>
            </div>
          );
        case 'comment':
          return (
            <div className="flex items-center gap-2">
              <Link to={`users/${username}`} className="font-bold flex items-center">
              <img src={pfpURL} className="w-8 h-8 rounded-full mr-2" alt="Profile" />
              <span className="font-bold">{username}</span> 
              </Link>
              commented on your post.
              <div className="flex items-center justify-center">
                <p>{this.props.commentText}</p>
                <Link to={`/posts/${this.props.postId}`} className="text-blue-500 hover:underline">View Post</Link>
              </div>
            </div>
          );
        case 'reply':
          return (
            <div className="flex items-center gap-2">
              <Link to={`users/${username}`} className="font-bold flex items-center">
              <img src={pfpURL} className="w-8 h-8 rounded-full mr-2" alt="Profile" />
              <span className="font-bold">{username}</span> 
              </Link>
              replied to your comment.
              <div className="flex items-center justify-center">
                <p>{this.props.replyText}</p>
                <Link to={`/posts/${this.props.postId}`} className="text-blue-500 hover:underline">View Post</Link>
              </div>
            </div>
          );
        case 'mention':
          return (
            <div className="flex items-center gap-2">
              <Link to={`users/${username}`} className="font-bold flex items-center">
              <img src={pfpURL} className="w-8 h-8 rounded-full mr-2" alt="Profile" />
              <span className="font-bold">{username}</span>
              </Link>
               mentioned you in a post.
              <div className="flex items-center justify-center">
                <Link to={`/posts/${this.props.postId}`} className="text-blue-500 hover:underline">View Post</Link>
              </div>
            </div>
          );
        case 'post':
          return (
            <div className="flex items-center gap-2">
              <Link to={`users/${username}`} className="font-bold flex items-center">
              <img src={pfpURL} className="w-8 h-8 rounded-full mr-2" alt="Profile" />
              <span className="font-bold">{username}</span>
              </Link>
               made a new post.
              <div className="flex items-center justify-center">
                <Link to={`/posts/${this.props.postId}`} className="text-blue-500 hover:underline">View Post</Link>
              </div>
            </div>
          );
        case 'repost':
          return (
            <div className="flex items-center gap-2">
              <Link to={`users/${username}`} className="font-bold flex items-center">
              <img src={pfpURL} className="w-8 h-8 rounded-full mr-2" alt="Profile" />
              <span className="font-bold">{username}</span> 
              </Link>
              reposted your post.
              <div className="flex items-center justify-center">
                <Link to={`/posts/${this.props.postId}`} className="text-blue-500 hover:underline">View Post</Link>
              </div>
            </div>
          );
        case 'tag':
          return (
            <div className="flex items-center gap-2">
              <Link to={`users/${username}`} className="font-bold flex items-center">
              <img src={pfpURL} className="w-8 h-8 rounded-full mr-2" alt="Profile" />
              <span className="font-bold">{username}</span>
              </Link>
               tagged you in a post.
              <div className="flex items-center justify-center">
                <Link to={`/posts/${this.props.postId}`} className="text-blue-500 hover:underline">View Post</Link>
              </div>
            </div>
          );
      default:
        return (
          <div>Unknown notification type</div>
        );
    }
    
  };

  
  render() {
    const { read, type, timestamp } = this.props;
    const { username } = this.state;
    const date = timestamp.toDate(); // Convert to JavaScript Date object
    const milliseconds = date.getTime(); // Get time in milliseconds
    const formattedTime = formatTimeDifference(milliseconds);
    const isDeletable = type !== 'follow_request';

    return (
      <div className={`p-4 border m-4 border-gray-200 ${read ? 'bg-gray-100' : 'bg-white'}`}>
        <div className="flex justify-between items-start">
          <div className="text-sm text-gray-700">
            {this.renderNotificationContent()}
          </div>
          <div>
            {isDeletable && (
              <button className="text-red-400 hover:text-gray-800" onClick={this.handleDismiss}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            )}
          </div>
        </div>
        <div className="text-xs text-gray-500 text-right mt-2">
          {formattedTime}
        </div>
        <div className="flex justify-end mt-4">
          {read ? (
          <button className="bg-gray-200 rounded-md p-1 text-gray-500 hover:text-gray-800" onClick={this.handleMarkAsUnread}>
            Mark as Unread
          </button>
          ) : (
          <button className="bg-green-200 rounded-md p-1 text-green-500 hover:text-green-800" onClick={this.handleMarkAsRead}>
            Mark as Read
          </button>
          )}
        </div>
      </div>
    );
  }
}
export default NotificationItem;
