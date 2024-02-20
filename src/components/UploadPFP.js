import React, { useState, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { auth } from '../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import defaultProfilePicture from '../assets/default-profile-picture.jpg'; // Import default profile picture
import fetchPFP from '../functions/fetchPFP'; // Import fetchPFP function

const UploadPFP = () => {
  // State variables
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ unit: '%', width: 50, aspect: 1 / 1 });
  const [croppedImage, setCroppedImage] = useState(null);
  const [error, setError] = useState(null);
  const [existingProfilePicture, setExistingProfilePicture] = useState(null);
  const MAX_FILE_SIZE_MB = 1; // Maximum file size allowed in megabytes


  // Function to handle image load
  const onImageLoaded = (img) => {
    setImage(img); // Update the image state with the loaded image
  };

// Function to handle crop completion
const onCropComplete = (crop) => {
  getCroppedImage(); // Call getCroppedImage when cropping is completed
};

  // Function to handle crop change
  const onCropChange = (newCrop) => {
    setCrop(newCrop); // Update the crop state
  };

// Function to get cropped image
const getCroppedImage = () => {
  if (image && crop.width && crop.height) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    canvas.toBlob((blob) => {
      setCroppedImage(blob); // Update the cropped image state
    }, 'image/jpeg');
  }
};



  
  

  // Function to handle file change
  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
  
    // Check if file size exceeds the maximum allowed size
    if (selectedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`File size exceeds the maximum allowed size of ${MAX_FILE_SIZE_MB} MB.`);
      setImage(null); // Reset image state
    } else {
      setError(null); // Clear any previous error message
      setImage(selectedFile); // Update image state with selected file
    }
  };
  

  // Function to handle upload
  const handleUpload = async () => {
    if (!croppedImage) {
      setError('Please select and crop an image before uploading.');
      return;
    }

    try {
      const userId = auth.currentUser.uid;
      const storage = getStorage();
      const metadata = {
        contentType: 'image/jpeg'
      };

      const storageRef = ref(storage, `users/${userId}/profilePicture.jpg`);
      const uploadTask = uploadBytesResumable(storageRef, croppedImage, metadata);

      uploadTask.on('state_changed',
        (snapshot) => {
          // Handle upload progress
        },
        (error) => {
          console.error('Error uploading file:', error);
          setError('Failed to upload profile picture. Please try again later.');
        },
        () => {
          // Upload completed successfully, get the download URL
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              setExistingProfilePicture(downloadURL);
              localStorage.setItem('profilePicture', downloadURL);
              setCroppedImage(null);
              setError(null);
            })
            .catch((error) => {
              console.error('Error getting download URL:', error);
              setError('Failed to get download URL. Please try again later.');
            });
        }
      );
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Failed to upload profile picture. Please try again later.');
    }
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
  
      {/* Image Cropper */}
      {image && (
        <ReactCrop
          src={URL.createObjectURL(image)}
          crop={crop}
          onChange={onCropChange}
          onComplete={onCropComplete} // Add this line
          onImageLoaded={onImageLoaded} // Call getCroppedImage after the image is loaded
        />
      )}

      
      {croppedImage && (
        <div>
          <h2>Cropped Image Preview:</h2>
          <img
            src={URL.createObjectURL(croppedImage)}
            alt="Cropped"
            className="w-36 h-36 max-w-36 max-h-36 rounded-full object-cover border border-gray-400 m-4"
          />
        </div>
      )}
  
      {error && <div>{error}</div>}
    </div>
  );
  
  
};

export default UploadPFP;
