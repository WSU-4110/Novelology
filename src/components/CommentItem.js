import React from 'react';
import PropTypes from 'prop-types';

const CommentItem = ({ comment, userProfilePicture, username, formatTimeDifference }) => (
  <div>
    {userProfilePicture && <img src={userProfilePicture} alt="Profile" className="w-8 h-8 rounded-full" />}
    <div className="flex-grow border p-1">
      <div className="flex justify-between">
        <span className="">{username}</span>
        <span className="text-sm text-gray-500">{formatTimeDifference(comment.createdAt)}</span>
      </div>
      <p className="text-sm">{comment.text}</p>
    </div>
  </div>
);

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  userProfilePicture: PropTypes.string,
  username: PropTypes.string.isRequired,
  formatTimeDifference: PropTypes.func.isRequired,
};

export default CommentItem;