import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

const fetchUserProfilePicture = async (userId) => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }

    const fileExtensions = ['jpg', 'jpeg', 'png']; // Add more file extensions if needed

    for (const ext of fileExtensions) {
      const profilePictureRef = ref(storage, `users/${userId}/profilePicture.${ext}`);
      
      try {
        // Get the download URL for the profile picture
        const downloadURL = await getDownloadURL(profilePictureRef);
        return downloadURL; // Return download URL if found
      } catch (error) {
        // Ignore error and continue with the next file extension
        console.error(`Profile picture with extension .${ext} not found. Trying next extension...`);
      }
    }
    
    // If no profile picture is found with any of the extensions, return the default profile picture URL
    return getDefaultProfilePictureURL(); // Implement getDefaultProfilePictureURL function to return the default profile picture URL
  } catch (error) {
    console.error('Error fetching profile picture URL:', error);
    return getDefaultProfilePictureURL(); // Return the default profile picture URL in case of an error
  }
};

const getDefaultProfilePictureURL = () => {
  // Implement logic to return the default profile picture URL
  const defaultProfilePicturePath = require('../assets/default-profile-picture.jpg');
  return defaultProfilePicturePath.default; // Return the local file path of the default profile picture
};

export default fetchUserProfilePicture;
