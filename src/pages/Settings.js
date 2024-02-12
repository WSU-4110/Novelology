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
import { handleLogout } from '../functions/Auth.js';


// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';


import "../styles/settings.css";

export default function Settings() {
    const [user] = useAuthState(auth);
    const [userData, setUserData] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [newBio, setNewBio] = useState('');
    const [showSavedMessage, setShowSavedMessage] = useState(false); 
    const navigate = useNavigate();
    const [genreInput, setGenreInput] = useState("");
    const [inputFlash, setInputFlash] = useState(false); 
    const [hoveredGenre, setHoveredGenre] = useState(null); 
    const [genres, setGenres] = useState(null);
    const [loadingGenres, setLoadingGenres] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDoc = doc(db, 'users', user.uid);
                const docSnapshot = await getDoc(userDoc);
                if (docSnapshot.exists()) {
                    const userDataFromSnapshot = docSnapshot.data();
                    setUserData(userDataFromSnapshot);
                    localStorage.setItem('userData', JSON.stringify(userDataFromSnapshot));

                    // Check if genres are present in userData
                    if (userDataFromSnapshot.selectedGenres) {
                        setGenres(userDataFromSnapshot.selectedGenres); // Use selectedGenres instead of genres
                        localStorage.setItem('genres', JSON.stringify(userDataFromSnapshot.selectedGenres)); // Update local storage
                    } else {
                        console.error('Genres data not found in userData.');
                    }

                    // Set newBio state if it's not already set
                    if (!newBio) {
                        setNewBio(userDataFromSnapshot.bio || '');
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
      

        // Function to handle logout
        const handleLogoutClick = () => {
            handleLogout(navigate); // Pass navigate function to handleLogout
        };
    
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
    
    const updateUserBio = async (newBio) => {
        try {
            const userDoc = doc(db, 'users', user.uid);
            await updateDoc(userDoc, { bio: newBio });

            // Update local user data
            setUserData(prevUserData => ({
                ...prevUserData,
                bio: newBio
            }));

            // Update local storage
            localStorage.setItem('userData', JSON.stringify({ ...userData, bio: newBio }));
        } catch (error) {
            console.error('Error updating user bio:', error);
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

    const handleAddGenre = async (e) => {
        e.preventDefault();
      
        if (!genreInput.trim()) {
          return;
        }
      
        try {
          const genreRef = doc(db, "genres", genreInput.trim());
          const genreDocSnapshot = await getDoc(genreRef);
      
          if (genreDocSnapshot.exists()) {
            // Check if the genre is not already in the userData
            if (!userData.genres || !userData.genres.includes(genreInput.trim())) {
              const userDocRef = doc(db, "users", user.uid);
              await updateDoc(userDocRef, {
                genres: [...(userData.genres || []), genreInput.trim()]
              });
      
              // Update local state to reflect the addition of the new genre
              setGenres(prevGenres => [...prevGenres, genreInput.trim()]);
      
              console.log("Genre added successfully.");
            } else {
              console.log("Genre already exists in user data.");
            }
          } else {
            console.error("Genre does not exist in database.");
          }
      
          setGenreInput(""); // Clear genre input field
        } catch (error) {
          console.error("Error adding genre:", error);
        }
      };

    

      const handleDeleteGenre = async (genreToDelete) => {
        try {
          const updatedGenres = genres.filter(genre => genre !== genreToDelete);
          const userDocRef = doc(db, "users", user.uid);
          await updateDoc(userDocRef, {
            genres: updatedGenres
          });
      
          // Update local state to reflect the deletion of the genre
          setGenres(updatedGenres);
          console.log("Genre, " + genreToDelete + " removed successfully.")
        } catch (error) {
          console.error("Error deleting genre:", error);
        }
      };
    
    return (
        <div className="min-h-screen w-full bg-gray-100 flex justify-center">
            <div className=" w-full p-6 shadow-xl">
                {!user ? navigate('/') : (
                    <>
                        <h1 className="text-2xl font-bold mb-4">Profile</h1>
                        <UploadPFP />
                        <p>Email: {user.email}</p>
                        {userData && (
                            <>
                                <h1 className='text-3xl font-bold m-4'>Your Bio:</h1>
                                <input
                                    className="w-full p-2 mt-2 border rounded"
                                    type="text"
                                    value={newBio} // Use newBio state as the value
                                    onChange={(e) => setNewBio(e.target.value)}
                                />
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2"
                                    onClick={handleSaveChanges}
                                >
                                    Save Changes
                                </button>
                                {showSavedMessage && (
                                    <p className="text-green-500 mt-2">Saved successfully!</p>
                                )}
                                <h1 className='text-3xl font-bold m-4'>Your Genres</h1>
                                {!loadingGenres && genres && (
                                    <div className="flex flex-wrap gap-2 m-4">
                                        {genres.map((genre, index) => (
                                        <div
                                            key={index}
                                            className="relative"
                                            onMouseEnter={() => setHoveredGenre(genre)}
                                            onMouseLeave={() => setHoveredGenre(null)}
                                        >
                                            <div className="bg-blue-500 text-white rounded-full px-4 py-2">
                                            {genre}
                                            </div>
                                            {hoveredGenre === genre && (
                                            <FontAwesomeIcon
                                                icon={faTimesCircle}
                                                className="absolute top-0 right-0 text-red-500 cursor-pointer opacity-75 hover:opacity-100"
                                                onClick={() => handleDeleteGenre(genre)}
                                            />
                                            )}
                                        </div>
                                        ))}
                                    </div>
                                    )}

                                <form onSubmit={handleAddGenre}>
                                    <div className="flex">
                                        <input
                                            className={`w-full p-2 border rounded ${inputFlash ? 'animate-red-flash' : ''}`}
                                            type="text"
                                            placeholder="Enter genre"
                                            value={genreInput}
                                            onChange={(e) => setGenreInput(e.target.value)}
                                        />
                                        <button type="submit">Add Genre</button>
                                    </div>
                                </form>
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