import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faSave, faList, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import ReportOptions from './ReportOptions'; // Import ReportOptions component

const PostOptionsPopup = ({ onClose }) => {
  const [showReportOptions, setShowReportOptions] = useState(false);

  const handleReportPost = () => {
    setShowReportOptions(true);
  };

  const handleCloseReportOptions = () => {
    setShowReportOptions(false);
  };

  const handleReportReason = (reason) => {
    // Logic to handle reporting with specific reason
    console.log('Reported post with reason:', reason);
    onClose();
  };

  const handleSavePost = () => {
    // Add logic to handle saving the post
    console.log('Save Post');
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

  const handleClickOutside = (event) => {
    if (!event.target.closest('.popup-inner')) {
      onClose();
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-opacity-50 bg-black" onClick={handleClickOutside}>
      {/* Popup content */}
      <div className="bg-white p-4 rounded shadow-md popup-inner" onClick={(e) => e.stopPropagation()}>
        <ul className="py-1" role="none">
          <li className="px-4 py-2 flex items-center hover:bg-gray-100 focus:bg-gray-100 focus:outline-none cursor-pointer transition duration-300" role="menuitem" onClick={handleReportPost}>
            <FontAwesomeIcon icon={faFlag} className="mr-2" />
            Report Post
          </li>
          <li className="px-4 py-2 flex items-center hover:bg-gray-100 focus:bg-gray-100 focus:outline-none cursor-pointer transition duration-300" role="menuitem" onClick={handleSavePost}>
            <FontAwesomeIcon icon={faSave} className="mr-2" />
            Save Post
          </li>
          <li className="px-4 py-2 flex items-center hover:bg-gray-100 focus:bg-gray-100 focus:outline-none cursor-pointer transition duration-300" role="menuitem" onClick={handleAddToList}>
            <FontAwesomeIcon icon={faList} className="mr-2" />
            Add Post to List
          </li>
          <li className="px-4 py-2 flex items-center hover:bg-gray-100 focus:bg-gray-100 focus:outline-none cursor-pointer transition duration-300" role="menuitem" onClick={handleMuteUser}>
            <FontAwesomeIcon icon={faVolumeMute} className="mr-2" />
            Mute User
          </li>
        </ul>
        {/* Render ReportOptions component if showReportOptions is true */}
      {showReportOptions && <ReportOptions onClose={() => setShowReportOptions(false)} />}
    
        <button onClick={onClose} className="block w-full text-left mt-2 px-4 py-2 text-gray-600 hover:bg-gray-100 focus:outline-none">
          Close
        </button>
      </div>
    </div>
  );
};

export default PostOptionsPopup;
