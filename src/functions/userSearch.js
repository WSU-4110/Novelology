import { collectionGroup, query, orderBy, startAt, endAt, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export async function searchUsers(nameQuery) {
    // Convert the query to lowercase for case-insensitive matching
    const normalizedQuery = nameQuery.toLowerCase();

    // Use orderBy with startAt and endAt for case-insensitive matching
    const q = query(collectionGroup(db, 'users'),
        orderBy('username'), // Order by the 'username' field
        startAt(normalizedQuery), // Start at the normalized query (case-insensitive)
        endAt(normalizedQuery + '\uf8ff') // End at the next possible string (case-insensitive)
    );

    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map((doc) => doc.data());
}
