import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

// Function to fetch the user's profile picture URL
const fetchUserProfilePicture = async (userId) => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }

    const fileExtensions = ['jpg', 'jpeg', 'png']; // Add more file extensions if needed

    // Loop through each file extension and try to fetch the profile picture
    for (const ext of fileExtensions) {
      const profilePictureRef = ref(storage, `users/${userId}/profilePicture.${ext}`);

      try {
        // Get the download URL for the profile picture
        const downloadURL = await getDownloadURL(profilePictureRef);
        console.log(`Profile picture found with extension .${ext}: ${downloadURL}`);
        return downloadURL; // Return download URL if found
      } catch (error) {
        console.error(`Profile picture with extension .${ext} not found. Trying next extension...`);
      }
    }

    // If no profile picture found, return the default profile picture URL
    return getDefaultProfilePictureURL();
  } catch (error) {
    console.error('Error fetching profile picture URL:', error);
    // Return the default profile picture URL in case of an error
    return getDefaultProfilePictureURL();
  }
};


// Function to get the default profile picture URL
const getDefaultProfilePictureURL = () => '../assets/default-profile-picture.jpg';


export default fetchUserProfilePicture;
