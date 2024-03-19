import React from 'react';

const NotificationItem = ({ id, type, message, time, read, onDismiss }) => {
  const handleDismiss = () => {
    onDismiss(id);
  };

  return (
    <div style={{ background: read ? '#f0f0f0' : '#fff' }}>
      <div>Type: {type}</div>
      <div>Message: {message}</div>
      
      <button onClick={handleDismiss}>Dismiss</button>
    </div>
  );
};

export default NotificationItem;
