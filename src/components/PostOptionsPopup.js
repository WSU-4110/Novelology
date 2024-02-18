import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { faFlag, faSave, faList, faVolumeMute } from '@fortawesome/free-solid-svg-icons';

const PostOptionsPopup = ({ onClose }) => {
    return (
      <div className="absolute inset-0 flex items-center justify-center z-50 top-0">
        {/* Popup content */}
        <div className="bg-white p-4 rounded shadow-md">
        <ul className="py-1">
          <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer">
            <FontAwesomeIcon icon={faFlag} className="mr-2" />
            Report Post
          </li>
          <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer">
            <FontAwesomeIcon icon={faSave} className="mr-2" />
            Save Post
          </li>
          <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer">
            <FontAwesomeIcon icon={faList} className="mr-2" />
            Add Post to List
          </li>
          <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer">
            <FontAwesomeIcon icon={faVolumeMute} className="mr-2" />
            Mute User
          </li>
        </ul>
        <button onClick={onClose} className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 focus:outline-none">
          Cancel
        </button>
        </div>
      </div>
    );
  };
  
export default PostOptionsPopup;
