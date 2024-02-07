import React, { useState } from 'react';
import uploadImage from '../functions/uploadImage';
import { auth } from '../firebase';

const UploadPFP = () => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!image) return;

    const userId = auth.currentUser.uid;
    const folderName = 'profilePicture'; // Set the desired folder name here

    uploadImage(image, userId, folderName)
      .then((downloadURL) => {
        console.log('File uploaded successfully:', downloadURL);
        // Handle the download URL as needed
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
        setError('Failed to upload profile picture. Please try again later.');
      });
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      {error && <div>{error}</div>}
    </div>
  );
};

export default UploadPFP;
