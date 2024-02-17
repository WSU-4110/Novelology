import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import fetchUsernameWithUID from '../functions/fetchUsernameWithUID';
import fetchUserProfilePicture from '../functions/fetchUserProfilePicture'; // Import fetchUserProfilePicture

const UserPage = () => {
    const { username } = useParams();
    const [userData, setUserData] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log('Fetching user data...');
                // Fetch the user document based on the username
                const userQuery = query(collection(db, 'users'), where('username', '==', username));
                const querySnapshot = await getDocs(userQuery);

                if (!querySnapshot.empty) {
                    querySnapshot.forEach(async doc => {
                        console.log('User document found.');
                        const userData = doc.data();
                        console.log('User Data:', userData);
                        setUserData(userData);

                        // Ensure userData.uid exists before calling fetchUserProfilePicture
                        if (userData.uid) {
                            console.log('Fetching profile picture...');
                            // Fetch profile picture using fetchUserProfilePicture and pass in UID
                            const profilePictureURL = await fetchUserProfilePicture(userData.uid);
                            console.log('Profile Picture URL:', profilePictureURL);
                            setProfilePicture(profilePictureURL);
                            console.log('Profile picture fetched.');
                        }
                    });
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
                    {/* Display more user data as needed */}
                </div>
            ) : (
                <p>User data not found.</p>
            )}
        </div>
    );
};

export default UserPage;
