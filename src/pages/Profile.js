import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { deleteUser } from "firebase/auth";
import { auth, storage } from '../firebase.js';
import { useNavigate } from "react-router-dom"; // Import useNavigate
import UploadPFP from '../components/UploadPFP.js';
import DeleteAccountModal from '../components/DeleteAccountModal.js';

export default function Profile(){
    const [user] = useAuthState(auth);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const navigate = useNavigate(); // Use useNavigate for navigation

    const handleDeleteAccount = async () => {
        // Ensure that the user is authenticated
        if (!auth.currentUser) {
            console.error('User is not authenticated.');
            return;
        }
    
        // Delete user's account and associated data
        try {
            // Delete user's account
            await deleteUser(auth.currentUser);
    
            // Delete user's folder and its contents from storage (replace 'users' with your storage folder name)
            const userStorageRef = storage.ref(`users/${auth.currentUser.uid}`);
            await deleteFolder(userStorageRef);
    
            // After deletion, navigate to the homepage or any desired route
            navigate('/');
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };
    
    // Function to delete folder and its contents recursively
    const deleteFolder = async (folderRef) => {
        // List all items (files and sub-folders) in the folder
        const items = await folderRef.listAll();
    
        // Delete each item (file or sub-folder) in the folder
        await Promise.all(items.items.map(async (item) => {
            if (item.isDirectory) {
                // Recursively delete sub-folders
                await deleteFolder(item);
            } else {
                // Delete files
                await item.delete();
            }
        }));
    
        // After deleting all items, delete the empty folder
        await folderRef.delete();
    };
    
    
    return (
        <div>
            {!user ? navigate('/') : (
                <>
                    <h1>Profile</h1>
                    <UploadPFP />
                    <button className='delete-account-button' onClick={() => setShowDeleteModal(true)}>Delete Account</button>
                    <DeleteAccountModal
                        show={showDeleteModal}
                        onClose={() => setShowDeleteModal(false)}
                        onDelete={handleDeleteAccount}
                    />
                </>
            )}
        </div>
    );
}
