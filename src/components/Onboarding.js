import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth, storage } from "../firebase"; 
import { getDoc, doc, setDoc, collection, getDocs } from "firebase/firestore"; // Import collection and getDocs
import UploadPFP from "./UploadPFP";
import fetchPFP from "../functions/fetchPFP";
import PronounsDropdown from "./PronounsDropdown";
import RolesSelection from "./RolesSelection";
import BioTextArea from "./BioTextArea";
const Onboarding = () => {
  // State variables
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState(null); 
  const [pronouns, setPronouns] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genreSuggestions, setGenreSuggestions] = useState([]);
  const [hasCompletedSetup, setHasCompletedSetup] = useState(false);
  const [fetchedProfilePicture, setFetchedProfilePicture] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [authError, setAuthError] = useState(false);
  const [countdown, setCountdown] = useState(5); // Countdown in seconds
 


  // Hooks
  const navigate = useNavigate();

  // Effect to fetch user data

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data...");
      const userId = auth.currentUser ? auth.currentUser.uid : null;
      if (!userId) {
        setAuthError(true);
        const timer = setInterval(() => {
          setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);
        setTimeout(() => {
          clearInterval(timer);
          navigate("/");
        }, countdown * 1000);
        return;
      }

      try {
        const userRef = doc(db, "users", userId);
        const docSnapshot = await getDoc(userRef);

        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          console.log("Fetched data:", userData);
          setBio(userData.bio || "");
          setPronouns(userData.pronouns || "");
          setSelectedGenres(userData.selectedGenres || []);

          const existingURL = await fetchPFP(userId);
          if (existingURL) {
            setFetchedProfilePicture(existingURL);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const loadGenreSuggestions = async () => {
      try {
        const genreCollection = collection(db, "genres");
        const querySnapshot = await getDocs(genreCollection);
        const suggestions = querySnapshot.docs.map((doc) => doc.data().name);
        setGenreSuggestions(suggestions);
      } catch (error) {
        console.error("Error loading genre suggestions:", error);
      }
    };

    loadGenreSuggestions();
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      navigate("/?signup=true");
    }
  }, [countdown]);


  // Event handler to select genre
  const handleGenreSelect = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenreSuggestions(genreSuggestions.filter((suggestion) => suggestion !== genre));
  };

  // Event handler to unselect genre
  const handleGenreUnselect = (genre) => {
    setSelectedGenres(selectedGenres.filter((selectedGenre) => selectedGenre !== genre));
    setGenreSuggestions([...genreSuggestions, genre]);
  };

  // Event handler to submit form
  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const userId = auth.currentUser ? auth.currentUser.uid : null;
      if (!userId) throw new Error("User not authenticated");

      if (profilePicture) {
        // Upload profile picture
        const uploadTask = storage.ref(`users/${userId}/${profilePicture.name}`).put(profilePicture);

        uploadTask.on("state_changed", null, (error) => {
          console.error("Error uploading profile picture:", error);
        }, () => {
          storage.ref(`users/${userId}`).child(profilePicture.name).getDownloadURL().then((url) => {
            const userRef = doc(db, "users", userId);
            setDoc(userRef, {
              hasCompletedSetup: true,
              bio: bio,
              pronouns: pronouns,
              selectedGenres: selectedGenres,
              profilePicture: url
            }, { merge: true }).then(() => navigate("/")).catch((error) => {
              console.error("Error updating document:", error);
            });
          });
        });
      } else {
        // Save data without profile picture
        const userRef = doc(db, "users", userId);
        await setDoc(userRef, {
          hasCompletedSetup: true,
          bio: bio,
          pronouns: pronouns,
          selectedGenres: selectedGenres
        }, { merge: true });
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

        setHasCompletedSetup(false);
        setBio("");
        setPronouns("");
        setSelectedGenres([]);
        window.location.reload();
      } catch (error) {
        console.error("Error restarting setup:", error);
      }
    }
  };


    return (
      <div className="mt-[-1em] max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl overflow-y-scroll max-h-svh">
        <h1 className="text-2xl font-bold mb-4">Onboarding</h1>
       
     {/* handle if user is not signed in */}
     {authError && (
      <div className="absolute inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-10">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-center">You need to sign in to continue. Redirecting in {countdown} seconds...</p>
        </div>
      </div>
    )}
        {/* Restart setup button */}
        <form onSubmit={handleSubmitForm} className="flex flex-col">
          <UploadPFP setProfilePicture={setProfilePicture} />
          {fetchedProfilePicture && (
            <img src={fetchedProfilePicture} alt="Profile" className="w-24 h-24 rounded-full my-4" />
          )}
          <BioTextArea bio={bio} setBio={setBio} />
          <PronounsDropdown pronouns={pronouns} setPronouns={setPronouns} />

          <RolesSelection selectedRoles={selectedRoles} setSelectedRoles={setSelectedRoles} />

        <div className="mb-4">
          <h2 className="text-lg font-semibold">Select Genres</h2>
          <div className="flex flex-wrap justify-start gap-2 mt-2">
            {genreSuggestions
              .filter((suggestion, index, self) => self.indexOf(suggestion) === index) // Filter out duplicates
              .map((suggestion) => (
                // Check if the genre suggestion is not in the selectedGenres array
                !selectedGenres.includes(suggestion) && (
                  <div
                    key={suggestion}
                    className="bg-gray-200 hover:bg-gray-300 rounded-full px-4 py-2 cursor-pointer"
                    onClick={() => handleGenreSelect(suggestion)}
                  >
                    {suggestion}
                  </div>
                )
              ))}
          </div>
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