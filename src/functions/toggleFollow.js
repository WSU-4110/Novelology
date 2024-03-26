import { auth, db } from '../firebase';
import { doc, arrayRemove, arrayUnion, updateDoc, getDoc } from 'firebase/firestore';

export const toggleFollow = async (targetUserId) => {
    try {
        const currentUserId = auth.currentUser.uid;

        console.log('Current user ID:', currentUserId);
        console.log('Target user ID:', targetUserId);
        if (!currentUserId || !targetUserId) {
            throw new Error('Invalid user IDs');
        }

        // Get references to the current user and the target user
        const currentUserDocRef = doc(db, 'users', currentUserId);
        const targetUserDocRef = doc(db, 'users', targetUserId);

        // Check if the current user is already following the target user
        const currentUserDoc = await getDoc(currentUserDocRef);
        const isFollowing = currentUserDoc.data().following.includes(targetUserId);

        if (isFollowing) {
            // Unfollow user
            await updateDoc(currentUserDocRef, {
                following: arrayRemove(targetUserId)
            });
            await updateDoc(targetUserDocRef, {
                followers: arrayRemove(currentUserId)
            });
        } else {
            // Follow user
            await updateDoc(currentUserDocRef, {
                following: arrayUnion(targetUserId)
            });
            await updateDoc(targetUserDocRef, {
                followers: arrayUnion(currentUserId)
            });
        }
    } catch (error) {
        console.error('Error toggling follow:', error);
        throw error; // Rethrow the error to the calling function
    }
};
