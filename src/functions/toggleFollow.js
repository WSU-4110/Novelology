import { db } from '../firebase';
import { doc, arrayRemove, arrayUnion, updateDoc } from 'firebase/firestore';

export const toggleFollow = async (currentUserId, userId, isFollowing) => {
    try {
        if (!currentUserId || !userId) {
            throw new Error('Invalid user IDs');
        }

        // Get references to the current user and the user to follow/unfollow
        const currentUserDocRef = doc(db, 'users', currentUserId);
        const userDocRef = doc(db, 'users', userId);

        if (isFollowing) {
            // Unfollow user
            await updateDoc(currentUserDocRef, {
                following: arrayRemove(userId)
            });
            await updateDoc(userDocRef, {
                followers: arrayRemove(currentUserId)
            });
        } else {
            // Follow user
            await updateDoc(currentUserDocRef, {
                following: arrayUnion(userId)
            });
            await updateDoc(userDocRef, {
                followers: arrayUnion(currentUserId)
            });
        }
    } catch (error) {
        console.error('Error toggling follow:', error);
        throw error; // Rethrow the error to the calling function
    }
};
