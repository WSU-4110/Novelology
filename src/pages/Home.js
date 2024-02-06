
import { useAuthState } from 'react-firebase-hooks/auth';
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import {db,auth,storage} from '../firebase.js'
import Modal from '../components/Modal.js';
import React, { useState } from 'react';
import Searchbar from '../components/Searchbar';
import { searchUsers } from '../functions/userSearch';
import {Link, useLocation} from "react-router-dom";


export default function Home(){
    const [user] = useAuthState(auth);
    const location = useLocation();
    const login = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
      .then(() => {
        window.location = location.pathname + location.search;
      });
    };
    const logout = () => {
      signOut(auth);
    };

    const [searchResults, setSearchResults] = useState([]);
    const [searchStatus, setSearchStatus] = useState('');
    const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown visibility
  
    const handleSearch = async (query) => {
      const results = await searchUsers(query);
      setSearchResults(results);
  
      if (results.length > 0) {
        setSearchStatus(`Found ${results.length} user(s) matching "${query}"`);
        setShowDropdown(true); // Show dropdown if there are search results
      } else {
        setSearchStatus('No users found');
        setShowDropdown(false); // Hide dropdown if no search results
      }
    };


    return (
        <main>
          {!user ? (
              <>
                <Modal />
                <button className='login-button' onClick={login}>google</button>
              </>
            ) : (
              <>
                <h1 className='text-3xl font-bold underline'>Hello World!</h1>
                <button className='logout-button' onClick={logout}>signoff</button>
              </>
            )}
          <div>
            <h1>Search Users</h1>
            <Searchbar onSearch={handleSearch} />
            <p>{searchStatus}</p>
            {showDropdown && ( // Render dropdown only if showDropdown is true
              <ul className="dropdown">
                {searchResults.map((user) => (
                  <li key={user.id}>
                    <strong>Name:</strong> {user.name} | <strong>Email:</strong> {user.email}
                    {/* Create a Link to the user's page */}
                    <Link to={`/users/${user.name}`}>View Profile</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
      </main>
    )
       
}
