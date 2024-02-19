import React, { useState } from "react";
import { SignIn } from "./SignIn";
import "../styles/modal.css";
import UserRegistrationPage from "./UserRegistrationPage";

function Modal() {
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("sign-in");

  const toggleModal = () => {
    setShowModal(!showModal);
    document.body.classList.toggle("active-modal");
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  return (
    <div>
      <button onClick={toggleModal}>Register</button>
      {showModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div
              className="modal-overlay absolute inset-0 bg-gray-500 opacity-75"
              onClick={toggleModal}
            ></div>
            <div
              className="modal-content bg-white p-4 rounded-lg"
              style={{
                maxHeight: "90vh",
                overflowY: "auto",
                width: "100%",
                maxWidth: "1900px",
                minWidth: "300px",
              }}
            >
              <button
                className="close-modal text-red-400 absolute top-0 right-0 px-4 py-2"
                onClick={toggleModal}
              >
                Close
              </button>
              <div className="modal-body">
                {mode === "sign-in" ? <SignIn /> : <UserRegistrationPage />}
              </div>
              <div className="mode-switch mb-4">
                {mode === "sign-in" && (
                  <>
                    <p className="text-sm">Don't have an account yet?</p>
                    <button
                      onClick={() => handleModeChange("sign-up")}
                      className="text-blue-400 text-sm ml-2"
                    >
                      Sign Up
                    </button>
                  </>
                )}
                {mode === "sign-up" && (
                  <>
                    <p className="text-sm">Already have an account?</p>
                    <button
                      onClick={() => handleModeChange("sign-in")}
                      className="text-blue-400 text-sm ml-2"
                    >
                      Sign In
                    </button>
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
