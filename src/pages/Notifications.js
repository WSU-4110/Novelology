// A page to allow users to view their notifications
// they can click on a notification to view object
// they can dismiss and ignore notifications
// they can clear all notifications
// they can mark all notifications as read
// they can view the number of unread notifications
// they can view the number of total notifications
// they can view the number of each type of notification
// they can view the time of each notification 
// they can view the type of each notification

// notifications are stored in a collection the currently authed users document under 'notifications'
// the following notification types are supported:
// - follow_request
// - like
// - comment
// - reply
// - mention
// - post
// - repost
// - tag
import React, { Component } from 'react';
import { db } from "../firebase";
import NotificationItem from "../components/NotificationItem";
import { collection } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import {auth } from "../firebase";
import { doc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";

class Notifications extends Component {
  state = {
    notifications: [],
    unreadCount: 0,
    totalCount: 0,
  };

  componentDidMount() {
    const user = auth.currentUser;
    if (user) {
      this.notificationsRef = collection(db, 'users', user.uid, 'notifications');
  
      this.unsubscribe = onSnapshot(this.notificationsRef, (snapshot) => {
        const notifications = [];
        let unreadCount = 0;
  
        snapshot.forEach((doc) => {
          const notification = { id: doc.id, ...doc.data() };
          notifications.push(notification);
          if (!notification.read) {
            unreadCount++;
          }
        });
  
        this.setState({
          notifications,
          unreadCount,
          totalCount: notifications.length,
        });
      });
    }
  }
  
  

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
  }
  
  markAllAsRead = () => {
    this.state.notifications.forEach((notification) => {
      if (!notification.read) {
        const notificationRef = doc(db, 'users', auth.currentUser.uid, 'notifications', notification.id);
        updateDoc(notificationRef, { read: true });
      }
    });
  };
  
  clearAllNotifications = () => {
    this.state.notifications.forEach((notification) => {
      const notificationRef = doc(db, 'users', auth.currentUser.uid, 'notifications', notification.id);
      deleteDoc(notificationRef);
    });
  };
  
  

  render() {
    const { notifications, unreadCount, totalCount } = this.state;

    return (
      <div className='border ml-[15%] max-w-[800px] p-4 mx-auto mt-5' >
        <h2 className="text-2xl font-bold text-maroon mb-4">Notifications</h2>
          <div className="mb-4">
            <span className="text-gray-700">Unread: {unreadCount}</span> | 
            <span className="text-gray-700">Total: {totalCount}</span>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={this.markAllAsRead}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
            >
              Mark all as read
            </button>
            <button 
              onClick={this.clearAllNotifications}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
            >
              Clear all
            </button>
          </div>
        <div className="flex-col gap-2">
          {notifications.map((notification) => (
            <NotificationItem key={notification.id} {...notification} />
          ))}
        </div>
      </div>
    );
  }
}

export default Notifications;
