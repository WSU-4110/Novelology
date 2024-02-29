import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

const fetchPFP = async (uid) => {
  try {
    const userId = uid;

    if (!userId) {
      // If UID is not provided, return the default profile picture directly
      const defaultProfilePicturePath = require('../assets/default-profile-picture.jpg');
      return defaultProfilePicturePath.default;
    }

    const profilePictureRef = ref(storage, `users/${userId}/profilePicture.jpg`);

    try {
      // Get the download URL for the profile picture
      const downloadURL = await getDownloadURL(profilePictureRef);

      // Store the download URL in localStorage
      localStorage.setItem('profilePictureURL', downloadURL);

      return downloadURL; // Return download URL if found
    } catch (error) {
      // If no profile picture is found, use default profile picture from local assets
      const defaultProfilePicturePath = require('../assets/default-profile-picture.jpg');
      return defaultProfilePicturePath.default; // Return the local file path of the default profile picture
    }
  } catch (error) {
    return null;
  }
};

export default fetchPFP;
