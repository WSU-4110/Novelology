import { db } from '../firebase';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';

const createNotification = async (fromUserId, toUserId, timestamp, notificationType) => {
    try {
        const userRef = doc(db, 'users', toUserId);
        const userSnapshot = await getDoc(userRef);
    
        if (userSnapshot.exists()) {
        const userDoc = userSnapshot.data();
        const notificationsRef = collection(db, 'users', toUserId, 'notifications');
        await addDoc(notificationsRef, {
            type: notificationType,
            fromUserId,
            timestamp
        });
        } else {
        console.error('User document not found for user ID:', toUserId);
        }
    } catch (error) {
        console.error('Error creating notification:', error);
    }
    
}

export default createNotification;