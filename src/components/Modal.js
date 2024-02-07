import React, { useState } from 'react';
import { SignIn } from './SignIn';
import { Registration } from './Registration';
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
                <div className="fixed z-50 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="modal-overlay absolute inset-0 bg-gray-500 opacity-75" onClick={toggleModal}></div>
                        <div className="modal-content bg-white p-4 rounded-lg w-full max-w-md">
                            <button className="close-modal text-red-400 absolute top-0 right-0 px-4 py-2" onClick={toggleModal}>Close</button> {/* Close Modal button */}
                            <div className="mode-switch mb-4">
                                {mode !== 'sign-in' && (
                                    <button onClick={() => handleModeChange('sign-in')} className="mr-2">Sign In</button>
                                )}
                                {mode !== 'sign-up' && (
                                    <button onClick={() => handleModeChange('sign-up')} className="mr-2">Sign Up</button>
                                )}
                            </div>
                            <div className="modal-body">
                                {mode === 'sign-in' ? <SignIn /> : <Registration />}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Modal;
