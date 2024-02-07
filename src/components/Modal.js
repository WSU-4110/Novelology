import React, { useState } from 'react';
import {SignIn} from './SignIn';
import {Registration} from './Registration';
import '../styles/modal.css'; // Import the modal CSS file

function Modal() {
    const [showModal, setShowModal] = useState(false);
    const [mode, setMode] = useState('sign-in'); // Initial mode is sign-in

    const toggleModal = () => {
        setShowModal(!showModal);
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
        <div>
            <button onClick={toggleModal}>Open Modal</button>
            {showModal && (
                <div className="modal">
                    <div className="overlay" onClick={toggleModal}></div> {/* Overlay */}
                    <div className="modal-content">
                        <button className="close-modal text-red-400" onClick={toggleModal}>Close</button> {/* Close Modal button */}
                        <div className="mode-switch">
                            {mode !== 'sign-in' && (
                                <button onClick={() => handleModeChange('sign-in')}>Sign In</button>
                            )}
                            {mode !== 'sign-up' && (
                                <button onClick={() => handleModeChange('sign-up')}>Sign Up</button>
                            )}
                        </div>
                        <div className="modal-body">
                            {mode === 'sign-in' ? <SignIn /> : <Registration />}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Modal;
