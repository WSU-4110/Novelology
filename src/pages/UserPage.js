import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getUserByUsername from '../functions/getUserByUsername';

function UserPage() {
    const { username } = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        getUserByUsername(username)
            .then((data) => setUserData(data))
            .catch((error) => console.error('Error fetching user data:', error));
    }, [username]);

    return (
        <div>
            {userData ? (
                <div>
                    <h2>Username: {username}</h2>
                    <p>Email: {userData.email}</p>
                    {userData.profilePicture ? (
                        <img src={userData.profilePicture} alt="Profile Picture" />
                    ) : (
                        <p>No profile picture found</p>
                    )}
                    {userData.bio && <p>Bio: {userData.bio}</p>}
                    {/* Additional user data rendering */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default UserPage;
