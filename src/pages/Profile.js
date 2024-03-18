import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase.js';
import { doc, getDoc } from 'firebase/firestore';
import fetchPFP from '../functions/fetchPFP';
import fetchUsernameWithUID from '../functions/fetchUsernameWithUID.js';
import DOMPurify from 'dompurify';
import NewBookList from '../components/BookStacks/NewBookList.js'
const Profile = () => {
    const [user, loading] = useAuthState(auth);
    const [userData, setUserData] = useState(null);
    const [fetchedProfilePicture, setFetchedProfilePicture] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Set loading to false initially
    const [show, setShow] = useState(false);
    const noShow = () => setShow(false);


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (user && !userData) {
                    setIsLoading(true); 
                    const userRef = doc(db, 'users', user.uid);
                    const docSnapshot = await getDoc(userRef);

                    if (docSnapshot.exists()) {
                        const userData = docSnapshot.data();
                        setUserData(userData);
                        localStorage.setItem('userData', JSON.stringify(userData)); 
                    } else {
                        console.log('User document does not exist');
                    }

                    const profilePictureURL = await fetchPFP(user.uid);
                    if (profilePictureURL !== fetchedProfilePicture) {
                        setFetchedProfilePicture(profilePictureURL);
                        localStorage.setItem('profilePicture', profilePictureURL); 
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setIsLoading(false); 
            }
        };

        fetchUserData();
    }, [user, userData, fetchedProfilePicture]);

    if (loading || isLoading) {
        return <div>Loading...</div>; 
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

    console.log('userData:', userData); // Log userData to inspect its structure

    return (
        <>
        <div className="profile-container bg-purple-100 p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4">User Profile</h1>

            {userData && (
                <div className="flex items-center mb-8">
                    {/* Conditionally render the profile picture */}
                    <div className="mr-8">
                        <img 
                            src={fetchedProfilePicture || defaultProfilePicture} 
                            alt="Profile" 
                            className="w-24 h-24 rounded-full" 
                        />
                    </div>
                    <div>
                        <p className="mb-2"><strong>Username:</strong> {userData.username}</p>
                        {userData.bio ? (
                            <p dangerouslySetInnerHTML={{ __html: `<strong>Bio:</strong> ${DOMPurify.sanitize(userData.bio)}` }}></p>
                        ) : (
                            <p className="mb-2">
                            <span className="font-semibold">Bio:</span> 
                            <span className="text-orange-500">No bio provided</span>
                        </p>
                        )}
                        {userData.role && userData.role.length > 0 && (
                            <div className="mb-2">
                                <p><strong>Roles:</strong></p>
                                <ul className="list-disc ml-4">
                                    {userData.role.map((role, index) => (
                                        <li key={index}>{role}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {userData.pronouns && <p className="mb-2"><strong>Pronouns:</strong> {userData.pronouns}</p>}
                        <p><strong>Genres:</strong> {userData.genres ? userData.genres.join(', ') : 'No genres selected'}</p>
                    </div>
                </div>
            )}

            <div className="flex justify-between">
                <Link to={`/users/${userData && userData.username}`} className="bg-blue-300 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded">
                    View Your Public Page!
                </Link>

                <Link to="/settings" className="bg-pink-300 hover:bg-pink-400 text-white font-bold py-2 px-4 rounded">
                    Go to Settings
                </Link>
            </div>
        </div>
        <button onClick={()=>setShow(true)}className="bg-sky-100 rounded-full p-3 ml-2 mt-2">Create a new Book List</button>
        {show && <NewBookList show={show} onClose={noShow} />}

        </>
    );
};
export default Profile;
