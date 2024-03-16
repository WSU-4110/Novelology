import React from "react";

const BioTextArea = ({ bio, setBio }) => {
  // Return a prestyled textarea element for the user to enter their bio
  return (
    <textarea
      className="block p-2.5 w-full text-sm text-black bg-maroon bg-opacity-10 rounded-lg border border-maroon border-opacity-30 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      rows="4"
      placeholder="Tell us something about yourself..."
      value={bio}
      onChange={(e) => setBio(e.target.value)}
      style={{ resize: "none" }} // Add inline style to disable resizing
    />
  );
};

export default BioTextArea;
