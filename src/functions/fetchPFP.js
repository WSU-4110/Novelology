import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import { auth } from '../firebase';

const fetchPFP = async (uid) => { // Accept UID as a parameter
  try {
    const userId = uid; // Use the provided UID or get it from auth

    if (!userId) {
      throw new Error('User is not authenticated');
    }

    const fileExtensions = ['jpg', 'jpeg', 'png']; // Add more file extensions if needed

    for (const ext of fileExtensions) {
      const profilePictureRef = ref(storage, `users/${userId}/profilePicture.${ext}`);
      
      try {
        // Get the download URL for the profile picture
        const downloadURL = await getDownloadURL(profilePictureRef);

        // Store the download URL in localStorage
        localStorage.setItem('profilePictureURL', downloadURL);

        return downloadURL; // Return download URL if found
      } catch (error) {
        // Ignore error and continue with the next file extension
        }
    }
    
    // If no profile picture is found with any of the extensions, use default profile picture from local assets
    const defaultProfilePicturePath = require('../assets/default-profile-picture.jpg');
    return defaultProfilePicturePath.default; // Return the local file path of the default profile picture
  } catch (error) {
    
    return null;
  }
};

export default fetchPFP;
