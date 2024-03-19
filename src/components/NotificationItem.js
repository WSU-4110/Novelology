import React, { Component } from 'react';
import formatTimeDifference from '../functions/formatTimeDifference';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

class NotificationItem extends Component {
  handleDismiss = () => {
    this.props.onDismiss(this.props.id);
  };

  renderNotificationContent = () => {
    const { type, fromUserId, timestamp } = this.props;
    const formattedTime = formatTimeDifference(timestamp);

    switch (type) {
      case 'follow_request':
        return  <div className="flex">
          {fromUserId} requested to follow you.
          <br/> @{formattedTime}

          <FontAwesomeIcon icon={faCheck} onClick={this.handleAccept} />
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
