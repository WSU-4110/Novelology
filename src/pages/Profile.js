import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase.js';
import { doc, getDoc } from 'firebase/firestore';
import fetchPFP from '../functions/fetchPFP';
import fetchUsernameWithUID from '../functions/fetchUsernameWithUID.js';

const Profile = () => {
    const [user, loading] = useAuthState(auth);
    const [userData, setUserData] = useState(null);
    const [fetchedProfilePicture, setFetchedProfilePicture] = useState(null); // State to store fetched profile picture

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (user) {
                    const userRef = doc(db, 'users', user.uid);
                    const docSnapshot = await getDoc(userRef);
                    
                    if (docSnapshot.exists()) {
                        setUserData(docSnapshot.data());
                    } else {
                        console.log('User document does not exist');
                    }

                    // Fetch profile picture if available
                    const profilePictureURL = await fetchPFP(user.uid);
                    setFetchedProfilePicture(profilePictureURL);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
    
        fetchUserData();
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        // If user is not authenticated, redirect to home
        return (
            <div>
                <p>You need to sign in to view your profile. Redirecting...</p>
                {setTimeout(() => {
                    window.location.href = '/';
                }, 2000)}
            </div>
        );
    }

    // Define the path to the default profile picture in the assets folder
    const defaultProfilePicture = require('../assets/default-profile-picture.jpg');

    return (
        <div className="profile-container bg-purple-100 p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold">User Profile</h1>
            {userData && (
                <div>
                    {fetchedProfilePicture ? (
                        <img src={fetchedProfilePicture} alt="Profile" className="w-24 h-24 rounded-full my-4" />
                    ) : (
                        <img src={defaultProfilePicture} alt="Default Profile" className="w-24 h-24 rounded-full my-4" />
                    )}
                    <div className='m-8'>
                        <p><strong>Username:</strong> {userData.username}</p>
                        <p><strong>Bio:</strong> {userData.bio}</p>
                        <p><strong>Pronouns:</strong> {userData.pronouns}</p>
                        <p><strong>Genres:</strong> {userData.genres ? userData.genres.join(', ') : 'No genres selected'}</p>
                    </div>
                </div>
            )}


            <Link to={`/users/${userData && userData.username}`} className="bg-blue-300 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded">
                View Your Public Page!
            </Link>

            <Link to="/settings" className="mt-4 bg-pink-300 hover:bg-pink-400 text-white font-bold py-2 px-4 rounded">
                Go to Settings
            </Link>
        </div>
    );
};

export default Profile;
