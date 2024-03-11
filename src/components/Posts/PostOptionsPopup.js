import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faShare, faList, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import ReportOptions from './ReportOptions';
import { toast } from 'react-toastify';


const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);
};

const PostOptionsPopup = ({ onClose, postId}) => {
  const [showReportOptions, setShowReportOptions] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const popupRef = useRef(null);

  useClickOutside(popupRef, onClose);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleReportPost = () => {
    setShowReportOptions(true);
  };

  const handleCloseReportOptions = () => {
    setShowReportOptions(false);
  };

  const handleSavePost = () => {
    // Add logic to handle saving the post
    toast.success('Post saved successfully');
    onClose();
  };

  const handleAddToList = () => {
    // Add logic to handle adding the post to a list
    console.log('Add Post to List');
    onClose();
  };

  const handleMuteUser = () => {
    // Add logic to handle muting the user
    console.log('Mute User');
    onClose();
  };
  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-opacity-50 bg-black">
      <div
        className={`bg-white p-4 rounded shadow-md popup-inner transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
        ref={popupRef}
      >
        <ul className="py-1" role="menu">
          <li
            className="px-4 py-2 flex items-center hover:bg-gray-100 focus:bg-gray-100 focus:outline-none cursor-pointer transition duration-300"
            role="menuitem"
            onClick={handleReportPost}
          >
            <FontAwesomeIcon icon={faFlag} className="mr-2" />
            Report Post
          </li>
          <li
            className="px-4 py-2 flex items-center hover:bg-gray-100 focus:bg-gray-100 focus:outline-none cursor-pointer transition duration-300"
            role="menuitem"
            onClick={handleSavePost}
          >
            <FontAwesomeIcon icon={faShare} className="mr-2" />
            Save Post
          </li>
          <li
            className="px-4 py-2 flex items-center hover:bg-gray-100 focus:bg-gray-100 focus:outline-none cursor-pointer transition duration-300"
            role="menuitem"
            onClick={handleAddToList}
          >
            <FontAwesomeIcon icon={faList} className="mr-2" />
            Add Post to List
          </li>
          <li
            className="px-4 py-2 flex items-center hover:bg-gray-100 focus:bg-gray-100 focus:outline-none cursor-pointer transition duration-300"
            role="menuitem"
            onClick={handleMuteUser}
          >
            <FontAwesomeIcon icon={faVolumeMute} className="mr-2" />
            Mute User
          </li>
        </ul>

        {showReportOptions && (
          <ReportOptions onClose={() => setShowReportOptions(false)} postId={postId} />
        )}

        <button
          onClick={onClose}
          className="block w-full text-left mt-2 px-4 py-2 text-gray-600 hover:bg-gray-100 focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>,
    document.body
  );
};

export default PostOptionsPopup;
