import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { deleteUser } from "firebase/auth";
import { auth, db, provider } from '../firebase.js'; // Consolidated Firebase imports
import { useNavigate } from "react-router-dom";
import UploadPFP from '../components/UploadPFP.js';
import DeleteAccountModal from '../components/DeleteAccountModal.js';
import { doc, getDoc, updateDoc, deleteDoc} from 'firebase/firestore';
import { handleDeleteAccount } from '../functions/Auth.js';


import "../styles/settings.css";

export default function Settings() {
    const [user] = useAuthState(auth);
    const [userData, setUserData] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [newBio, setNewBio] = useState('');
    const [showSavedMessage, setShowSavedMessage] = useState(false); 
    const navigate = useNavigate();
    const [genreInput, setGenreInput] = useState(""); 
    const [genres, setGenres] = useState(null);
    const [pronouns, setPronouns] = useState('');
    const [selectedRoles, setSelectedRoles] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDoc = doc(db, 'users', user.uid);
                const docSnapshot = await getDoc(userDoc);
                if (docSnapshot.exists()) {
                    const userDataFromSnapshot = docSnapshot.data();
                    setUserData(userDataFromSnapshot);
                    localStorage.setItem('userData', JSON.stringify(userDataFromSnapshot));

                    if (userDataFromSnapshot.selectedGenres) {
                        setGenres(userDataFromSnapshot.selectedGenres);
                        localStorage.setItem('genres', JSON.stringify(userDataFromSnapshot.selectedGenres));
                    } else {
                        console.error('Genres data not found in userData.');
                    }

                    if (!newBio) {
                        setNewBio(userDataFromSnapshot.bio || '');
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
    
      const handleSaveChanges = async () => {
        try {
          const userDoc = doc(db, 'users', user.uid);
          await updateDoc(userDoc, {
            bio: newBio,
            pronouns: pronouns,
            roles: selectedRoles // Save selected roles to the database
          });
          setUserData({ ...userData, bio: newBio, pronouns: pronouns, roles: selectedRoles });
          setShowSavedMessage(true);
          setTimeout(() => setShowSavedMessage(false), 2000);
        } catch (error) {
          console.error('Error updating bio:', error);
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
                                    value={newBio}
                                    onChange={(e) => setNewBio(e.target.value)}
                                />
                                <select
                                    className="w-full p-2 mt-2 border rounded"
                                    value={pronouns || ''}
                                    onChange={(e) => setPronouns(e.target.value)}
                                >
                                    <option value="">Pronouns</option>
                                    <option value="he/him">He/Him</option>
                                    <option value="she/her">She/Her</option>
                                    <option value="they/them">They/Them</option>
                                </select>

                                <div className="mt-2">
                                    <label className="block">
                                        <input
                                            type="checkbox"
                                            value="Reader"
                                            checked={selectedRoles.includes("Reader")}
                                            onChange={() => handleRoleChange("Reader")}
                                        />
                                        Reader
                                    </label>
                                    <label className="block">
                                        <input
                                            type="checkbox"
                                            value="Reviewer"
                                            checked={selectedRoles.includes("Reviewer")}
                                            onChange={() => handleRoleChange("Reviewer")}
                                        />
                                        Reviewer
                                    </label>
                                    <label className="block">
                                        <input
                                            type="checkbox"
                                            value="Author"
                                            checked={selectedRoles.includes("Author")}
                                            onChange={() => handleRoleChange("Author")}
                                        />
                                        Author
                                    </label>
                                </div>

                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2"
                                    onClick={handleSaveChanges}
                                >
                                    Save Changes
                                </button>
                                {showSavedMessage && (
                                    <p className="text-green-500 mt-2">Saved successfully!</p>
                                )}
                                {/* Rest of the code */}
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
                            onDelete={() => handleDeleteAccount(navigate)} // Pass a function reference
                        />
                    </>
                )}
            </div>
        </div>
    );
}

