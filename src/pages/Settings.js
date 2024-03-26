import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase.js'; // Consolidated Firebase imports
import { useNavigate } from "react-router-dom";
import UploadPFP from '../components/shared/UploadPFP.js';
import DeleteAccountModal from '../components/user/DeleteAccountPage.js';
import { deleteDoc, doc, getDoc, updateDoc, setDoc} from 'firebase/firestore';
import { handleDeleteAccount } from '../functions/Auth.js';
import SelectGenres from '../components/user/SelectGenres.js'
import TextEditor from '../components/shared/TextEditor.js';
import { updatePassword, reauthenticateWithCredential, reauthenticateWithRedirect, GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth';
import { getRedirectResult } from 'firebase/auth';
import { toast } from 'react-toastify';

import "../styles/settings.css";
import RolesSelection from '../components/user/RolesSelection.js';
import PronounsDropdown from '../components/user/PronounsDropdown.js';

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


    const [customPronouns, setCustomPronouns] = useState("");
    const [pronouns, setPronouns] = useState('');
    const [selectedRoles, setSelectedRoles] = useState([]);

    //useEffect is called when the component is mounted
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Fetch user data from Firestore
                const userDoc = doc(db, 'users', user.uid);
                const docSnapshot = await getDoc(userDoc);

                //if the document exists, set the user data to the document data
                if (docSnapshot.exists()) {
                    const userDataFromSnapshot = docSnapshot.data();
                    setUserData(userDataFromSnapshot);
                    setPronouns(userDataFromSnapshot.pronouns || ''); // Set pronouns from Firestore
                    setCustomPronouns(userDataFromSnapshot.customPronouns || ''); // Set custom pronouns from Firestore
                    setSelectedRoles(userDataFromSnapshot.role || []); // Set roles from Firestore
                    localStorage.setItem('userData', JSON.stringify(userDataFromSnapshot));
        
                    if (!newBio) {
                        setNewBio(userDataFromSnapshot.bio || ''); // Set pre-existing bio
                    }
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

    // This function is called when a role is selected or deselected
    // It updates the selectedRoles state and the user's data in Firestore
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
                pronouns: pronouns === "Other" ? customPronouns : pronouns,
                customPronouns: pronouns === "Other" ? customPronouns : "", // Save custom pronouns if "Other" is selected
                role: selectedRoles // Save selected roles to the database
            });
            setUserData({ ...userData, bio: newBio, pronouns: pronouns, customPronouns: pronouns === "Other" ? customPronouns : "", role: selectedRoles });
            setShowSavedMessage(true);
            setTimeout(() => {
                setShowSavedMessage(false);
            }, 2000);
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    }
    

    const handleUsernameChangeRequest = async () => {
        try {

            // Ensure desiered username is text only, no special characters, no spaces, etc
            if (!desiredUsername.match(/^[a-zA-Z0-9_]*$/)) {
                throw new Error('Username can only contain letters, numbers, and underscores.');
            }

            const isAvailable = await checkUsernameAvailability();
    
            if (isAvailable) {
                // Check if the user has an existing username and delete it from the usernames collection
                if (userData && userData.username) {
                    await deleteDoc(doc(db, 'usernames', userData.username.toLowerCase()));
                }

                // Update user's data in Firestore to include the desired username
                await updateDoc(doc(db, 'users', user.uid), {
                    username: desiredUsername
                });
    
 
    
                // Add the new username to the usernames collection
                await setDoc(doc(db, 'usernames', desiredUsername.toLowerCase()), {
                    uid: user.uid
                });
    
                // Update local state with the new username
                setUserData({ ...userData, username: desiredUsername });
    
                setShowSavedMessage(true);
                setTimeout(() => {
                    setShowSavedMessage(false);
                }, 2000);
            } else {
                console.error('Username not available');
                toast.error('Username not available');
            }
        } catch (error) {
            console.error('Error requesting username change:', error);
            toast.error('Username is taken, or is invalid.');
        }
    };
    
    
    const checkUsernameAvailability = async () => {
        try {
            const usernameDoc = doc(db, 'usernames', desiredUsername.toLowerCase());
            const docSnapshot = await getDoc(usernameDoc);
            return !docSnapshot.exists(); // Return the availability of the username
        } catch (error) {
            // Log and return false if an error occurs
            console.error('Error checking username availability:', error); 
            return false;
        }
    };
    

    const handleChangePassword = async (currentPassword, newPassword, confirmPassword) => {
        try {
            // Check if new password and confirm password match
            if (newPassword !== confirmPassword) {
                throw new Error("New password and confirm password do not match.");
            }
    
            // Get the current user
            const currentUser = auth.currentUser;
    
            if (!currentUser) {
                throw new Error("User is not authenticated.");
            }
    
            // Prompt the user to reauthenticate before changing the password
            let reauthCredential;
            const providerId = currentUser.providerData[0].providerId;
    
            if (providerId === GoogleAuthProvider.PROVIDER_ID) {
                // Reauthenticate with Google using redirect
                const googleAuthProvider = new GoogleAuthProvider();
                await reauthenticateWithRedirect(currentUser, googleAuthProvider);
                await getRedirectResult(auth);
            } else if (providerId === EmailAuthProvider.PROVIDER_ID) {
                // Reauthenticate with email and password
                const email = currentUser.email;
                reauthCredential = EmailAuthProvider.credential(email, currentPassword);
            } else {
                // Unsupported provider
                throw new Error("Unsupported provider for reauthentication.");
            }
    
            // Reauthenticate user if needed
            if (reauthCredential) {
                await reauthenticateWithCredential(currentUser, reauthCredential);
            }
    
            // Update the user's password using Firebase Auth
            await updatePassword(currentUser, newPassword);
    
            // Display success message
            console.log("Password changed successfully!");
        } catch (error) {
            console.error("Error changing password:", error.message);
            if (error.code === "auth/wrong-password") {
                console.error("Invalid current password.");
            } else if (error.code === "auth/requires-recent-login") {
                console.error("Reauthentication is required. Please sign in again.");
            } else {
                console.error("Unexpected error occurred while changing password.");
                console.error("Error details:", error);
            }
        }
    };
    
    const handleVisibilityChange = async (visibility) => {
        try {
            const userDoc = doc(db, 'users', auth.currentUser.uid);
            await updateDoc(userDoc, {
                visibility: visibility
            });
        } catch (error) {
            console.error('Error updating user visibility:', error);
        }
    }


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
                                <TextEditor
                                defaultValue={userData.bio}
                                onChange={(content) => console.log('Content changed:', content)}
                                maxChars={1000}
                                />

                                <PronounsDropdown
                                    pronouns={pronouns}
                                    setPronouns={setPronouns}
                                    customPronouns={customPronouns}
                                    setCustomPronouns={setCustomPronouns}
                                />
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
                                    onClick={() => navigate('/delete-account')} >
                                    Delete Account
                                </button>

                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
                                    onClick={() => navigate('/change-password')} >
                                    Change Password
                                </button>


                                {/* Change Password*/}
                                {user.providerData[0].providerId === EmailAuthProvider.PROVIDER_ID && (
                                    <div className="change-password-section">
                                        <h1 className='text-2xl font-bold m-4'>Change Password:</h1>
                                        <input type="password" id="currentPassword" className="border rounded p-2 mt-1" placeholder="Current Password" />
                                        <input type="password" id="newPassword" className="border rounded p-2 mt-1" placeholder="New Password" />
                                        <input type="password" id="confirmPassword" className="border rounded p-2 mt-1" placeholder="Confirm New Password" />
                                        <button
                                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
                                            onClick={() => handleChangePassword(document.getElementById("currentPassword"), document.getElementById("newPassword").value, document.getElementById("confirmPassword").value)} 
                                        > 
                                        Change Password!
                                        </button>
                                    </div>
                                )}
                                <br/>
                                <h1>Account Visibility</h1>
                                <input type='radio' id='public' name='visibility' value='public'
                                    defaultChecked={userData.visibility === 'public' ? true : false}
                                    onChange={() => {handleVisibilityChange('public')}}
                                />
                                <label for='public'>Public</label>
                                <input type='radio' id='private' name='visibility' value='private'
                                    defaultChecked={userData.visibility === 'private' ? true : false}
                                    onChange={() => {handleVisibilityChange('private')}}
                                />
                                <label for='private'>Private</label>

                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}