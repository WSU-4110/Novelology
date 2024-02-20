import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import defaultProfilePicture from '../assets/default-profile-picture.jpg'; // Import default profile picture
import fetchPFP from '../functions/fetchPFP'; // Import fetchPFP function

const UploadPFP = () => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [existingProfilePicture, setExistingProfilePicture] = useState(null);

  useEffect(() => {
    const fetchExistingProfilePicture = async () => {
      try {
        const userId = auth.currentUser.uid;
        console.log('Fetching existing profile picture...');
        const existingURL = await fetchPFP(userId);
        if (existingURL) {
          console.log('Existing profile picture found:', existingURL);
          setExistingProfilePicture(existingURL);
        } else {
          console.log('No existing profile picture found.');
          // If no existing profile picture is found, set defaultProfilePicture
          setExistingProfilePicture(defaultProfilePicture);
        }
      } catch (error) {
        console.error('Error fetching existing profile picture:', error);
        // If there's an error fetching the profile picture, set defaultProfilePicture
        setExistingProfilePicture(defaultProfilePicture);
      }
    };

    fetchExistingProfilePicture();
  }, []);

  const MAX_FILE_SIZE_MB = 1; // Maximum file size allowed in megabytes

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Check if file size exceeds the maximum allowed size
    if (selectedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`File size exceeds the maximum allowed size of ${MAX_FILE_SIZE_MB} MB.`);
      setImage(null); // Reset image state
    } else {
      setError(null); // Clear any previous error message
      setImage(selectedFile);
    }
  };

  const handleUpload = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (!image) {
      console.log('No image selected for upload.');
      return;
    }

    const userId = auth.currentUser.uid;
    const storage = getStorage();
    const metadata = {
      contentType: 'image/jpeg' // Set content type to JPEG
    };

    // Convert image to JPEG format
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = async () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(async (blob) => {
        const storageRef = ref(storage, `users/${userId}/profilePicture.jpg`); // Save as .jpg
        const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

        console.log('Starting upload...');
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
                setExistingProfilePicture(downloadURL); // Update existing profile picture URL
                localStorage.setItem('profilePicture', downloadURL); // Update profile picture URL in local storage
                setImage(null); // Reset image state after upload
              })
              .catch((error) => {
                console.error('Error getting download URL:', error);
                setError('Failed to get download URL. Please try again later.');
              });
          }
        );
      }, 'image/jpeg');
    };
    img.src = URL.createObjectURL(image);
  };

  const handleDeleteProfilePicture = async () => {
    if (!existingProfilePicture) {
      console.log('No existing profile picture to delete.');
      return; // No existing profile picture to delete
    }

    const userId = auth.currentUser.uid;
    const storage = getStorage();
    const profilePictureRef = ref(storage, `users/${userId}/profilePicture`);

    try {
      await deleteObject(profilePictureRef);
      setExistingProfilePicture(null); // Reset existingProfilePicture state
      console.log('Profile picture deleted successfully.');
    } catch (error) {
      console.error('Error deleting profile picture:', error);
      setError('Failed to delete profile picture. Please try again later.');
    }
  };

  return (
    <div className='flex flex-col'>
      <label htmlFor="profilePicture" className="text-lg font-semibold mb-2">
        Profile Picture
      </label>
      <input type="file" accept="image/*" id="profilePicture" onChange={handleChange} />
      <button onClick={handleDeleteProfilePicture} className='bg-red-600 w-40 h-6 rounded-sm text-white mt-2'>Delete Profile Picture</button>
     
      <button onClick={handleUpload} className='bg-green-600 w-16 h-6 rounded-sm text-white'>Upload</button>
      <h2>Current Profile Picture: </h2>
      {existingProfilePicture ? (
        <img
          src={existingProfilePicture}
          alt="Existing Profile"
          className="w-36 h-36 max-w-36 max-h-36 rounded-full object-cover border border-gray-400 m-4"
        />
      ) : (
        <img
          src={defaultProfilePicture}
          alt="Default Profile"
          className="w-36 h-36 max-w-36 max-h-36 rounded-full object-cover border border-gray-400 m-4"
        />
      )}
      
      {error && <div>{error}</div>}
    </div>
  );
};

export default UploadPFP;
