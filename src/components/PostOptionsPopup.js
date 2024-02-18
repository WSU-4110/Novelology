import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const PostOptionsPopup = ({ onClose }) => {
  return (
    <div className="options-popup">
      <ul>
        <li>Report</li>
        <li>Block</li>
        <li>Mute</li>
        <li>Add to List</li>
        {/* Add more options as needed */}
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default PostOptionsPopup;
