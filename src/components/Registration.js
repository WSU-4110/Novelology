// Import the functions and components you need
import { useRef, useState } from "react";
import { signUpWithEmail, handleSignInWithPopup } from "../functions/Auth";
import "../styles/registration.css";
import { FaGoogle } from 'react-icons/fa';


// Reactive input field component
const ReactiveInputField = ({ type, placeholder, inputRef, onChange }) => {
  return (
    <div className="relative">
      <label className="input-label" htmlFor={placeholder}>
        {placeholder}
      </label>
      <input
        className="mt-1 mb-1 rounded-md p-0.5 outline-none focus:ring focus:ring-blue-300"
        ref={inputRef} // Use inputRef instead of ref
        type={type}
        required
        onChange={onChange}
      />
    </div>
  );
};

export function Registration() {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  const handleInputChange = (ref) => {
    const label = ref.current.previousElementSibling;
    if (label) {
      if (ref.current.value.trim() !== "") {
        label.classList.add("shrink");
      } else {
        label.classList.remove("shrink");
      }
    }
  };

  async function handleSignUpWithEmail() {
    setLoading(true);
    try {
      await signUpWithEmail(
        emailRef.current.value,
        passwordRef.current.value,
        usernameRef.current.value
      );
    } catch (error) {
      alert("Error signing up with email " + error.message);
    }
    setLoading(false);
  }

  return (
    <div>
        <button
          className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 mb-4"
          id="register"
          onClick={(event) => handleSignInWithPopup(event)}
        >
          <FaGoogle className="mr-2" /> Continue with Google
        </button>

      <form className="flex flex-col">
        <ReactiveInputField
          type="text"
          placeholder="E-Mail Address"
          inputRef={emailRef} // Use inputRef instead of ref
          onChange={() => handleInputChange(emailRef)}
        />
        <ReactiveInputField
          type="password"
          placeholder="Password"
          inputRef={passwordRef} // Use inputRef instead of ref
          onChange={() => handleInputChange(passwordRef)}
        />
        <ReactiveInputField
          type="text"
          placeholder="Username"
          inputRef={usernameRef} // Use inputRef instead of ref
          onChange={() => handleInputChange(usernameRef)}
        />
        <button
          type="button"
          disabled={loading}
          onClick={handleSignUpWithEmail}
        >
          Sign Up
        </button>
      </form>
      <hr />
    </div>
  );
}
