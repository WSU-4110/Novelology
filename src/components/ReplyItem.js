import React from 'react';
import PropTypes from 'prop-types';

const CommentItem = ({ comment, userProfilePicture, username, formatTimeDifference }) => {
  const { text, createdAt } = comment;

  return (
    <div className="comment flex-row items-start space-x-4 py-2 max-w-3/4">
      <fetchUserProfilePicture />
      <div className="comment-details flex-row border p-1">
          <span className="comment-username font-bold">{username}</span>
          <span className="comment-timestamp text-xs text-gray-500">{formatTimeDifference(createdAt)}</span>
          <p className="comment-text text-sm">{text}</p>
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.shape({
    text: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  userProfilePicture: PropTypes.string, // Optional userProfilePicture
  username: PropTypes.string.isRequired,
  formatTimeDifference: PropTypes.func.isRequired,
};

export default CommentItem;
