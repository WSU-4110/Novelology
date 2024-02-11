import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth, storage } from "../firebase"; 
import { getDoc, doc, setDoc } from "firebase/firestore";
import UploadPFP from "./UploadPFP";

const Onboarding = () => {
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState(null); 
  const [pronouns, setPronouns] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genreSuggestions, setGenreSuggestions] = useState([]);
  const [hasCompletedSetup, setHasCompletedSetup] = useState(false);
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
          setHasCompletedSetup(userData.hasCompletedSetup);

          if (userData.hasCompletedSetup) {
            setBio(userData.bio || "");
            setPronouns(userData.pronouns || "");
            setSelectedGenres(userData.selectedGenres || []);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleRestartSetup = () => {
    const confirmation = window.confirm("Are you sure you want to restart setup? This will clear all data.");
    if (confirmation) {
      setHasCompletedSetup(false);
      setBio("");
      setPronouns("");
      setSelectedGenres([]);
      window.location.reload(); // Refresh the page
    }
  };
  
  useEffect(() => {
    generateGenreSuggestions(); // Call the function to generate genre suggestions when component mounts
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const generateGenreSuggestions = () => {
    // Example: Generate suggestions based on selected genres
    const suggestions = ["Mystery", "Suspense", "Crime", "Action", "Adventure"]; 
    setGenreSuggestions(suggestions);
  };

  const handleGenreSelect = (genre) => {
    // Remove the selected genre from the genreSuggestions array
    const updatedSuggestions = genreSuggestions.filter((suggestion) => suggestion !== genre);
    setGenreSuggestions(updatedSuggestions);
  
    // Add the selected genre to the selectedGenres array
    setSelectedGenres([...selectedGenres, genre]);
  };

  const handleGenreUnselect = (genre) => {
    // Remove the unselected genre from the selectedGenres array
    const updatedSelectedGenres = selectedGenres.filter((selectedGenre) => selectedGenre !== genre);
    setSelectedGenres(updatedSelectedGenres);
  
    // Add the unselected genre back to the genreSuggestions array
    setGenreSuggestions([...genreSuggestions, genre]);
  };

  const handleSubmit = (e) => {
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

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold mb-4">Onboarding</h1>
      {/* Restart setup button */}
      <button onClick={handleRestartSetup} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mb-4">
        Restart Setup
      </button>
      <form onSubmit={handleSubmit}>
        <UploadPFP setProfilePicture={setProfilePicture} />
        <textarea
          className="w-full h-24 p-2 border rounded my-4"
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
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
            {genreSuggestions.map((suggestion) => (
              <div
                key={suggestion}
                className="bg-gray-200 hover:bg-gray-300 rounded-full px-4 py-2 cursor-pointer"
                onClick={() => handleGenreSelect(suggestion)}
              >
                {suggestion}
              </div>
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
    </div>
  );
};

export default Onboarding;
