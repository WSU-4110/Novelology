import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs, doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db, auth } from '../firebase';
import fetchUserProfilePicture from '../functions/fetchUserProfilePicture'; // Import fetchUserProfilePicture
import fetchUIDwithUsername from '../functions/fetchUIDwithUsername';
import { FaInfoCircle, FaEnvelope, FaUser } from 'react-icons/fa';
import fetchPFP from '../functions/fetchPFP';

const FollowButton = ({ isFollowing, toggleFollow }) => {
    return (
        <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            onClick={toggleFollow}
        >
            {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
    );
};

const UserPage = () => {
    const { username } = useParams();
    const [userData, setUserData] = useState(null);
    const [fetchedProfilePicture, setFetchedProfilePicture] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
   
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log('Fetching user data...');
                const q = query(collection(db, 'users'), where('username', '==', username));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const docData = querySnapshot.docs[0].data();
                    console.log('User Data:', docData);
                    setUserData(docData);

                    const profilePictureURL = await fetchPFP(auth.currentUser.uid);
                    if (profilePictureURL !== fetchedProfilePicture) {
                        setFetchedProfilePicture(profilePictureURL);
                        localStorage.setItem('profilePicture', profilePictureURL); 
                    }

                    setFollowersCount(docData.followers ? docData.followers.length : 0);
                    setFollowingCount(docData.following ? docData.following.length : 0);

                    const currentUser = auth.currentUser;
                    if (currentUser && docData.uid && currentUser.uid !== docData.uid) {
                        setIsFollowing(docData.followers && docData.followers.includes(currentUser.uid));
                    }
                } else {
                    console.error('User document not found for username:', username);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [username]);


    const toggleFollow = async () => {
        // Add or remove the current user from the followers list of the user being followed/unfollowed
        try {
            // Check if user data is initialized
            if (!userData) {
                console.error('User data not initialized.');
                return;
            }
    
            const currentUser = auth.currentUser;
            if (!currentUser) {
                console.error('Current user not authenticated.');
                return;
            }
            const currentUserId = currentUser.uid;
            console.log('Current User ID:', currentUserId);
    
            if (!userData.UID) { // Change to userData.UID (uppercase I)
                console.error('UID not found in user data.');
                return;
            }
    
            // Get current user document
            const currentUserDocRef = doc(db, 'users', currentUserId);
            // Get current user document snapshot
            const currentUserDocSnapshot = await getDoc(currentUserDocRef);

    
            if (!currentUserDocSnapshot.exists()) {
                console.error('Current user document not found.');
                return;
            }
    
            const currentUserDocData = currentUserDocSnapshot.data();
            console.log('Current User Document Data:', currentUserDocData);
    
            // Update Firestore documents based on follow status
            if (isFollowing) {
                // Unfollow the user
                await updateDoc(currentUserDocRef, {
                    following: arrayRemove(userData.UID) // Change to userData.UID (uppercase I)
                });
    
                // Remove current user from the followers list of the user being unfollowed
                const userDocRef = doc(db, 'users', userData.UID); // Change to userData.UID (uppercase I)
                await updateDoc(userDocRef, {
                    followers: arrayRemove(currentUserId)
                });
    
                console.log('User unfollowed successfully.');
            } else {
                // Follow the user
                await updateDoc(currentUserDocRef, {
                    following: arrayUnion(userData.UID) // Change to userData.UID (uppercase I)
                });
    
                // Add current user to the followers list of the user being followed
                const userDocRef = doc(db, 'users', userData.UID); // Change to userData.UID (uppercase I)
                await updateDoc(userDocRef, {
                    followers: arrayUnion(currentUserId)
                });
    
                console.log('User followed successfully.');
            }
    
            // Update local state based on follow status
            setIsFollowing(!isFollowing);
    
            // Update followers count
            setFollowersCount(prevCount => isFollowing ? prevCount - 1 : prevCount + 1);
        } catch (error) {
            console.error('Error toggling follow:', error);
        }
    };
    
    
    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    const defaultProfilePicture = require('../assets/default-profile-picture.jpg');

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
            {userData ? (
                <div>
                    <h2 className="text-3xl font-semibold mb-4"><span className="text-blue-400">@</span> {userData.username}</h2>
                    <div className="mr-8">
                        <img 
                            src={fetchedProfilePicture || defaultProfilePicture} 
                            alt="Profile" 
                            className="w-24 h-24 rounded-full" 
                        />
                    </div>
                    {userData.bio ? (
                        <p className="mb-2"><FaInfoCircle className="inline-block mr-2" /><span className="font-semibold">Bio:</span> {userData.bio}</p>
                    ) : (
                        <p className="mb-2"><FaInfoCircle className="inline-block mr-2" /><span className="font-semibold">Bio:</span> <span className="text-orange-500">No bio provided</span></p>
                    )}
                    {userData.pronouns && <p className="mb-2"><FaInfoCircle className="inline-block mr-2" /><span className="font-semibold">Pronouns:</span> {userData.pronouns}</p>}
                    <div className="flex justify-between mb-4">
                        <p className="font-semibold"><FaUser className="inline-block mr-2" /> Followers: {followersCount}</p>
                        <p className="font-semibold"><FaUser className="inline-block mr-2" /> Following: {followingCount}</p>
                    </div>
                    {userData && userData.role && userData.role.length > 0 && (
                        <div className="mb-2">
                            <p><strong>Roles:</strong></p>
                            <ul className="list-disc ml-4">
                                {userData.role.map((role, index) => (
                                    <li key={index}>{role}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {auth.currentUser && auth.currentUser.uid !== userData.uid && (
                        <FollowButton isFollowing={isFollowing} toggleFollow={toggleFollow} />
                    )}
                </div>
            ) : (
                <p className="text-red-500">User data not found.</p>
            )}
        </div>
    );
};
            
export default UserPage;