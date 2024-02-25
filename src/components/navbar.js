import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faPlus, faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import Modal from './Modal';
import { handleLogout } from '../functions/Auth';
import { Tooltip } from 'react-tooltip';

export default function Navbar() {
    const [user] = useAuthState(auth);

    return (
        <nav className="flex flex-col gap-4 p-4 bg-[#e3bd96] fixed left-0 top-0 h-full">
            <Link to="/" data-tip="Home" data-for="home-tooltip">
                <FontAwesomeIcon icon={faHome} className="rounded-full w-8 h-8 bg-[#F4D7B7] cursor-pointer" />
            </Link>
            <Link to="/profile" data-tip="Profile" data-for="profile-tooltip">
                <FontAwesomeIcon icon={faUser} className="rounded-full bg-[#F4D7B7] w-8 h-8 p-2 cursor-pointer" />
            </Link>
            <Link to="/submit" data-tip="Create a Post" data-for="create-post-tooltip">
                <FontAwesomeIcon icon={faPlus} className="rounded-full w-8 h-8 bg-[#F4D7B7] p-2 cursor-pointer" />
            </Link>
            {!user ? (
                <Modal>
                    <FontAwesomeIcon icon={faSignInAlt} />
                </Modal>
            ) : (
                <>
                    <button data-tip="Sign off" className="rounded-full w-8 h-8 bg-[#F4D7B7] p-2 cursor-pointer" onClick={handleLogout} data-for="sign-off-tooltip">
                        <FontAwesomeIcon icon={faSignOutAlt} />
                    </button>
                </>
            )}
            <Tooltip id="home-tooltip" />
            <Tooltip id="profile-tooltip" />
            <Tooltip id="create-post-tooltip" />
            <Tooltip id="sign-off-tooltip" />
        </nav>
    );
}
