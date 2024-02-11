import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth, storage } from "../firebase"; 
import { getDoc, doc, setDoc, collection, getDocs } from "firebase/firestore"; // Import collection and getDocs
import UploadPFP from "./UploadPFP";
import fetchPFP from "../functions/fetchPFP";

const Onboarding = () => {
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState(null); 
  const [pronouns, setPronouns] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genreSuggestions, setGenreSuggestions] = useState([]);
  const [hasCompletedSetup, setHasCompletedSetup] = useState(false);
  const [fetchedProfilePicture, setFetchedProfilePicture] = useState(null); // Add state variable for fetched profile picture

  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data...");
      const userId = auth.currentUser ? auth.currentUser.uid : null;
      if (!userId) return;
  
      try {
        const userRef = doc(db, "users", userId);
        const docSnapshot = await getDoc(userRef);
  
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          console.log("Fetched data:", userData);
          setHasCompletedSetup(userData.hasCompletedSetup || false); // Update hasCompletedSetup based on fetched data
          setBio(userData.bio || ""); // Set bio state variable
          setPronouns(userData.pronouns || ""); // Set pronouns state variable
          setSelectedGenres(userData.selectedGenres || []); // Set selectedGenres state variable
          
          // Fetch existing profile picture URL
          const existingURL = await fetchPFP(userId);
          if (existingURL) {
            setFetchedProfilePicture(existingURL); // Set fetched profile picture URL
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);


  useEffect(() => {
    console.log("Lazy loading genre suggestions...");
    // Lazy load genre suggestions only when component mounts
    const loadGenreSuggestions = async () => {
      const genreCollection = collection(db, "genres");
      const querySnapshot = await getDocs(genreCollection);
      const suggestions = querySnapshot.docs.map((doc) => doc.data().name);
      setGenreSuggestions(suggestions);
      console.log("Genre suggestions loaded:", suggestions);
    };

    loadGenreSuggestions();
  }, []);

  const handleGenreSelect = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenreSuggestions(genreSuggestions.filter((suggestion) => suggestion !== genre));
  };
  
  const handleGenreUnselect = (genre) => {
    setSelectedGenres(selectedGenres.filter((selectedGenre) => selectedGenre !== genre));
    setGenreSuggestions([...genreSuggestions, genre]);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
  
    const userId = auth.currentUser ? auth.currentUser.uid : null;
    if (!userId) return;
  
    // Upload profile picture to Firebase Storage
    if (profilePicture) {
      const uploadTask = storage.ref(`users/${userId}/${profilePicture.name}`).put(profilePicture);
  
      uploadTask.on("state_changed",
        (snapshot) => {
          // Progress function (optional)
        },
        (error) => {
          console.error("Error uploading profile picture: ", error);
        },
        () => {
          // Completion function
          storage.ref(`users/${userId}`).child(profilePicture.name).getDownloadURL().then((url) => {
            // Save profile picture URL to Firestore
            const userRef = doc(db, "users", userId);
            setDoc(userRef, {
              hasCompletedSetup: true,
              bio: bio,
              pronouns: pronouns,
              selectedGenres: selectedGenres,
              profilePicture: url // Save profile picture URL
            }, { merge: true }).then(() => {
              navigate("/");
            }).catch((error) => {
              console.error("Error updating document: ", error);
            });
          });
        }
      );
    } else {
      // If no profile picture is selected, save other data without profile picture
      const userRef = doc(db, "users", userId);
      setDoc(userRef, {
        hasCompletedSetup: true,
        bio: bio,
        pronouns: pronouns,
        selectedGenres: selectedGenres
      }, { merge: true }).then(() => {
        navigate("/");
      }).catch((error) => {
        console.error("Error updating document: ", error);
      });
    }
  };
  

  const handleRestartSetup = async () => {
    const confirmation = window.confirm("Are you sure you want to restart setup? This will clear all data.");
    if (confirmation) {
      const userId = auth.currentUser ? auth.currentUser.uid : null;
      if (!userId) return;
  
      try {
        // Clear user data in Firestore
        const userRef = doc(db, "users", userId);
        await setDoc(userRef, {
          hasCompletedSetup: false,
          bio: "",
          pronouns: "",
          selectedGenres: []
        }, { merge: true });
  
        // Clear local state variables
        setHasCompletedSetup(false);
        setBio("");
        setPronouns("");
        setSelectedGenres([]);
        
        window.location.reload(); // Refresh the page
      } catch (error) {
        console.error("Error restarting setup:", error);
      }
    }
  };
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold mb-4">Onboarding</h1>
      {/* Restart setup button */}
      <form onSubmit={handleSubmitForm} className="flex flex-col">
        <UploadPFP setProfilePicture={setProfilePicture} />
        {fetchedProfilePicture && (
          <img src={fetchedProfilePicture} alt="Profile" className="w-24 h-24 rounded-full my-4" />
        )}
        <textarea
          className="w-full h-24 p-2 border rounded my-4"
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          style={{ resize: "none" }} // Add inline style to disable resizing
        />
        <div className="flex flex-wrap justify-start gap-2 my-4">
          {selectedGenres.map((genre) => (
            <div
              key={genre}
              className="bg-blue-500 text-white rounded-full px-4 py-2 cursor-pointer"
              onClick={() => handleGenreUnselect(genre)} // Add onClick handler for unselecting genre
            >
              {genre}
            </div>
          ))}
        </div>
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
