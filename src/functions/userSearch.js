import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export async function searchUsers(nameQuery) {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', nameQuery.toLowerCase()));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
}
