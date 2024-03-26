import { useState, useEffect } from 'react';
import { requestFollow } from '../../functions/requestFollow';
import { auth, db } from '../../firebase';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { toggleFollow } from '../../functions/toggleFollow';

export const FollowButton = ({ targetUserId }) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [visibility, setVisibility] = useState('public');
    const [hasRequested, setHasRequested] = useState(false);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, 'users', auth.currentUser.uid), (doc) => {
            if (doc.exists()) {
                const userData = doc.data();
                setIsFollowing(userData.following.includes(targetUserId));
                setHasRequested(userData.requested && userData.requested.includes(targetUserId));
            }
        });

        return () => unsubscribe();
    }, [targetUserId]);

    const handleToggleFollow = async () => {
        if (visibility === 'public') {
            await toggleFollow(targetUserId);
        } else {
            const result = await requestFollow(targetUserId);
            if (result !== null) {
                setHasRequested(result);
            }
        }
    };

    let buttonText = 'Follow';
    if (isFollowing) {
        buttonText = 'Unfollow';
    } else if (hasRequested) {
        buttonText = 'Requested';
    } else if (visibility === 'private') {
        buttonText = 'Request Follow';
    }

    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleToggleFollow}
        >
            {buttonText}
        </button>
    );
};
