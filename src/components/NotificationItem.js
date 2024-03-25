import React, { Component } from 'react';
import formatTimeDifference from '../functions/formatTimeDifference';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { auth, db } from '../firebase';
import { doc, setDoc, collection, addDoc, deleteDoc, arrayUnion, arrayRemove, updateDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import MiniUserCard from './user/MiniUserCard';
import fetchUsernameWithUID from '../functions/fetchUsernameWithUID';
import { Link } from 'react-router-dom';

class NotificationItem extends Component {
  state = {
    showMiniUserCard: false,
    username: '',
  };

  async componentDidMount() {
    const { fromUserId } = this.props;
    const username = await fetchUsernameWithUID(fromUserId);
    this.setState({ username });
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
    const { showMiniUserCard, username } = this.state;
    

    switch (type) {
      case 'follow_request':
        return (
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold">
              {showMiniUserCard && <MiniUserCard username={username} />}
              requested to follow you.
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-1 bg-green-500 text-white rounded-full hover:bg-green-600" onClick={this.handleAccept}>
                <FontAwesomeIcon icon={faCheck} />
              </button>
              <button className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600" onClick={this.handleDismiss}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
        );
      case 'follow_accepted':
        return (
          <div>
            <Link to={`/users/${username}`} className="font-bold">
              {username}
            </Link>
             accepted your follow request.
          </div>
        );
      case 'like':
        return <div><span className="font-bold">{username}</span> liked your post.</div>;
      case 'comment':
        return <div>New comment from <span className="font-bold">{username}</span></div>;
      default:
        return <div>Unknown notification type</div>;
    }
  };

  render() {
    const { read } = this.props;
    return (
      <div className={`p-4 border m-4 w-1/2 border-gray-200 ${read ? 'bg-gray-100' : 'bg-white'}`}>
        <div className="text-sm text-gray-700">{this.renderNotificationContent()}</div>
         <button className="mt-2 text-blue-500 hover:text-blue-600" onClick={this.handleDismiss}>Dismiss</button>
      </div>
    );
  }
}
export default NotificationItem;
