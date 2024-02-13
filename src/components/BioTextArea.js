import React from "react";

const BioTextArea = ({ bio, setBio }) => {
  return (
    <textarea
      className="w-full h-24 p-2 border rounded my-4"
      placeholder="Bio"
      value={bio}
      onChange={(e) => setBio(e.target.value)}
      style={{ resize: "none" }} // Add inline style to disable resizing
    />
  );
};

export default BioTextArea;
