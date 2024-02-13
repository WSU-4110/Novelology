import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDocs, collection } from "firebase/firestore";

function SelectGenres() {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genreSuggestions, setGenreSuggestions] = useState([]);
  const [showSavedMessage, setShowSavedMessage] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Fetch user document
        const userDoc = doc(db, "users", user.uid);
        const userDocSnapshot = await getDoc(userDoc);
        
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setUserData(userData);
          setSelectedGenres(userData.genres || []);
        }
  
        // Fetch genres from the "genres" collection
        const genreCollection = collection(db, "genres");
        const querySnapshot = await getDocs(genreCollection);
        const genres = querySnapshot.docs.map(doc => doc.data().name);
        setGenreSuggestions(genres);
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };
  
    loadUserData();
  }, [user]);
  
  // Other useEffect hooks...

  const handleGenreSelect = (genre) => {
    // Update local state
    setSelectedGenres([...selectedGenres, genre]);
    // Update Firestore document
    updateGenresInFirestore([...selectedGenres, genre]);
  };

  const handleGenreUnselect = (genre) => {
    // Update local state
    setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    // Update Firestore document
    updateGenresInFirestore(selectedGenres.filter((g) => g !== genre));
  };

  const updateGenresInFirestore = async (genres) => {
    try {
      const userDoc = doc(db, "users", user.uid);
      await updateDoc(userDoc, { genres });
    } catch (error) {
      console.error("Error updating genres in Firestore:", error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const userDoc = doc(db, "users", user.uid);
      await updateDoc(userDoc, { genres: selectedGenres });
      // Update local state
      setUserData({ ...userData, genres: selectedGenres });
      setShowSavedMessage(true);
      setTimeout(() => setShowSavedMessage(false), 2000);
    } catch (error) {
      console.error("Error updating genres in Firestore:", error);
    }
  };


  return (
    <>
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
            .filter((suggestion) => !selectedGenres.includes(suggestion)) // Filter out selected genres
            .map((suggestion) => (
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
    </>
  );
}

export default SelectGenres;
