import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase.js';
import { doc, getDoc } from 'firebase/firestore';
import fetchPFP from '../functions/fetchPFP';
import fetchUsernameWithUID from '../functions/fetchUsernameWithUID.js';

const Profile = () => {
    const [user, loading] = useAuthState(auth);
    const [userData, setUserData] = useState(() => {
        const storedUserData = localStorage.getItem('userData');
        return storedUserData ? JSON.parse(storedUserData) : null;
    });
    const [fetchedProfilePicture, setFetchedProfilePicture] = useState(() => {
        const storedProfilePicture = localStorage.getItem('profilePicture');
        return storedProfilePicture ? storedProfilePicture : null;
    });
    const [isLoading, setIsLoading] = useState(false); // Set loading to false initially

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (user && !fetchedProfilePicture) { // Fetch profile picture only if not available in local storage
                    const userRef = doc(db, 'users', user.uid);
                    const docSnapshot = await getDoc(userRef);
                    
                    if (docSnapshot.exists()) {
                        const userData = docSnapshot.data();
                        setUserData(userData);
                        localStorage.setItem('userData', JSON.stringify(userData)); // Store userData in localStorage
                    } else {
                        console.log('User document does not exist');
                    }

                    const profilePictureURL = await fetchPFP(user.uid);
                    setFetchedProfilePicture(profilePictureURL);
                    localStorage.setItem('profilePicture', profilePictureURL); // Store profile picture URL in localStorage
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setIsLoading(false); // Set loading to false after fetching data
            }
        };
    
        fetchUserData();
    }, [user, fetchedProfilePicture]);

    if (loading || isLoading) {
        return <div>Loading...</div>; // Show loading indicator while fetching data
    }

    if (!user) {
        return (
            <div>
                <p>You need to sign in to view your profile. Redirecting...</p>
                {setTimeout(() => {
                    window.location.href = '/';
                }, 2000)}
            </div>
        );
    }

    const defaultProfilePicture = require('../assets/default-profile-picture.jpg');

    return (
        <div className="profile-container bg-purple-100 p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold">User Profile</h1>
            
            {userData && (
                <div>
                    {/* Conditionally render the profile picture */}
                    {fetchedProfilePicture !== null ? (
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
