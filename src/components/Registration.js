import { useRef, useState } from "react";
import { signUpWithEmail, handleSignInWithPopup } from "../functions/Auth";
import "../styles/registration.css";
import { FaGoogle } from 'react-icons/fa';
import { useEffect } from "react";

// Reactive input field component
const ReactiveInputField = ({ type, placeholder, inputRef, onChange }) => {
  return (
    <div className="relative">
      <label className="input-label" htmlFor={placeholder}>
        {placeholder}
        <span className="text-red-500">*</span> {/* Red asterisk */}
      </label>
      <input
        className="mt-1 mb-1 rounded-md p-0.5 outline-none focus:ring focus:ring-blue-300 h-8"
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
  const [passwordRequirements, setPasswordRequirements] = useState({});

  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordConfirmed, setPasswordConfirmed] = useState(false); // New state for confirming password
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef(); // Add ref for confirm password
  const usernameRef = useRef();

  const handleInputChange = (ref) => {
    console.log("handleInputChange - ref:", ref);
    const label = ref.current.previousElementSibling;
    if (label) {
      if (ref.current.value.trim() !== "") {
        label.classList.add("shrink");
      } else {
        label.classList.remove("shrink");
      }
    }
  
    if (ref === passwordRef || ref === confirmPasswordRef) {
      const password = passwordRef.current.value;
      const confirmPassword = confirmPasswordRef.current.value;
      const requirements = {
        minLength: password.length >= 8,
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasSpecialSymbol: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
        hasNumber: /\d/.test(password), // Check if the password contains a number
        match: password === confirmPassword
      };
  
      console.log("handleInputChange - requirements:", requirements);
      setPasswordRequirements(requirements);
  
      // Check if all requirements are fulfilled
      const valid = Object.values(requirements).every(req => req);
      console.log("handleInputChange - valid:", valid);
      setPasswordValid(valid);
      setPasswordConfirmed(requirements.match);
    }
  };
  
  useEffect(() => {
    console.log("useEffect - clearing password requirements");
    // Clear password requirements and toggle styling when component mounts
    setPasswordRequirements({});
    const label = passwordRef.current.previousElementSibling;
    if (label) {
      console.log("useEffect - removing shrink class");
      label.classList.remove("shrink");
    }
  }, []);
  

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
      <h1>Sign Up</h1>
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
          inputRef={emailRef}
          onChange={() => handleInputChange(emailRef)}
        />
        <ReactiveInputField
          type="password"
          placeholder="Password"
          inputRef={passwordRef}
          onChange={() => handleInputChange(passwordRef)}
        />
        {!passwordValid && (passwordRef.current.value !== "" || confirmPasswordRef.current.value !== "") && (
          <>
            {!passwordRequirements.minLength && (
              <p className="text-red-500 text-xs select-none">Password must be at least 8 characters long</p>
            )}
            {!passwordRequirements.hasUpperCase && (
              <p className="text-red-500 text-xs select-none">Password must contain at least one uppercase letter</p>
            )}
            {!passwordRequirements.hasLowerCase && (
              <p className="text-red-500 text-xs select-none">Password must contain at least one lowercase letter</p>
            )}
            {!passwordRequirements.hasSpecialSymbol && (
              <p className="text-red-500 text-xs select-none">Password must contain at least one special symbol</p>
            )}
            {!passwordRequirements.hasNumber && (
              <p className="text-red-500 text-xs select-none">Password must contain at least one number</p>
            )}
            {!passwordRequirements.match && (
              <p className="text-red-500 text-xs select-none">Passwords do not match</p>
            )}
          </>
        )}
        {passwordValid && (
          <p className="text-green-500 text-xs select-none">Great password!</p>
        )}
        <ReactiveInputField
          type="password"
          placeholder="Confirm Password"
          inputRef={confirmPasswordRef}
          onChange={() => handleInputChange(confirmPasswordRef)}
        />
        {!passwordConfirmed && confirmPasswordRef.current && (
          <p className="text-red-500 text-xs select-none">Passwords do not match</p>
        )}
        {passwordValid && passwordConfirmed && confirmPasswordRef.current.value !== "" && (
          <p className="text-green-500 text-xs select-none">Password Confirmed!</p>
        )}

        <ReactiveInputField
          type="text"
          placeholder="Username"
          inputRef={usernameRef}
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
