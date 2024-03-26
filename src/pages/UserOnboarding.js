import React, { useState, useEffect } from "react";
import NavigationBar from "../components/NavigationBar.js";
import { useNavigate } from "react-router-dom";
import { db, auth, storage } from "../firebase.js";
import { getDoc, doc, setDoc } from "firebase/firestore"; // Import necessary Firestore functions
import UploadPFP from "../components/shared/UploadPFP.js";
import PronounsDropdown from "../components/user/PronounsDropdown.js";
import RolesSelection from "../components/user/RolesSelection.js";
import BioTextArea from "../components/BioTextArea.js";
import fetchPFP from "../functions/fetchPFP.js"; // Import fetchPFP function

import Footer from "../components/Footer.js";
import SelectGenres from "../components/user/SelectGenres.js";
function UserOnboarding({ showNavBar }) {
  const [bio, setBio] = useState("");
  const [fetchedProfilePicture, setFetchedProfilePicture] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [pronouns, setPronouns] = useState("");
  const [authError, setAuthError] = useState(false);

  document.addEventListener("DOMContentLoaded", function () {
    const navigateButton = document.getElementById("dropdown-button");

    navigateButton.addEventListener("click", function () {
      // Scroll to the target div
      document
        .getElementById("dropdown")
        .scrollIntoView({ behavior: "smooth" });
    });
  });

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
            setSelectedRoles(userData.selectedRoles || []); // Fetch selected roles

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
        pronouns: pronouns,
      };

      if (profilePicture) {
        // Upload profile picture
        const uploadTask = storage
          .ref(`users/${userId}/${profilePicture.name}`)
          .put(profilePicture);

        uploadTask.on(
          "state_changed",
          null,
          (error) => {
            console.error("Error uploading profile picture:", error);
          },
          () => {
            storage
              .ref(`users/${userId}`)
              .child(profilePicture.name)
              .getDownloadURL()
              .then((url) => {
                userData.profilePicture = url;
                setDoc(userRef, userData, { merge: true })
                  .then(() => navigate("/"))
                  .catch((error) => {
                    console.error("Error updating document:", error);
                  });
              });
          }
        );
      } else {
        // Save data without profile picture
        await setDoc(userRef, userData, { merge: true });

        console.log("roles: " + selectedRoles);
        if (selectedRoles.includes("Author")) {
          navigate("/author-verification");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Event handler to restart setup
  const handleRestartSetup = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to restart setup? This will clear all data."
    );
    if (confirmation) {
      try {
        const userId = auth.currentUser ? auth.currentUser.uid : null;
        if (!userId) throw new Error("User not authenticated");

        const userRef = doc(db, "users", userId);
        await setDoc(
          userRef,
          {
            hasCompletedSetup: false,
            bio: "",
            pronouns: "",
            selectedGenres: [],
          },
          { merge: true }
        );

        setBio("");
        setPronouns("");
        
        window.location.reload();
      } catch (error) {
        console.error("Error restarting setup:", error);
      }
    }
  };

  return (
    <>
      {showNavBar && <NavigationBar />}

      <div className="flex flex-col bg-white">
        {/* <div className="flex flex-col justify-center items-start px-16 py-2.5 w-full text-3xl text-white bg-maroon max-md:px-5 max-md:max-w-full">
          <div className="flex gap-5 justify-between ml-32 max-w-full w-[648px] max-md:flex-wrap">
            <div className="flex justify-center items-center">
              User Onboarding
            </div>
          </div>
        </div> */}
        <div className="bg-lightcolor">
          <div>
            <form onSubmit={handleSubmitForm} className="flex flex-col items-center px-5 pt-16 w-full max-md:max-w-full">
            <div className="self-center">
              <UploadPFP setProfilePicture={setProfilePicture} />
              {fetchedProfilePicture && (
                <img
                  src={fetchedProfilePicture}
                  alt="Profile"
                  className="w-24 h-24 rounded-full my-4"
                />
              )}
            </div>

            <div className="items-center rounded-lg shadow-2xl px-16 pt-2.5 pb-8 mt-24 max-w-full text-xl text-center text-black whitespace-nowrap shadow-sm bg-maroon bg-opacity-50 w-[738px] max-md:px-5 max-md:mt-10">
              Bio
              <label
                for="bio"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              ></label>
              <BioTextArea bio={bio} setBio={setBio} />
            </div>

            <div className="flex flex-col rounded-lg shadow-2xl px-16 pt-4 pb-10 mt-28 max-w-full text-center text-black whitespace-nowrap shadow-sm bg-maroon bg-opacity-50 w-[456px] max-md:px-5 max-md:mt-10">
              <div className="text-xl">Are you a reader or author?</div>
              <div className="flex gap-5 justify-between mt-6 text-lg">
                <RolesSelection
                  selectedRoles={selectedRoles}
                  setSelectedRoles={setSelectedRoles}
                />
              </div>
            </div>

            <div className="flex flex-row justify-center rounded-lg shadow-2xl items-center px-12 py-7 mt-14 w-[200px] text-xl text-center text-black whitespace-nowrap bg-maroon bg-opacity-50 w-[474px] max-md:px-5 max-md:mt-10">
              <div className="w-1/2">Your Pronouns</div>
              <PronounsDropdown pronouns={pronouns} setPronouns={setPronouns} />
            </div>
            <div className="mt-12 text-xl text-black whitespace-nowrap max-md:mt-10">
              Tell us some of your interests:
            </div>
            <SelectGenres />

            <div className="flex gap-5 justify-between mt-10 mb-5 max-w-full text-xl text-center text-black whitespace-nowrap w-[500px] max-md:flex-wrap max-md:mt-10">
              <button
                className="flex-1 justify-center hover:bg-maroon hover:bg-opacity-40 active:bg-maroon active:bg-opacity-60 focus:outline-none focus:ring focus:ring-maroon px-16 py-4 rounded-xl border-black border-solid shadow-sm bg-maroon bg-opacity-80 border-[3px] max-md:pr-6 max-md:pl-6"
              >
                SUBMIT
              </button>
            </div>
            </form>
          </div>

          <div className="flex flex-col justify-center items-center mb-7 w-full">

          <button
            onClick={handleRestartSetup}
            className="w-96 text-lg  hover:bg-maroon hover:bg-opacity-40 active:bg-maroon active:bg-opacity-60 focus:outline-none focus:ring focus:ring-maroon px-16 py-4 rounded-xl border-black border-solid shadow-sm bg-maroon bg-opacity-80 border-[3px] max-md:pr-6 max-md:pl-6"
            >
            RESET
          </button>
        </div>

        </div>
        
      </div>
      <Footer />
    </>
  );
}

export default UserOnboarding;
