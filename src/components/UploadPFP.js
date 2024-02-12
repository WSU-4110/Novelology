import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject} from "firebase/storage";
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
            setExistingProfilePicture(downloadURL); // Update existing profile picture URL
            setImage(null); // Reset image state after upload
          })
          .catch((error) => {
            console.error('Error getting download URL:', error);
            setError('Failed to get download URL. Please try again later.');
          });
      }
    );
  };

  const handleDeleteProfilePicture = async () => {
    if (!existingProfilePicture) return; // No existing profile picture to delete

    const userId = auth.currentUser.uid;
    const storage = getStorage();
    const profilePictureRef = ref(storage, existingProfilePicture);

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
      {existingProfilePicture ? (
        <img
          src={existingProfilePicture}
          alt="Existing Profile"
          className="w-1/4 h-1/4  max-w-36 rounded-full object-cover border border-gray-400 m-4" 
        />
      ) : (
        <img
          src={defaultProfilePicture}
          alt="Default Profile"
          className="w-1/4 h-1/4 max-w-36 rounded-full object-cover border border-gray-400 m-4"
        />
      )}
      
      {error && <div>{error}</div>}
    </div>
  );
};

export default UploadPFP;
