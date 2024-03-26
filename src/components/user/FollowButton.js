import { useState, useEffect } from 'react';
import { requestFollow } from '../../functions/requestFollow';
import { auth, db } from '../../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { toggleFollow } from '../../functions/toggleFollow';

export const FollowButton = ({ targetUserId }) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [visibility, setVisibility] = useState('public');
    const [hasRequested, setHasRequested] = useState(false);

    useEffect(() => {
        const unsubscribeTarget = onSnapshot(doc(db, 'users', targetUserId), (doc) => {
            if (doc.exists()) {
                const targetUserData = doc.data();
                setVisibility(targetUserData.visibility);
            }
        });

        const unsubscribeCurrent = onSnapshot(doc(db, 'users', auth.currentUser.uid), (doc) => {
            if (doc.exists()) {
                const currentUserData = doc.data();
                setIsFollowing(currentUserData.following?.includes(targetUserId));
                setHasRequested(currentUserData.requested?.includes(targetUserId));
            }
        });

        return () => {
            unsubscribeTarget();
            unsubscribeCurrent();
        };
    }, [targetUserId]);

    const handleToggleFollow = async () => {
        if (visibility === 'public') {
            await toggleFollow(targetUserId, isFollowing);
            setIsFollowing(!isFollowing);
        } else {
            const result = await requestFollow(targetUserId, hasRequested);
            setHasRequested(result);
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
            disabled={hasRequested || (visibility === 'private' && isFollowing)}
        >
            {buttonText}
        </button>
    );
};
