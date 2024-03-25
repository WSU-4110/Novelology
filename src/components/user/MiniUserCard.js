import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, collection, addDoc, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import fetchPFP from '../../functions/fetchPFP';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const FollowButton = ({ isFollowing, toggleFollow, hasRequested }) => {
    let buttonText = isFollowing ? 'Unfollow' : 'Follow';
    if (hasRequested) {
        buttonText = 'Requested';
    }

    return (
        <button
            className="bg-blue-500 w-15 h-5 text-sm hover:bg-blue-700 text-white font-bold px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={toggleFollow}
        >
            {buttonText}
        </button>
    );
};

const MiniUserCard = ({ userId }) => {
    const [userData, setUserData] = useState(null);
    const [fetchedProfilePicture, setFetchedProfilePicture] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);
    const [hasRequested, setHasRequested] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            const userRef = doc(db, 'users', userId);
            const userSnapshot = await getDoc(userRef);

            if (userSnapshot.exists()) {
                const userData = userSnapshot.data();
                setUserData(userData);

                const profilePictureURL = await fetchPFP(userId);
                setFetchedProfilePicture(profilePictureURL);

                const currentUser = auth.currentUser;
                if (currentUser) {
                    setIsFollowing(userData.followers && userData.followers.includes(currentUser.uid));

                    const currentUserDocRef = doc(db, 'users', currentUser.uid);
                    const currentUserDoc = await getDoc(currentUserDocRef);
                    if (currentUserDoc.exists()) {
                        const currentUserData = currentUserDoc.data();
                        setHasRequested(currentUserData.requested && currentUserData.requested.includes(userId));
                    }
                }
            } else {
                console.error('User document not found for user ID:', userId);
            }

            setIsLoading(false);
        };

        fetchUserData();
    }, [userId]);

    const toggleFollow = async () => {
        try {
            if (!userData || !auth.currentUser) {
                throw new Error('User data not initialized or current user not authenticated.');
            }

            const currentUserId = auth.currentUser.uid;

            if (isFollowing) {
                await updateDoc(doc(db, 'users', currentUserId), {
                    following: arrayRemove(userId)
                });
                await updateDoc(doc(db, 'users', userId), {
                    followers: arrayRemove(currentUserId)
                });
                toast.success('User unfollowed successfully.');
                setIsFollowing(false);
            } else if (userData.visibility === 'private' && !hasRequested) {
                await updateDoc(doc(db, 'users', currentUserId), {
                    requested: arrayUnion(userId)
                });
                await addDoc(collection(db, 'users', userId, 'notifications'), {
                    type: 'follow_request',
                    fromUserId: currentUserId,
                    timestamp: new Date()
                });
                toast.success('Follow request sent successfully.');
                setHasRequested(true);
            } else if (userData.visibility === 'private' && hasRequested) {
                await updateDoc(doc(db, 'users', currentUserId), {
                    requested: arrayRemove(userId)
                });
                const notificationsRef = collection(db, 'users', userId, 'notifications');
                const q = query(notificationsRef, where('type', '==', 'follow_request'), where('fromUserId', '==', currentUserId));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach(async (doc) => {
                    await deleteDoc(doc.ref);
                });
                toast.success('Follow request canceled successfully.');
                setHasRequested(false);
            } else {
                await updateDoc(doc(db, 'users', currentUserId), {
                    following: arrayUnion(userId)
                });
                await updateDoc(doc(db, 'users', userId), {
                    followers: arrayUnion(currentUserId)
                });
                toast.success('User followed successfully.');
                setIsFollowing(true);
            }
        } catch (error) {
            console.error('Error toggling follow:', error);
            toast.error('Error toggling follow.');
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const defaultProfilePicture = require('../../assets/default-profile-picture.jpg');

    return (
        <div className="relative user-card rounded-lg shadow-md p-2 h-30 w-[200px] gap-2 mb-2         bg-gray-300">
        {userData ? (
            <div>
                <div className='flex flex-row align-middle h-full items-center justify-center'>
                    <div className="h-full w-1/3">
                        <Link to={`/users/${userData.username}`}>
                            <img 
                                src={fetchedProfilePicture || defaultProfilePicture} 
                                alt="Profile" 
                                className="rounded-full object-cover h-full w-full" 
                            />
                        </Link>
                    </div>
                    <div className='flex flex-col justify-center items-center w-full'>
                        <Link to={`/users/${userData.username}`}>
                            <h2 className="text-md justify-center font-semibold mb-2"><span className="text-blue-400">@</span> {userData.username}</h2>
                        </Link>
                        {auth.currentUser && auth.currentUser.uid !== userData.uid && (
                            <FollowButton isFollowing={isFollowing} toggleFollow={toggleFollow} hasRequested={hasRequested} />
                        )}
                    </div>
                </div>
            </div>
        ) : (
            <p className="text-red-500">User data not found.</p>
        )}
    </div>
);
};

export default MiniUserCard;

