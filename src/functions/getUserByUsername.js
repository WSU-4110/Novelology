import { db, storage } from '../firebase'; // Assuming db and storage are initialized in firebase.js
import { collection, query, where, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';

async function getUserByUsername(username) {
    try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('username', '==', username));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            const uid = doc.id; // Extract UID from document ID (title)
            const userData = doc.data();

            // Check if profile picture exists
            const profilePictureRef = ref(storage, `users/${uid}/pfp`);
            try {
                const profilePictureURL = await getDownloadURL(profilePictureRef);
                return { ...userData, profilePicture: profilePictureURL };
            } catch (error) {
                if (error.code === 'storage/object-not-found') {
                    // Handle case where profile picture doesn't exist
                    return { ...userData, profilePicture: null };
                } else {
                    console.error('Error getting profile picture URL:', error);
                    return userData; // Return user data without profile picture
                }
            }
        } else {
            return null; // User not found
        }
    } catch (error) {
        console.error('Error fetching user by username:', error);
        return null; // Return null to indicate error
    }
}


export default getUserByUsername;
