import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { deleteUser } from "firebase/auth";
import { auth, storage } from '../firebase.js';
import { useNavigate } from "react-router-dom"; // Import useNavigate
import UploadPFP from '../components/UploadPFP.js';
import DeleteAccountModal from '../components/DeleteAccountModal.js';
import { db } from '../firebase.js';
import { doc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref, listAll, deleteObject } from 'firebase/storage'; // Import the necessary functions

export default function Profile(){
    const [user] = useAuthState(auth);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const navigate = useNavigate(); // Use useNavigate for navigation

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
            const userStorageRef = ref(storage, `users/${currentUser.uid}`);
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
    

// Function to delete folder and its contents recursively
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
