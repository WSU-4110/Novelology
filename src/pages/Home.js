import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../firebase.js';
import Modal from '../components/Modal.js';
import Searchbar from '../components/Searchbar';
import UploadPFP from '../components/UploadPFP.js';
import { handleSearch } from '../functions/searchFunctions'; // Import handleSearch function
import Feed from './Feed.js';

import BookSearch from '../components/BookSearch.js';
export default function Home() {
    const [user, loading, error] = useAuthState(auth);
    const [searchResults, setSearchResults] = useState([]);
    const [searchStatus, setSearchStatus] = useState('');

    const login = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(() => {
                window.location.reload();
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.error('Auth state error:', error); // Log auth state error
        return <div>Error: {error.message}</div>;
    }

    return (
        <main>
            {!user ? (
                <div> logged out</div>
            ) : (
                <>
                    {user.displayName && (
                        <h1 className='text-3xl font-bold underline'>Welcome back, {user.displayName}!</h1>
                    )}
                    <Feed/>
                </>
            )}
            <div className="mt-8">
                <h1 className="mb-4">Search Users</h1>
                <Searchbar onSearch={(query) => handleSearch(query, setSearchResults, setSearchStatus)} />
            </div>
            <div className='bookSearch'>
                <BookSearch/>
            </div>
        </main>
    )
}
