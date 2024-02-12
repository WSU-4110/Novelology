import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import defaultProfilePicture from '../assets/default-profile-picture.jpg'; // Import default profile picture
import fetchPFP from '../functions/fetchPFP'; // Import fetchPFP function

const UploadPFP = () => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [existingProfilePicture, setExistingProfilePicture] = useState(null);

  useEffect(() => {
    // Fetch existing profile picture URL if available
    const fetchExistingProfilePicture = async () => {
      try {
        const userId = auth.currentUser.uid;
        // Fetch existing profile picture URL from Firestore or any other storage location
        const existingURL = await fetchPFP(userId); // Use fetchPFP function
        if (existingURL) {
          setExistingProfilePicture(existingURL);
        }
      } catch (error) {
        console.error('Error fetching existing profile picture:', error);
      }
    };

    fetchExistingProfilePicture();
  }, []);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!image) return;

    const userId = auth.currentUser.uid;
    const storage = getStorage();
    const metadata = {
      contentType: image.type // Use the content type of the selected image file
    };
    const storageRef = ref(storage, `users/${userId}/profilePicture.${image.name.split('.').pop()}`); // Use the file extension as part of the file name
    const uploadTask = uploadBytesResumable(storageRef, image, metadata);

    uploadTask.on('state_changed',
      (snapshot) => {
        // Track upload progress if needed
      },
      (error) => {
        console.error('Error uploading file:', error);
        setError('Failed to upload profile picture. Please try again later.');
      },
      () => {
        // Upload completed successfully, get the download URL
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log('File uploaded successfully:', downloadURL);
            // Handle the download URL as needed
          })
          .catch((error) => {
            console.error('Error getting download URL:', error);
            setError('Failed to get download URL. Please try again later.');
          });
      }
    );
  };

  return (
    <div className='flex flex-col'>
      <label htmlFor="profilePicture" className="text-lg font-semibold mb-2">
        Profile Picture
      </label>
      <input type="file" accept="image/*" id="profilePicture" onChange={handleChange} />
      <button onClick={handleUpload} className='bg-green-600 w-16 h-6 rounded-sm text-white'>Upload</button>
      {existingProfilePicture ? (
        <img
          src={existingProfilePicture}
          alt="Existing Profile"
          className="w-1/4 h-1/4 rounded-full object-cover border border-gray-400 m-4" 
        />
      ) : (
        <img
          src={defaultProfilePicture}
          alt="Default Profile"
          className="w-1/4 h-1/4 rounded-full object-cover border border-gray-400 m-4"
        />
      )}
      
      {error && <div>{error}</div>}
    </div>
  );
};

export default UploadPFP;
