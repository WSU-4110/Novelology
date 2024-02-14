import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

async function fetchUsernameWithUID(uid) {
  try {
    const userDocRef = doc(db, 'users', uid);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      return userData.username;
    } else {
      console.error('User document does not exist');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

export default fetchUsernameWithUID;
