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
import { db } from "../functions/Auth"
import NotificationItem from "../components/NotificationItem";

class Notifications extends Component {
  state = {
    notifications: [],
    unreadCount: 0,
    totalCount: 0,
  };

  componentDidMount() {
    const user = firebase.auth().currentUser;
    if (user) {
      this.notificationsRef = firestore
        .collection('users')
        .doc(user.uid)
        .collection('notifications');

      this.notificationsRef.onSnapshot((snapshot) => {
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
    this.notificationsRef && this.notificationsRef();
  }

  markAllAsRead = () => {
    this.state.notifications.forEach((notification) => {
      if (!notification.read) {
        this.notificationsRef.doc(notification.id).update({ read: true });
      }
    });
  };

  clearAllNotifications = () => {
    this.state.notifications.forEach((notification) => {
      this.notificationsRef.doc(notification.id).delete();
    });
  };

  render() {
    const { notifications, unreadCount, totalCount } = this.state;

    return (
      <div>
        <h2>Notifications</h2>
        <div>
          Unread: {unreadCount} | Total: {totalCount}
        </div>
        <button onClick={this.markAllAsRead}>Mark all as read</button>
        <button onClick={this.clearAllNotifications}>Clear all</button>
        <div>
          {notifications.map((notification) => (
            <NotificationItem key={notification.id} {...notification} />
          ))}
        </div>
      </div>
    );
  }
}

export default Notifications;
