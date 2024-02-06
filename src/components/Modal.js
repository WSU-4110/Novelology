import React, { useState }from "react";
import "../styles/modal.css";
import {Registration} from './Registration.js';
import {useAuth } from "../functions/Auth.js";
// import Onboarding from '../components/Onboarding';

export default function Modal() {

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    }

    if (modal) {
        document.body.classList.add('active-modal');
    } else {
        document.body.classList.remove('active-modal');
    }

    const closeModal = (event) => {
        if (event.target.classList.contains("overlay")) {
            toggleModal();
        }
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
                    {/* <Onboarding/> */}
                    <button className="close-modal text-red-400"
                    onClick={toggleModal}>Close</button>
                </div>
            </div>
        </div>
        )}
        

        </>
    );
}