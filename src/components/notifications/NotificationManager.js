import React, { Component } from 'react';

class NotificationManager extends Component {
  state = {
    notifications: [],
  };

  componentDidMount() {
    // Subscribe to notifications for a specific post
    this.props.feedInstance.subscribe(this.props.postId, this.handleNotification);
  }

  handleNotification = (interaction) => {
    this.setState(prevState => ({
      notifications: [...prevState.notifications, `New ${interaction} on your post`],
    }));
  };

  // Method to clear all notifications
  clearNotifications = () => {
    this.setState({ notifications: [] });
  };

  renderNotification = (notification, index) => {
    return (
      <div key={index} className="notification">
        {notification}
      </div>
    );
  };

  render() {
    const { notifications } = this.state;
    return (
      <div className="notification-manager">
        {notifications.length > 0 && (
          <div className="notifications">
            <h4>Notifications</h4>
            {notifications.map(this.renderNotification)}
            <button onClick={this.clearNotifications}>Clear All</button>
          </div>
        )}
      </div>
    );
  }
}

export default NotificationManager;
