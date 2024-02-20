import React, { useState } from 'react';
import { SignIn } from './SignIn';
import { Registration } from './Registration';
import '../styles/modal.css';

function Modal() {
    // State variables for modal visibility and mode (sign-in or sign-up)
    const [showModal, setShowModal] = useState(false);
    const [mode, setMode] = useState('sign-in');

    // Function to toggle modal visibility
    const toggleModal = () => {
        setShowModal(!showModal);
        document.body.classList.toggle('active-modal');
    };

    const handleModeChange = (newMode) => {
        setMode(newMode);
    };

    return (
        <div>
            <button onClick={toggleModal}>Sign In</button> 
            {showModal && (
                <div className="fixed z-50 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">

                        {/*Modal overlay, the dark background*/}
                        <div className="modal-overlay absolute inset-0 bg-gray-500 opacity-75" onClick={toggleModal}></div>
                        
                        {/*Modal content container*/}
                        <div className="modal-content bg-white p-4 rounded-lg max-w-md" style={{ height: '700px' }}>
                            
                            {/*Close button*/}
                            <button className="close-modal text-red-400 absolute top-0 right-0 px-4 py-2" onClick={toggleModal}>Close</button>
                            
                            {/*Modal content*/}
                            <div className="modal-body">
                                {mode === 'sign-in' ? (
                                    <SignIn />
                                ) : (
                                    <Registration />
                                )}
                            </div>

                            {/*Login to Register switch*/}
                            <div className="mode-switch mb-4">
                                {mode === 'sign-in' && (
                                    <>
                                        <p className="text-sm">Don't have an account yet?</p>
                                        <button onClick={() => handleModeChange('sign-up')} className="text-blue-400 text-sm ml-2">Sign Up</button>
                                    </>
                                )}
                                {mode === 'sign-up' && (
                                    <>
                                        <p className="text-sm">Already have an account?</p>
                                        <button onClick={() => handleModeChange('sign-in')} className="text-blue-400 text-sm ml-2">Sign In</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Modal;
