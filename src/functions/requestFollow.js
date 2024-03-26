import { toast } from 'react-toastify';
import { auth, db } from '../firebase.js';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, collection, getDocs, deleteDoc } from 'firebase/firestore';
import createNotification from './createNotification';
import { query, where } from 'firebase/firestore';

export const requestFollow = async (targetUserId) => {
    try {
        const currentUserDocRef = doc(db, "users", auth.currentUser.uid);
        const targetUserDocRef = doc(db, "users", targetUserId);
        const currentUserDoc = await getDoc(currentUserDocRef);
        const targetUserDoc = await getDoc(targetUserDocRef);

        if (currentUserDoc.exists() && targetUserDoc.exists()) {
            const currentUserData = currentUserDoc.data();
            const targetUserData = targetUserDoc.data();

            // Check if the target user has muted the current user
            const isMuted = targetUserData.muted && targetUserData.muted.includes(auth.currentUser.uid);

            if (currentUserData.requested && currentUserData.requested.includes(targetUserId)) {
                // Remove the follow request
                await updateDoc(currentUserDocRef, {
                    requested: arrayRemove(targetUserId)
                });

                // Delete the corresponding notification
                const notificationsQuery = query(collection(db, "users", targetUserId, "notifications"), where("type", "==", "follow_request"), where("fromUserId", "==", auth.currentUser.uid));
                const notificationsSnapshot = await getDocs(notificationsQuery);
                notificationsSnapshot.forEach(async (doc) => {
                    await deleteDoc(doc.ref);
                });

                toast.success('Follow request removed successfully.');
                return false;
            }

            // Add a new follow request
            await updateDoc(currentUserDocRef, {
                requested: arrayUnion(targetUserId)
            });

            // Send a notification only if the target user has not muted the current user
            if (!isMuted) {
                createNotification(auth.currentUser.uid, targetUserId, new Date(), "follow_request");
            }

            toast.success('Follow request sent successfully.');
            return true;
        } else {
            console.error("User's document does not exist");
            return null;
        }
    } catch (error) {
        console.error('Error sending follow request:', error);
        return null;
    }
};
