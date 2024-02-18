import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faSave, faList, faVolumeMute } from '@fortawesome/free-solid-svg-icons';

const PostOptionsPopup = ({ onClose }) => {
  useEffect(() => {
    const handleScroll = () => {
      onClose();
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onClose]);

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
          <li className="px-4 py-2 flex items-center hover:bg-gray-100 focus:bg-gray-100 focus:outline-none cursor-pointer transition duration-300" role="menuitem">
            <FontAwesomeIcon icon={faFlag} className="mr-2" />
            Report Post
          </li>
          <li className="px-4 py-2 flex items-center hover:bg-gray-100 focus:bg-gray-100 focus:outline-none cursor-pointer transition duration-300" role="menuitem">
            <FontAwesomeIcon icon={faSave} className="mr-2" />
            Save Post
          </li>
          <li className="px-4 py-2 flex items-center hover:bg-gray-100 focus:bg-gray-100 focus:outline-none cursor-pointer transition duration-300" role="menuitem">
            <FontAwesomeIcon icon={faList} className="mr-2" />
            Add Post to List
          </li>
          <li className="px-4 py-2 flex items-center hover:bg-gray-100 focus:bg-gray-100 focus:outline-none cursor-pointer transition duration-300" role="menuitem">
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
