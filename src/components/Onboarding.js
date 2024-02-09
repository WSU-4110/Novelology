import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { getDoc, setDoc, doc } from "firebase/firestore";
import UploadPFP from "./UploadPFP";

const Onboarding = () => {
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [hasCompletedSetup, setHasCompletedSetup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = auth.currentUser ? auth.currentUser.uid : null; // Check if currentUser exists
    if (!userId) return; // Return early if currentUser is null

    const userRef = doc(db, "users", userId);

    getDoc(userRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        setHasCompletedSetup(userData.hasCompletedSetup);
      }
    });
  }, []);

  const handleProfilePictureChange = (e) => {
    // Handle profile picture upload
  };

  const handleRoleSelect = (e) => {
    // Handle role selection
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any necessary actions with the collected data

    const userId = auth.currentUser ? auth.currentUser.uid : null; // Check if currentUser exists
    if (!userId) return; // Return early if currentUser is null

    const userRef = doc(db, "users", userId);

    setDoc(userRef, { 
        hasCompletedSetup: true,
        bio : bioRef,
        roles : rolesRef
    }, { merge: true })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  return (
    <div>
      <h1>Onboarding</h1>
      <form onSubmit={handleSubmit}>
        <UploadPFP/>
        <button type="submit">Complete Onboarding</button>
      </form>
    </div>
  );
};

export default Onboarding;
