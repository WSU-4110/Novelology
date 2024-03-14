import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Import your Firebase configuration

const fetchUIDwithUsername = async (username) => {
    try {
        // Reference the document directly using its ID (which is the username)
        const userDocRef = doc(db, 'usernames', username); // Assuming 'usernames' is the collection name
        const userDocSnapshot = await getDoc(userDocRef);

        // Check if the document exists
        if (userDocSnapshot.exists()) {
            // Document found, return its ID as the UID
            return userDocSnapshot.UID; // Use the document ID as the UID
        } else {
            // Username not found, return null or throw an error
            return null;
            // Alternatively, you can throw an error:
            // throw new Error('User not found for the specified username.');
        }
    } catch (error) {
        console.error('Error fetching UID with username:', error);
        return null;
    }
};

export default fetchUIDwithUsername;
