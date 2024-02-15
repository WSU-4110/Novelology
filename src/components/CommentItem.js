import React from 'react';
import PropTypes from 'prop-types';

const CommentItem = ({ comment, userProfilePicture, username, formatTimeDifference }) => {
  const { text, createdAt } = comment;

  return (
    <div className="flex items-start space-x-4 py-2 max-w-3/4">
      {userProfilePicture && <img src={userProfilePicture} alt="Profile" className="w-8 h-8 rounded-full" />}

      <div className="flex-grow border p-1">
        <div className="flex justify-between">
          <span className="font-bold">{username}</span>
          <span className="text-sm text-gray-500">{formatTimeDifference(createdAt)}</span>
        </div>
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.shape({
    text: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  userProfilePicture: PropTypes.string,
  username: PropTypes.string.isRequired,
  formatTimeDifference: PropTypes.func.isRequired,
};

export default CommentItem;
