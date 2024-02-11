import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import { auth } from '../firebase';

const fetchPFP = async () => {
  try {
    const userId = auth.currentUser.uid;
    
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
        console.error(`Profile picture with extension .${ext} not found. Trying next extension...`);
      }
    }
    
    // If no profile picture is found with any of the extensions
    console.error('No profile picture found with supported extensions.');
    return null;
  } catch (error) {
    console.error('Error fetching profile picture URL:', error);
    return null;
  }
};

export default fetchPFP;
