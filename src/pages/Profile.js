import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { deleteUser } from "firebase/auth";
import { auth, storage } from '../firebase.js';
import { useNavigate } from "react-router-dom";
import UploadPFP from '../components/UploadPFP.js';
import DeleteAccountModal from '../components/DeleteAccountModal.js';
import { db } from '../firebase.js';
import { doc, getDoc, updateDoc, deleteDoc} from 'firebase/firestore';
import { deleteObject, listAll} from 'firebase/storage';

export default function Profile() {
    const [user] = useAuthState(auth);
    const [userData, setUserData] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [newBio, setNewBio] = useState(''); // State to store changes in bio
    const [showSavedMessage, setShowSavedMessage] = useState(false); // State for showing saved message
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDoc = doc(db, 'users', user.uid);
                const docSnapshot = await getDoc(userDoc);
                if (docSnapshot.exists()) {
                    setUserData(docSnapshot.data());
                    setNewBio(docSnapshot.data().bio); // Set initial bio value
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
    }, [user]);
    
    const handleDeleteAccount = async () => {
        try {
            // Ensure that the user is authenticated
            const currentUser = auth.currentUser;
            if (!currentUser) {
                console.error('User is not authenticated.');
                return;
            }
    
            // Delete user's account
            await deleteUser(currentUser);
    
            // Delete user's folder and its contents from storage
            const userStorageRef = storage.ref(`users/${currentUser.uid}`); // Changed ref to storage.ref
            await deleteFolder(userStorageRef);

            // Delete user's Firestore document
            const userFirestoreRef = doc(db, "users", currentUser.uid);
            await deleteDoc(userFirestoreRef);
    
            // After deletion, navigate to the homepage or any desired route
            navigate('/');
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };

    const deleteFolder = async (folderRef) => {
        try {
            const items = await listAll(folderRef);
            const promises = items.items.map(async (item) => {
                if (item.isDirectory) {
                    // Recursively delete sub-folders
                    await deleteFolder(item);
                } else {
                    // Delete files
                    await deleteObject(item);
                }
            });
            await Promise.all(promises);
            console.log('Folder deleted successfully');
        } catch (error) {
            console.error('Error deleting folder:', error);
        }
    };
    

    const handleSaveChanges = async () => {
        try {
            const userDoc = doc(db, 'users', user.uid);
            await updateDoc(userDoc, {
                bio: newBio,
            });
            setUserData({ ...userData, bio: newBio }); // Update local state
            setShowSavedMessage(true); // Show saved message
            setTimeout(() => setShowSavedMessage(false), 2000); // Hide saved message after 2 seconds
        } catch (error) {
            console.error('Error updating bio:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-xl">
                {!user ? navigate('/') : (
                    <>
                        <h1 className="text-2xl font-bold mb-4">Profile</h1>
                        <UploadPFP />
                        {/* Display user information */}
                        <p>Email: {user.email}</p>
                        {userData && (
                            <>
                                {/* Editable bio input field */}
                                <h2 className="font-semibold">Bio:</h2>
                                <input
                                    className="w-full p-2 mt-2 border rounded"
                                    type="text"
                                    value={newBio}
                                    onChange={(e) => setNewBio(e.target.value)}
                                />
                                {/* Save button */}
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2"
                                    onClick={handleSaveChanges}
                                >
                                    Save Changes
                                </button>
                                {/* Saved message */}
                                {showSavedMessage && (
                                    <p className="text-green-500 mt-2">Saved successfully!</p>
                                )}
                            </>
                        )}
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4"
                            onClick={() => setShowDeleteModal(true)}
                        >
                            Delete Account
                        </button>
                        <DeleteAccountModal
                            show={showDeleteModal}
                            onClose={() => setShowDeleteModal(false)}
                            onDelete={handleDeleteAccount}
                        />
                    </>
                )}
            </div>
        </div>
    );
}