import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase.js'; // Consolidated Firebase imports
import { useNavigate } from "react-router-dom";
import UploadPFP from '../components/UploadPFP.js';
import DeleteAccountModal from '../components/DeleteAccountModal.js';
import { doc, getDoc, updateDoc} from 'firebase/firestore';
import { handleDeleteAccount } from '../functions/Auth.js';
import SelectGenres from '../components/SelectGenres.js'
import TextEditor from '../components/TextEditor.js';

import "../styles/settings.css";
import RolesSelection from '../components/RolesSelection.js';
import PronounsDropdown from '../components/PronounsDropdown.js';

export default function Settings() {
    const [user] = useAuthState(auth);
    const [userData, setUserData] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [newBio, setNewBio] = useState('');
    const [showSavedMessage, setShowSavedMessage] = useState(false);
    const [desiredUsername, setDesiredUsername] = useState('');
    const [usernameChangeRequested, setUsernameChangeRequested] = useState(false);
    const [usernameAvailability, setUsernameAvailability] = useState(true); // Initially assume username is available
    const navigate = useNavigate();



    const [pronouns, setPronouns] = useState('');
    const [selectedRoles, setSelectedRoles] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Fetch user data and set pre-existing bio
                const userDoc = doc(db, 'users', user.uid);
                const docSnapshot = await getDoc(userDoc);
                if (docSnapshot.exists()) {
                    const userDataFromSnapshot = docSnapshot.data();
                    setUserData(userDataFromSnapshot);
                    setPronouns(userDataFromSnapshot.pronouns || '');
                    localStorage.setItem('userData', JSON.stringify(userDataFromSnapshot));
    
                    if (!newBio) {
                        setNewBio(userDataFromSnapshot.bio || ''); // Set pre-existing bio
                    }
    
                    // Set pronouns and selected role
                    setPronouns(userDataFromSnapshot.pronouns || '');
                    setSelectedRoles(userDataFromSnapshot.role || '');
                } else {
                    console.error('User document does not exist.');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
    
        if (user) {
            fetchUserData();
        }
    }, [user, newBio]);
    


    // Extracted function to update user bio
    const updateUserBio = async (newBio) => {
        try {
            const userDoc = doc(db, 'users', user.uid);
            await updateDoc(userDoc, { bio: newBio });
            setUserData(prevUserData => ({ ...prevUserData, bio: newBio }));
            localStorage.setItem('userData', JSON.stringify({ ...userData, bio: newBio }));
        } catch (error) {
            console.error('Error updating user bio:', error);
        }
    };



      const handleRoleChange = (role) => {
        setSelectedRoles(prevRoles => {
            if (prevRoles.includes(role)) {
                return prevRoles.filter(selectedRole => selectedRole !== role);
            } else {
                return [...prevRoles, role];
            }
        });
    };

    const handleSaveChanges = async () => {
        try {
            const userDoc = doc(db, 'users', user.uid);
            await updateDoc(userDoc, {
                bio: newBio,
                pronouns: pronouns,
                role: selectedRoles // Save selected roles to the database
            });
            setUserData({ ...userData, bio: newBio, pronouns: pronouns, role: selectedRoles });
            setShowSavedMessage(true);
            setTimeout(() => {
                setShowSavedMessage(false);
            }, 2000);
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    }

    const checkUsernameAvailability = async () => {
        try {
            const usernameDoc = doc(db, 'usernames', desiredUsername.toLowerCase());
            const docSnapshot = await getDoc(usernameDoc);
            setUsernameAvailability(!docSnapshot.exists()); // Update username availability state based on snapshot
        } catch (error) {
            console.error('Error checking username availability:', error);
        }
    };

    const handleUsernameChangeRequest = async () => {
        try {
            // Update user's data in Firestore to include the desired username
            await updateDoc(doc(db, 'users', user.uid), {
                username: desiredUsername // Update the username field directly
            });
            setShowSavedMessage(true);
            setTimeout(() => {
                setShowSavedMessage(false);
            }, 2000);
        } catch (error) {
            console.error('Error requesting username change:', error);
        }
    };
    


    return (
        <div className="min-h-screen w-full bg-gray-100 flex justify-center pl-16 pr-16">
            <div className="w-full p-6 shadow-xl">
                {!user ? navigate('/') : (
                    <>
                        <h1 className="text-3xl font-bold mb-4">Account Settings</h1>
                        <UploadPFP />
                        <p>Email: {user.email}</p>
                        {userData && (
                            <>
                                <h1 className='text-2xl font-bold m-4'>Your Bio:</h1>
                                <TextEditor defaultValue={newBio} onChange={setNewBio} maxChars={500} />

                                
                                <PronounsDropdown pronouns={pronouns} setPronouns={setPronouns} />
    
                                <RolesSelection selectedRoles={selectedRoles} setSelectedRoles={setSelectedRoles} />

    
                                <SelectGenres/>
    
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2"
                                    onClick={handleSaveChanges}
                                >
                                    Save Changes
                                </button>
                                {showSavedMessage && (
                                    <p className="text-green-500 mt-2">Saved successfully!</p>
                                )}
    
                                <div className="flex flex-col mt-4"> {/* Start of username change section */}
                                    <label htmlFor="desiredUsername" className="font-bold">Desired Username:</label>
                                    <input
                                        type="text"
                                        id="desiredUsername"
                                        className="border rounded p-2 mt-1"
                                        value={desiredUsername}
                                        onChange={(e) => setDesiredUsername(e.target.value)}
                                    />
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2"
                                        onClick={handleUsernameChangeRequest}
                                    >
                                        Request Username Change
                                    </button>
                                    {usernameChangeRequested && (
                                        <p className="text-green-500 mt-2">Username change requested!</p>
                                    )}
                                </div> {/* End of username change section */}
    
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4"
                                    onClick={() => setShowDeleteModal(true)}
                                >
                                    Delete Account
                                </button>
                                <DeleteAccountModal
                                    show={showDeleteModal}
                                    onClose={() => setShowDeleteModal(false)}
                                    onDelete={() => handleDeleteAccount(navigate)} // Pass a function reference
                                />
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
                                    }    