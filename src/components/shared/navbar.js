import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faPlus, faSignOutAlt, faSignInAlt, faGear, faBell } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import Modal from './Modal';
import { handleLogout } from '../../functions/Auth';
import { Tooltip } from 'react-tooltip';
import { onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { useEffect, useState } from 'react';
import { collection } from 'firebase/firestore';
import ProfilePicture from './ProfilePicture';

export default function Navbar() {
    const [newNotifications, setNewNotifications] = React.useState(false);
    const [user, setUser] = useState(null);
        // Fetch notifications from the database
        // subscribe to the notifications collection of the current user
        // If there are new notifications, setNewNotifications to true
        // if there are no new notifications, setNewNotifications to false

    
        
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []); 

        if (auth.currentUser) {
        const subscribe = onSnapshot(collection(db, 'users', auth.currentUser.uid, 'notifications'), (snapshot) => {
            // if there are notifications where "read" is false, setNewNotifications to true
            snapshot.forEach((doc) => {
                if (doc.data().read === false) {
                    setNewNotifications(true);
                }
            });

            if (snapshot.empty) {
                setNewNotifications(false);
            }

        });
    }
        
    
    return (
        <nav className="flex flex-row gap-4 p-4 bg-[#e3bd96] mt-4 w-full h-20 z-0">
            <Link to="/" data-tip="Home" data-for="home-tooltip">
                <FontAwesomeIcon icon={faHome} className="rounded-full w-8 p-2 h-8 bg-[#F4D7B7] text-[#e3bd96] cursor-pointer" />
            </Link>
            <Link to="/profile" data-tip="Profile" data-for="profile-tooltip">
                <ProfilePicture uid={auth.currentUser?.uid} alt="Profile Picture" />
            </Link>
            <Link to="/create-post" data-tip="Create a Post" data-for="create-post-tooltip">
                <FontAwesomeIcon icon={faPlus} className="rounded-full w-8 h-8 bg-[#F4D7B7] text-[#e3bd96] p-2 cursor-pointer" />
            </Link>
            { !auth.currentUser ? (
                <Modal>
                    <FontAwesomeIcon icon={faSignInAlt} />
                </Modal>
            ) : (
                <>
                    <Link to="/settings" data-tip="Settings" className='rounded-full bg-[#F4D7B7] p-2 cursor-pointer' data-for="settings-tooltip">
                        <FontAwesomeIcon className="w-8 h-8 text-[#e3bd96]" icon={faGear} />
                    </Link>
                    <button data-tip="Sign off" className="rounded-full w-12 h-12 bg-[#F4D7B7] p-1 cursor-pointer" onClick={handleLogout} data-for="sign-off-tooltip">
                        <FontAwesomeIcon className="w-6 h-6 mt-1 text-[#e3bd96]" icon={faSignOutAlt} />
                    </button>

                     { newNotifications === true ? (
                    <Link to="/notifications" data-tip="Notifications" data-for="notifications-tooltip">
                        <FontAwesomeIcon icon={faBell} className="rounded-full w-8 h-8 bg-[#F4D7B7] text-yellow-300 p-2 cursor-pointer" />
                    </Link>
                    ) : (
                        <Link to="/notifications" data-tip="Notifications" data-for="notifications-tooltip">
                            <FontAwesomeIcon icon={faBell} className="rounded-full w-8 h-8 bg-[#F4D7B7] text-[#e3bd96] p-2 cursor-pointer" />
                        </Link>
                    )}
                </>
            )}
            <Tooltip id="home-tooltip" />
            <Tooltip id="profile-tooltip" />
            <Tooltip id="create-post-tooltip" />
            <Tooltip id="sign-off-tooltip" />
        </nav>
    );
}