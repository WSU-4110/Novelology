import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export async function searchUsers(nameQuery) {
  const usersRef = collection(db, "users");
  const q = query(usersRef,
      where('username', '>=', nameQuery.toLowerCase()), where('username', '<=', nameQuery.toLowerCase() + '\uf8ff'));
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
}