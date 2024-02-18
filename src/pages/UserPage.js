import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import fetchUserProfilePicture from '../functions/fetchUserProfilePicture'; // Import fetchUserProfilePicture
import fetchUIDwithUsername from '../functions/fetchUIDwithUsername';

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
    const [profilePicture, setProfilePicture] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log('Fetching user data...');
                // Fetch the user document based on the username
                const userQuery = query(collection(db, 'users'), where('username', '==', username));
                const querySnapshot = await getDocs(userQuery);

                if (!querySnapshot.empty) {
                    const docData = querySnapshot.docs[0].data();
                    console.log('User Data:', docData);
                    setUserData(docData);

                    if (docData.uid) {
                        console.log('Fetching profile picture...');
                        const profilePictureURL = await fetchUserProfilePicture(docData.uid);
                        console.log('Profile Picture URL:', profilePictureURL);
                        setProfilePicture(profilePictureURL);
                        console.log('Profile picture fetched.');
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
    }, []); // Removed 'username' from dependency array


    const toggleFollow = async () => {
        try {
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
    
            if (!userData.UID) {
                console.error('UID not found in user data.');
                return;
            }
    
            const currentUserDocRef = doc(db, 'users', currentUserId);
            console.log('Current User Document Reference:', currentUserDocRef);
    
            const currentUserDocSnapshot = await getDoc(currentUserDocRef);
            console.log('Current User Document Snapshot:', currentUserDocSnapshot);
    
            if (!currentUserDocSnapshot.exists()) {
                console.error('Current user document not found.');
                return;
            }
    
            const currentUserDocData = currentUserDocSnapshot.data();
            console.log('Current User Document Data:', currentUserDocData);
    
            if (!currentUserDocData.following) {
                await setDoc(currentUserDocRef, { following: [] }, { merge: true });
                console.log('Following array created in current user document.');
            }
            if (!currentUserDocData.followers) {
                await setDoc(currentUserDocRef, { followers: [] }, { merge: true });
                console.log('Followers array created in current user document.');
            }

            // Check if the user is already followed
            const isAlreadyFollowing = currentUserDocData.following && currentUserDocData.following.includes(userData.UID);
            console.log('Is Already Following:', isAlreadyFollowing);

            // Update Firestore documents based on follow status
            if (isAlreadyFollowing) {
                // Remove current user from following list of the user being unfollowed
                await setDoc(currentUserDocRef, {
                    following: currentUserDocData.following.filter(id => id !== userData.UID)
                }, { merge: true });

                console.log('User unfollowed successfully.');
            } else {
                // Add current user to following list of the user being followed
                await setDoc(currentUserDocRef, {
                    following: [...currentUserDocData.following, userData.UID]
                }, { merge: true });

                console.log('User followed successfully.');
            }

            // Update local state based on follow status
            setIsFollowing(!isAlreadyFollowing);
        } catch (error) {
            console.error('Error toggling follow:', error);
        }
    };
    
    
    
    
    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {userData ? (
                <div>
                    <h2>Username: {userData.username}</h2>
                    {profilePicture && <img src={profilePicture} alt="Profile" />}
                    {userData.uid && <p>UID: {userData.uid}</p>}
                    {userData.email && <p>Email: {userData.email}</p>}
                    {userData.bio && <p>Bio: {userData.bio}</p>}
                    {userData.pronouns && <p>Pronouns: {userData.pronouns}</p>}
                    {/* Display more user data as needed */}
                    <FollowButton isFollowing={isFollowing} toggleFollow={toggleFollow} />
                </div>
            ) : (
                <p>User data not found.</p>
            )}
        </div>
    );
};

export default UserPage;
