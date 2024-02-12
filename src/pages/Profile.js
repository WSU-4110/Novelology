import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase.js';

const Profile = () => {
    const [user] = useAuthState(auth);

    return (
        <div>
            <h1>User profile</h1>
            {user && (
                <Link to="/settings">Go to Settings</Link>
            )}
        </div>
    );
};

export default Profile;
