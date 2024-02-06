import { collection, query, where, orderBy, startAt, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export async function searchUsers(nameQuery) {
  const usersRef = collection(db, 'users');
  const q = query(
    usersRef,
    where('name', '>=', nameQuery.toLowerCase()),
    where('name', '<=', nameQuery.toLowerCase() + '\uf8ff')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
}
