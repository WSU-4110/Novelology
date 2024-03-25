import React from 'react';
import { useNavigate } from 'react-router-dom';

function Modal() {
    const navigate = useNavigate();

    const handleSignInClick = () => {
        navigate('/sign_in'); 
    };

    return (
        <div>
            <button onClick={handleSignInClick}>Sign In</button>
        </div>
    );
}

export default Modal;