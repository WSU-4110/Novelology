import { db } from '../firebase';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';

const createNotification = async (fromUserId, toUserId, timestamp, notificationType) => {
    try {
        const userRef = doc(db, 'users', toUserId);
        const userSnapshot = await getDoc(userRef);
    
        if (userSnapshot.exists()) {
        const userDoc = userSnapshot.data();

        // is the fromUser muted or blocked by the toUser?
        if (userDoc.muted && userDoc.muted.includes(fromUserId)) {
            // for now, we'll just not tell the toUser about the notification
            // but we could also add a notification to the fromUser that their notification was not sent
            // but that would be a bit spammy, and usually the fromUser doesn't know they're muted or blocked

            // so remove this later
            toast.error("You can't send a notification to a user who has muted you.");
            return;
        }

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