import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import defaultProfilePicture from '../../assets/default-profile-picture.jpg'; // Import default profile picture
import fetchPFP from '../../functions/fetchPFP'; // Import fetchPFP function

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
    const profilePictureRef = ref(storage, `users/${userId}/profilePicture.jpg`);

    try {
      await deleteObject(profilePictureRef);
      setExistingProfilePicture(null); // Reset existingProfilePicture state
      console.log('Profile picture deleted successfully.');
    } catch (error) {
      console.error('Error deleting profile picture:', error);
      setError('Failed to delete profile picture.\nPlease try again later.');
    }
  };

  return (
    <>
      <div className="flex flex-col items-center px-10 w-full bg-[linear-gradient(0deg,#F4F3EE_0%,#F4F3EE_100%,#89023E)] max-md:max-w-full">
        <div className="flex flex-col rounded-lg shadow-2xl px-20 py-4 max-w-full text-center text-black shadow-sm bg-maroon bg-opacity-50 w-[569px] max-md:px-5">
          <div className="self-center text-xl">Upload your profile picture</div>

          <div className="flex gap-5 justify-between items-start mt-3 w-full text-xl whitespace-nowrap">
            <div>
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
              <div>
              <input
              type="file"
              accept="image/*"
              id="profilePicture"
              onChange={handleChange}
              className="text-xs w-[150px]"
            />
            </div>
            </div>
            
            <div className="flex flex-col flex-1 items-center mt-3">
              <button className="justify-center text-lg self-stretch px-2.5 py-1 rounded-xl bg-maroon bg-opacity-70 hover:bg-opacity-50">
                View Current Picture
              </button>
              
              <button className="justify-center text-lg px-3 py-1 mt-3 rounded-xl bg-maroon bg-opacity-70 hover:bg-opacity-50"
                onClick={handleUpload}
              >
                Upload picture
              </button>
              <button className="justify-center text-lg px-3 py-1 mt-2 rounded-xl bg-maroon bg-opacity-70 hover:bg-opacity-50"
                onClick={handleDeleteProfilePicture}
              >
                Remove picture
              </button>
              {error && <div className="text-xs">{error}</div>}

            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex">
        <label htmlFor="profilePicture" className="text-lg font-semibold mb-2">
          Profile Picture
        </label>
        <div className="flex flex-row">
          <div>
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
          </div>
          <div className="flex flex-col pt-12">
            <input
              type="file"
              accept="image/*"
              id="profilePicture"
              onChange={handleChange}
            />
            <button
              onClick={handleDeleteProfilePicture}
              className="bg-red-600 w-40 h-6 rounded-sm text-white mt-2"
            >
              Delete Profile Picture
            </button>

            <button
              onClick={handleUpload}
              className="bg-green-600 w-fit p-1 h-6 rounded-sm text-white"
            >
              Upload
            </button>
          </div>
        </div>
        {error && <div>{error}</div>}
      </div> */}
    </>
  );
};

export default UploadPFP;