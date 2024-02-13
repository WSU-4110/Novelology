import { useRef, useState, useEffect } from "react";
import { signUpWithEmail, handleSignUpWithPopup } from "../functions/Auth";
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth'; 
import { doc, getDoc } from 'firebase/firestore'; 
import { auth, db } from '../firebase'; 

// Your compo
// Reactive input field component
const ReactiveInputField = ({ type, placeholder, inputRef, onChange }) => {
  return (
    <div className="relative">
      <label className="input-label" htmlFor={placeholder}>
        {placeholder}
        <span className="text-red-500">*</span> {/* Red asterisk */}
      </label>
      <input
        className="mt-1 mb-1 rounded-md p-0.5 outline-none focus:ring focus:ring-blue-300 h-8 w-full"
        ref={inputRef} // Forward inputRef to the input element's ref prop
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
  const [passwordConfirmed, setPasswordConfirmed] = useState(false);
  
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const usernameRef = useRef();

  const handleInputChange = (e) => {
    const ref = e.target;
    const inputVal = ref.value.trim();
    const label = ref.previousElementSibling;

    if (label) {
      if (inputVal !== "") {
        label.classList.add("shrink");
      } else {
        label.classList.remove("shrink");
      }
    }

    if (ref === passwordRef.current || ref === confirmPasswordRef.current) {
      const password = passwordRef.current.value.trim();
      const confirmPassword = confirmPasswordRef.current.value.trim();
      const requirements = {
        minLength: password.length >= 8,
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasSpecialSymbol: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
        hasNumber: /\d/.test(password),
        match: password === confirmPassword
      };

      setPasswordRequirements(requirements);
      setPasswordValid(Object.values(requirements).every(req => req));
      setPasswordConfirmed(requirements.match);
    }
  };
  
  useEffect(() => {
    setPasswordRequirements({});
    const label = passwordRef.current?.previousElementSibling;
    if (label) {
      label.classList.remove("shrink");
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userRef = doc(db, "users", user.uid);
            const docSnapshot = await getDoc(userRef);

            if (docSnapshot.exists()) {
                // User already exists, log in
                navigate('/setup-account');
            } else {
                // New user, redirect to setup-account page
                navigate('/setup-account');
            }
        }
    });

    return () => unsubscribe();
}, [navigate]);

  async function handleSignUpWithEmail() {
    setLoading(true);
    try {
      await signUpWithEmail(
        emailRef.current.value.trim(),
        passwordRef.current.value.trim(),
        usernameRef.current.value.trim()
      );
    } catch (error) {
      alert("Error signing up with email " + error.message);
    }
    setLoading(false);
  }

  return (
    <div className="min-w-20 p-2">
      <h1>Sign Up</h1>
      <button
        className="flex items-center w-full bg-white border border-gray-300 rounded-[1rem] shadow-md px-6 py-2 text-sm font-medium text-gray-800 mt-4 mb-4"
        id="register"
        onClick={(event) => handleSignUpWithPopup(event, navigate)}
      >
        <FaGoogle className="mr-2" /> Continue with Google
      </button>
      <div className="h-2 w-full flex flex-row mb-2 select-none">
      <div className="w-[45%] h-[.05em] bg-black">
        </div>
        <p className="text-[.75em] relative top-[-.75em] mr-1 ml-1">OR</p>
        <div className="w-[45%] h-[.05em] bg-black">
        </div>
      </div>
      <form className="flex flex-col">
        <ReactiveInputField
          type="text"
          placeholder="E-Mail Address"
          inputRef={emailRef}
          onChange={handleInputChange}
        />
        <ReactiveInputField
          type="password"
          placeholder="Password"
          inputRef={passwordRef}
          onChange={handleInputChange}
        />
        {!passwordValid && (passwordRef.current && confirmPasswordRef.current) && (
          <>
            {/* Display password requirements */}
          </>
        )}
        {passwordValid && (
          <p className="text-green-500 text-xs select-none">Great password!</p>
        )}
        <ReactiveInputField
          type="password"
          placeholder="Confirm Password"
          inputRef={confirmPasswordRef}
          onChange={handleInputChange}
        />
        {!passwordValid && (passwordRef.current?.value !== "" || confirmPasswordRef.current?.value !== "") && (
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
  
          <ReactiveInputField
            type="text"
            placeholder="Username"
            inputRef={usernameRef}
            onChange={handleInputChange}
          />
          <button
            type="button"
            disabled={loading}
            onClick={handleSignUpWithEmail}
            className="shadow w-1/2 flex justify-center pt-1 pb-1 mt-2"
          >
            Sign Up
          </button>
        </form>
      </div>
    );
  }
  
