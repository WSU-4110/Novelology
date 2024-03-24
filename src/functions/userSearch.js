import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase.js';

export async function searchUsers(idQuery) {
    console.log('Searching for:', idQuery);
    const q = idQuery.trim();
    const results = [];

    if (q !== '') {
        const qRef = collection(db, 'usernames'); // Replace 'usernames' with your collection name
        try {
            const qSnapshot = await getDocs(qRef);
            console.log('Snapshot:', qSnapshot);
            qSnapshot.forEach(doc => {
                // Check if document ID starts with the query or contains the query
                if (doc.id.startsWith(q.toLowerCase()) || doc.id.includes(q)) { 
                    results.push({ id: doc.id, UID: doc.data().UID });
                }
            });
            console.log('Results:', results);
            return results;
        } catch (error) {
            console.error('Error searching users:', error);
            return [];
        }
    } else {
        return [];
    }
}