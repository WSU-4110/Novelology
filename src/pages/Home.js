
import { useAuthState } from 'react-firebase-hooks/auth';
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import {db,auth,storage} from '../firebase.js'
import Modal from '../components/Modal.js';
import React, { useState } from 'react';
import Searchbar from '../components/Searchbar';
import { searchUsers } from '../functions/userSearch';


export default function Home(){
    const [user] = useAuthState(auth);
    const login = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider);
    };
    const logout = () => {
      signOut(auth);
    };

    const [searchResults, setSearchResults] = useState([]);
    const [searchStatus, setSearchStatus] = useState('');
  
    const handleSearch = async (query) => {
      const results = await searchUsers(query);
      setSearchResults(results);
  
      if (results.length > 0) {
        setSearchStatus(`Found ${results.length} user(s) matching "${query}"`);
      } else {
        setSearchStatus('No users found');
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
            <ul>
              {searchResults.map((user) => (
                <li key={user.id}>{user.displayName}</li>
              ))}
            </ul>
          </div>
      </main>
    )
       
}
