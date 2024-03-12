import React from 'react';

// Create a DeleteAccountModal component that takes show, onClose, and onDelete props
// show is a boolean that determines whether the modal is displayed
// onClose is a function that closes the modal
// onDelete is a function that deletes the user's account if they accept the prompt
const DeleteAccountModal = ({ show, onClose, onDelete }) => {
    return (
        <>
        {/* If the show prop is true, display the modal */}
            {show && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Are you sure you want to delete your account?</h2>
                        <p>This action cannot be undone.</p>
                        <div className="modal-buttons">
                            <button onClick={onDelete}>Delete Account</button>
                            <button onClick={onClose}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteAccountModal;
