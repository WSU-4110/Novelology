import React, { useState } from 'react';
import { SignIn } from './SignIn';
import { Registration } from './Registration';
import '../styles/modal.css'; // Import the modal CSS file

function Modal() {
    const [showModal, setShowModal] = useState(false);
    const [mode, setMode] = useState('sign-in'); // Initial mode is sign-in

    const toggleModal = () => {
        // toggle state
        setShowModal(!showModal);

        // handle styling changes
        if (!showModal) {
            document.body.classList.add('active-modal'); // Add 'active-modal' class to body when modal is shown
        } else {
            document.body.classList.remove('active-modal'); // Remove 'active-modal' class from body when modal is closed
        }
    };

    const handleModeChange = (newMode) => {
        setMode(newMode);
    };

    return (
        <>
        
        <button 
        onClick={toggleModal}
        >
            Sign Up!
        </button>

        {modal && (
            <div className="modal">
            <div onClick={closeModal} className="overlay">
                <div className="modal-content">
                    <h2 className="font-bold text-xl pb-4">Join Novelology</h2>
                    <Registration/>
                    <Onboarding/>
                    <button className="close-modal text-red-400"
                    onClick={toggleModal}>Close</button>
                </div>
            </div>
        </div>
        )}
        

        </>
    );
}
