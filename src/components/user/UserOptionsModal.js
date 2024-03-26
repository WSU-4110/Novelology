import { ReactDOM } from "react";

export const UserOptionsModal = ({ isMuted, toggleMute, reportUser, onClose }) => {
    return ReactDOM.createPortal(
      <div className="relative top-0 right-0 bg-white shadow-lg p-4 rounded z-10">
        <ul>
          <li className="cursor-pointer mb-2" onClick={toggleMute}>
            {isMuted ? 'Unmute' : 'Mute'}
            {/* tooltip to desc what muting a user does muted users cannot send you notifications */}
            <span className="ml-2 text-gray-500 text-sm">Muted users cannot send you notifications</span>
          </li>
          <li className="cursor-pointer" onClick={reportUser}>
            Report
          </li>
        </ul>
        <button className="mt-4 w-full bg-gray-200 p-2 rounded" onClick={onClose}>
          Close
        </button>
      </div>,
      document.getElementById('portal')
    );
  };