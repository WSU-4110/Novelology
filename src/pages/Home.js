import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from '../firebase.js';
import Modal from '../components/Modal.js';
import Searchbar from '../components/Searchbar';
import UploadPFP from '../components/UploadPFP.js';

export default function Home() {
    const [user, loading, error] = useAuthState(auth);

    const login = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(() => {
                window.location.reload();
            });
    };



    const handleSearch = async (query) => {
        // Handle search logic here
        console.log(query);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <main>
            {!user ? (
                <Modal />
            ) : (
                <>
                    {user.displayName && (
                        <h1 className='text-3xl font-bold underline'>Welcome back, {user.displayName}!</h1>
                    )}
                    
                </>
            )}
            <div className="mt-8">
                <h1 className="mb-4">Search Users</h1>
                <Searchbar onSearch={handleSearch} />
            </div>
        </main>
    )
}
