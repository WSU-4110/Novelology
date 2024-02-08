import React from 'react';

const DeleteAccountModal = ({ show, onClose, onDelete }) => {
    return (
        <>
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
