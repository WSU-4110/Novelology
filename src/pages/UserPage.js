import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs, doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db, auth } from '../firebase';
import fetchUserProfilePicture from '../functions/fetchUserProfilePicture'; // Import fetchUserProfilePicture
import fetchUIDwithUsername from '../functions/fetchUIDwithUsername';
import { FaInfoCircle, FaEnvelope, FaUser } from 'react-icons/fa';

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
        <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
            {userData ? (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Username: {userData.username}</h2>
                    {profilePicture && <img src={profilePicture} alt="Profile" className="rounded-full w-20 h-20 object-cover mb-4" />}
                    {userData.uid && <p className="mb-2"><FaInfoCircle className="inline-block mr-2" /><span className="font-semibold">UID:</span> {userData.uid}</p>}
                    {userData.email && <p className="mb-2"><FaEnvelope className="inline-block mr-2" /><span className="font-semibold">Email:</span> {userData.email}</p>}
                    {userData.bio && <p className="mb-2"><FaInfoCircle className="inline-block mr-2" /><span className="font-semibold">Bio:</span> {userData.bio}</p>}
                    {userData.pronouns && <p className="mb-2"><FaInfoCircle className="inline-block mr-2" /><span className="font-semibold">Pronouns:</span> {userData.pronouns}</p>}
                    <div className="flex justify-between mb-4">
                        <p className="font-semibold"><FaUser className="inline-block mr-2" /> Followers: {followersCount}</p>
                        <p className="font-semibold"><FaUser className="inline-block mr-2" /> Following: {followingCount}</p>
                    </div>
                    {auth.currentUser && auth.currentUser.uid !== userData.uid && (
                        <FollowButton isFollowing={isFollowing} toggleFollow={toggleFollow} />
                    )}
                </div>
            ) : (
                <p className="text-red-500">User data not found.</p>
            )}
        </div>
    );
            }
export default UserPage;
