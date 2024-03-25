import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../firebase.js';
import Searchbar from '../components/shared/Searchbar.js';
import { handleSearch } from '../functions/searchFunctions'; // Import handleSearch function
import Feed from './Feed.js';
import PopularUsers from '../components/shared/PopularUsers.js';
import SampleHome from './sampleHome.js';

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
            <div>
                {/*<div>
                    <Searchbar onSearch={(query) => handleSearch(query, setSearchResults, setSearchStatus)} />
                </div>*/}
            </div>
            {!user ? (
                <div> logged out</div>
                
            ) : (
                <>
                    <div className='flex flex-row justify-start ml-24'>
                        <div className='flex-1'>
                            <Feed currentUser={user} />
                        </div>
                        <div className='flex-none w-1/4'>
                            <PopularUsers criteria='followers' />
                        </div>
                    </div>

                </>
            )}
        </main>
    )
}
