import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Import your Firebase configuration

const fetchUIDwithUsername = async (username) => {
    try {
        // Convert the username to lowercase to match the document ID
        const lowerCaseUsername = username.toLowerCase();

        // Reference the document directly using its ID (which is the lowercase username)
        const userDocRef = doc(db, 'usernames', lowerCaseUsername);
        console.log("userDocRef", userDocRef);
        const userDocSnapshot = await getDoc(userDocRef);

        // Check if the document exists
        if (userDocSnapshot.exists()) {
            // Document found, return the UID field
            console.log("userDocSnapshot.data()", userDocSnapshot.data());
            console.log(`Username '${username}' found. UID:`, userDocSnapshot.data().UID);

            if (userDocSnapshot.data().UID === undefined) {
                return userDocSnapshot.data().uid;
            }

            return userDocSnapshot.data().UID;
        } else {
            // Username not found, return null or throw an error
            console.log(`Username '${username}' not found.`);
            return null;
        }
    } catch (error) {
        console.error('Error fetching UID with username:', error);
        return null;
    }
};

export default fetchUIDwithUsername;
