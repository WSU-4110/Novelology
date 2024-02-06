
import { useAuthState } from 'react-firebase-hooks/auth';
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import {auth} from '../firebase.js'
import Modal from '../components/Modal.js';
import React, { useState, useEffect, useRef } from 'react';
import Searchbar from '../components/Searchbar';
import { searchUsers } from '../functions/userSearch';
import { Link, useLocation } from "react-router-dom";


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
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };

    const handleSearch = async (query) => {
        const results = await searchUsers(query);
        setSearchResults(results);
        setShowDropdown(true); // Always show dropdown after search, even if there are no results
   
    };

    return (
        <main>
          {!user ? (
              <>
                <Modal />
              </>
            ) : (
              <>
                <h1 className='text-3xl font-bold underline'>Hello World!</h1>
                <button className='logout-button' onClick={logout}>signoff</button>
              </>
            )}
            <div className="mt-8">
                <h1 className="mb-4">Search Users</h1>
                <Searchbar onSearch={handleSearch} />
                {showDropdown && (
                    <ul className="dropdown bg-white border rounded shadow-lg w-64 absolute top-0 right-0 mt-12" ref={dropdownRef}>
                        {searchResults.length ? (
                            searchResults.map((user) => (
                                <li key={user.id} className="p-2 hover:bg-gray-100">
                                    <strong>Name:</strong> {user.username} | <strong>Email:</strong> {user.email}
                                    <Link to={`/users/${user.username}`} className="ml-2 text-blue-500">View Profile</Link>
                                </li>
                            ))
                        ) : (
                            <li className="p-2">No users found</li>
                        )}
                    </ul>
                )}
            </div>
      </main>
    )
       
}
