import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faShare, faList, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import ReportOptions from './ReportOptions';
import { toast } from 'react-toastify';
import { db, auth } from '../../firebase';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';


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
    toast.info('Feature coming soon');
    onClose();
  };

  const handleAddToList = () => {
    // Add logic to handle adding the post to a list
    console.log('Add Post to List');
    toast.info('Feature coming soon');
    onClose();
  };

  const handleMuteUser = async () => {
    try {
      if (!postId) {
        console.error('postId is undefined or null');
        toast.error('Error: postId is undefined or null.');
        return;
      }
  
      // Fetch the post document to get the author's UID
      const postRef = doc(db, 'posts', postId);
      const postDocSnap = await getDoc(postRef);
  
      // if the post document doesn't exist, log an error and return
      if (!postDocSnap.exists()) {
        console.error('Post not found');
        toast.error('Error: Post not found.');
        return;
      }
  
      const postData = postDocSnap.data();
      // if theres no uid in the post data, log an error and return
      if (!postData || !postData.uid) {
        console.error('Author UID not found in post document');
        toast.error('Error: Author UID not found in post document.');
        return;
      }
  

      // Get the author's UID from the post data document
      const authorUid = postData.uid;
  
      // Fetch the current user's document
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const userDocSnap = await getDoc(userRef);
  
      // if the user document doesn't exist, log an error and return
      if (!userDocSnap.exists()) {
        console.error('User not found');
        toast.error('Error: User not found.');
        return;
      }
  
      const currentUserData = userDocSnap.data();
      const mutedUsers = currentUserData.muted || [];
  
      // Check if the author's UID is already in the muted array
      if (mutedUsers.includes(authorUid)) {
        toast.info('User is already muted.');
        return;
      }
  
      // Update the authenticated user's document to add the author's UID to the muted array
      await updateDoc(userRef, {
        muted: arrayUnion(authorUid),
      });
  
      console.log('Muted user:', authorUid);
      toast.success('User muted successfully.');
      onClose();
    } catch (error) {
      console.error('Error muting user:', error.message);
      toast.error('Error muting user: ' + error.message);
    }
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
