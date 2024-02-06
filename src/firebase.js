// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { collection, getFirestore, where, query, getDocs} from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);


const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');


provider.setCustomParameters({
  prompt: "select_account"
});

export const getUserByUsername = async (username) => {
  try {
    console.log('Fetching user data for:', username);

    // Create a query to find the user document with the matching username
    const q = query(collection(db, 'users'), where('username', '==', username));
    
    // Fetch the documents that match the query
    const querySnapshot = await getDocs(q);
    
    // Check if any documents were found
    if (!querySnapshot.empty) {
      // Get the first document (assuming usernames are unique)
      const userData = querySnapshot.docs[0].data();
      console.log('User data:', userData);
      return userData;
    } else {
      console.log('User not found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user by username:', error);
    throw error;
  }
};

export { provider };
