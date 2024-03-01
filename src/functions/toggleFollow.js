import { db } from '../firebase';
import { doc, arrayRemove, arrayUnion, updateDoc } from 'firebase/firestore';

export const toggleFollow = async (currentUserId, userId, isFollowing) => {
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
};