import React, { Component } from 'react';
import formatTimeDifference from '../functions/formatTimeDifference';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { auth, db } from '../firebase';
import { doc, setDoc, collection, addDoc, deleteDoc, arrayUnion, arrayRemove, updateDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';

class NotificationItem extends Component {
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

      toast.success( this.props.fromUserId + " now follows you!");
    }
  };
  

  renderNotificationContent = () => {
    const { type, fromUserId, timestamp } = this.props;
    const formattedTime = formatTimeDifference(timestamp);

    switch (type) {
      case 'follow_request':
        return  <div className="flex">
          {fromUserId} requested to follow you.
          <br/> @{formattedTime}

          <button onClick={this.handleAccept}>
            <FontAwesomeIcon icon={faCheck} onClick={this.handleAccept} />
            Accept
          </button>
          <FontAwesomeIcon icon={faTimes} onClick={this.handleReject} />
        </div>;
      case 'like':
        return <div>{fromUserId} liked your post.</div>;
      case 'comment':
        return <div>New comment from {fromUserId}</div>;
      // Add more cases for other notification types
      default:
        return <div>Unknown notification type</div>;
    }
  };

  render() {
    const { read } = this.props;

    return (
      <div className={`${read ? 'bg-[#f0f0f0]' : 'bg-[#fff]'}`}>
        {this.renderNotificationContent()}
        <button onClick={this.handleDismiss}>Dismiss</button>
      </div>
    );
  }
}

export default NotificationItem;
