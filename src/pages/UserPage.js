import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs, doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
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
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log('Fetching user data...');
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
    
            if (!userData.UID) { // Change to userData.UID (uppercase I)
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
                    <p>Followers: {followersCount}</p>
                    <p>Following: {followingCount}</p>
                    {auth.currentUser && auth.currentUser.uid !== userData.uid && (
                        <FollowButton isFollowing={isFollowing} toggleFollow={toggleFollow} />
                    )}
                </div>
            ) : (
                <p>User data not found.</p>
            )}
        </div>
    );
};
export default UserPage;
