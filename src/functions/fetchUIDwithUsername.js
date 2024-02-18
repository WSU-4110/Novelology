import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Import your Firebase configuration

const fetchUIDwithUsername = async (username) => {
    try {
        // Query the users collection to find the user with the specified username
        const userQuery = query(collection(db, 'users'), where('username', '==', username));
        const querySnapshot = await getDocs(userQuery);

        // Check if the query snapshot is not empty
        if (!querySnapshot.empty) {
            // Assuming username is unique, retrieve the first document and return its UID
            const doc = querySnapshot.docs[0];
            return doc.id;
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
