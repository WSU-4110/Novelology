import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth, storage } from "../firebase"; 
import { getDoc, doc, setDoc } from "firebase/firestore"; // Import necessary Firestore functions
import UploadPFP from "./UploadPFP";
import PronounsDropdown from "./PronounsDropdown";
import RolesSelection from "./RolesSelection";
import BioTextArea from "./BioTextArea";
import SelectGenres from "./SelectGenres";
import fetchPFP from "../functions/fetchPFP"; // Import fetchPFP function
import AuthorVerify from "./AuthorVerify.js";

const Onboarding = () => {
  // State variables
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState(null); 
  const [pronouns, setPronouns] = useState("");
  const [fetchedProfilePicture, setFetchedProfilePicture] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [authError, setAuthError] = useState(false);

  // Hooks
  const navigate = useNavigate();

  // Effect to fetch user data
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          console.log("Fetching data...");
          const userId = user.uid;
          const userRef = doc(db, "users", userId);
          const docSnapshot = await getDoc(userRef);
  
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            console.log("Fetched data:", userData);
            setBio(userData.bio || "");
            setPronouns(userData.pronouns || "");
  
            const existingURL = await fetchPFP(userId);
            if (existingURL) {
              setFetchedProfilePicture(existingURL);
            }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        // Handle the case where the user is not signed in
        console.log("User not signed in.");
      }
    });
  
    return () => unsubscribe();
  }, []);
  
  

  // Event handler to submit form
  const handleSubmitForm = async (e) => {
    e.preventDefault();
  
    try {
      const userId = auth.currentUser ? auth.currentUser.uid : null;
      if (!userId) throw new Error("User not authenticated");
  
      const userRef = doc(db, "users", userId);
      const userData = {
        hasCompletedSetup: true,
        bio: bio,
        pronouns: pronouns
      };
  
      if (profilePicture) {
        // Upload profile picture
        const uploadTask = storage.ref(`users/${userId}/${profilePicture.name}`).put(profilePicture);
  
        uploadTask.on("state_changed", null, (error) => {
          console.error("Error uploading profile picture:", error);
        }, () => {
          storage.ref(`users/${userId}`).child(profilePicture.name).getDownloadURL().then((url) => {
            userData.profilePicture = url;
            setDoc(userRef, userData, { merge: true }).then(() => navigate("/")).catch((error) => {
              console.error("Error updating document:", error);
            });
          });
        });
      } else {
        // Save data without profile picture
        await setDoc(userRef, userData, { merge: true });
        navigate("/");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Event handler to restart setup
  const handleRestartSetup = async () => {
    const confirmation = window.confirm("Are you sure you want to restart setup? This will clear all data.");
    if (confirmation) {
      try {
        const userId = auth.currentUser ? auth.currentUser.uid : null;
        if (!userId) throw new Error("User not authenticated");

        const userRef = doc(db, "users", userId);
        await setDoc(userRef, {
          hasCompletedSetup: false,
          bio: "",
          pronouns: "",
          selectedGenres: []
        }, { merge: true });

        setBio("");
        setPronouns("");
        window.location.reload();
      } catch (error) {
        console.error("Error restarting setup:", error);
      }
    }
  };

  return (
    <div className="mt-[-1em] max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl overflow-y-scroll max-h-svh">
      <h1 className="text-2xl font-bold mb-4">Onboarding</h1>

      {authError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> You need to sign in to continue.</span>
        </div>
      )}

      <form onSubmit={handleSubmitForm} className="flex flex-col">
        <UploadPFP setProfilePicture={setProfilePicture} />
        {fetchedProfilePicture && (
          <img src={fetchedProfilePicture} alt="Profile" className="w-24 h-24 rounded-full my-4" />
        )}
        <BioTextArea bio={bio} setBio={setBio} />
        <PronounsDropdown pronouns={pronouns} setPronouns={setPronouns} />
        <RolesSelection selectedRoles={selectedRoles} setSelectedRoles={setSelectedRoles} />
        <p>{selectedRoles}</p>
       
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Select Genres</h2>
          <SelectGenres />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Complete Onboarding
        </button>
      </form>
      <button onClick={handleRestartSetup} className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mb-4">
        Restart Setup
      </button>
    </div>
  );
};

export default Onboarding;
