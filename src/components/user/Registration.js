import logoWithCircleBorder from "../../assets/novelology_newlogo.png"; // Path to novelology logo in assets
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { signUpWithEmail, handleSignUpWithPopup } from "../../functions/Auth";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa"; // Import FaEyeSlash for the hidden eye icon
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";


const ReactiveInputField = ({ type, placeholder, inputRef, onChange }) => (
  <div className="relative">
    <label
      htmlFor={placeholder}
      style={{ color: "white" }} 
    >
      {placeholder}
      <span className="text-red-500"> *</span> {/* Indicates a required field */}
    </label>
    <input
      className="mt-2 rounded-lg p-2.5 outline-none focus:ring focus:ring-blue-300 w-full shadow-lg"
      style={{ boxShadow: "0 0.25rem 0.5rem rgba(0, 0, 0, 0.8)" }} // Converted boxShadow to rem
      ref={inputRef}
      type={type}
      required
      onChange={onChange}
    />
  </div>
);

const ReactivePasswordInputField = ({ placeholder, inputRef, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="relative">
      <label
        htmlFor={placeholder}
        style={{ color: "white" }} 
      >
        {placeholder}
        <span className="text-red-500"> *</span> {/* Indicates a required field */}
      </label>
      <input
        className="mt-2 rounded-lg p-2.5 outline-none focus:ring focus:ring-blue-300 w-full shadow-lg"
        style={{ boxShadow: "0 0.25rem 0.5rem rgba(0, 0, 0, 0.8)" }} // Converted boxShadow to rem
        ref={inputRef}
        type={showPassword ? "text" : "password"}
        required
        onChange={onChange}
      />
      <button
        onClick={togglePasswordVisibility}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 translate-y-1" // Adjusted here
        type="button"
        style={{ outline: 'none' }} // Added to remove outline on focus for better UI
      >
        {showPassword ? (
          <FaEyeSlash className="text-gray-400" />
        ) : (
          <FaEye className="text-gray-400" />
        )}
      </button>
    </div>
  );
};

export function Registration() {
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false); // New state to track form validity
  const navigate = useNavigate();

  // useRef hooks for form inputs
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const usernameRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       navigate("/onboarding");
  //     }
  //   });
  //   return unsubscribe;
  // }, [navigate]);

  const validatePasswords = () => {
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleInputChange = () => {
    validatePasswords();
    // Check if all fields are filled
    const allFieldsFilled = [
      emailRef.current.value,
      passwordRef.current.value,
      confirmPasswordRef.current.value,
      usernameRef.current.value,
      firstNameRef.current.value,
      lastNameRef.current.value
    ].every(field => field !== '');
    setIsFormValid(allFieldsFilled && validatePasswords());
  };

  // This function now also takes firstName, lastName, and username as arguments
const signUpWithEmail = async (email, password, username, firstName, lastName) => {
  // Create user with email and password
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Store additional user details in Firestore
  await setDoc(doc(db, "users", user.uid), {
    username,
    firstName,
    lastName,
    email,
    password,
  });

  return user; // Return the created user
};

  const handleSignUpWithEmail = async (e) => {
    e.preventDefault();
    if (!isFormValid || loading) return;
  
    setLoading(true);
    try {
      // validate username
      if (usernameRef.current.value.trim().length < 3 || usernameRef.current.value.trim().length > 20 || !/^[a-zA-Z0-9_]*$/.test(usernameRef.current.value.trim())) {
        alert("Username must be between 3-20 characters and can only contain letters, numbers, and underscores");
        setLoading(false);
        throw new Error("Invalid username");
      }

      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const username = usernameRef.current.value;
      const firstName = firstNameRef.current.value;
      const lastName = lastNameRef.current.value;
      // Now passing additional details to signUpWithEmail
      await signUpWithEmail(email, password, username, firstName, lastName);
      navigate('/onboarding');
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // This is where preventDefault is correctly used
    handleSignUpWithEmail(event); // Now passing the event to handleSignUpWithEmail
  };

  const handleSignUpWithPopup = async (navigate) => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account' // This will prompt the user to select a Google account in the popup
    });
  
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      // Navigate to the onboarding page after successful sign-in
      navigate('/onboarding'); 
    } catch (error) {
      console.error("Authentication with Google failed:", error.code, error.message);
      alert("Failed to sign in with Google: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-maroon" style={{ paddingTop: "1.25rem", paddingBottom: "1.25rem", fontFamily: 'Montserrat' }}>
      <img src={logoWithCircleBorder} alt="Novelology Logo" style={{ width: "11.5rem", height: "10.75rem", marginBottom: "1.25rem" }} />
      <span style={{ color: "white", fontSize: "4.0625rem", fontWeight: "400", marginBottom: "1.25rem", marginTop: "1.875rem" }}>Sign Up</span>
      <form style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3.75rem", marginBottom: "2.5rem", marginTop: "1.875rem" }}>
        <ReactiveInputField type="text" placeholder="Enter your first name" inputRef={firstNameRef} onChange={handleInputChange} />
        <ReactiveInputField type="text" placeholder="Enter your last name" inputRef={lastNameRef} onChange={handleInputChange} />
        <ReactiveInputField type="email" placeholder="Enter your email address" inputRef={emailRef} onChange={handleInputChange} />
        <ReactiveInputField type="text" placeholder="Choose a username" inputRef={usernameRef} onChange={handleInputChange} />
        <ReactivePasswordInputField placeholder="Create a password" inputRef={passwordRef} onChange={handleInputChange} />
        <ReactivePasswordInputField placeholder="Confirm your password" inputRef={confirmPasswordRef} onChange={handleInputChange} />
      </form>
      
      <button
        onClick={handleSubmit}
        className="bg-maroon text-white w-[31.8125rem] justify-center items-center py-[0.625rem] px-[2.8125rem] rounded-[1.25rem] mb-[1.25rem] mt-[1.875rem] shadow-[0px_4px_8px_rgba(0,0,0,1)] flex font-[Montserrat] text-[1.25rem] font-[400]">
        Create Account
      </button>
      <div className="mb-[1.25rem] mt-[0.625rem]">
        <span className="text-[rgba(255,255,255,0.7)] font-[Montserrat] text-[1rem]">---------- OR ----------</span>
      </div>
      <div className="bg-white w-[18.875rem] flex justify-center items-center gap-[0.625rem] py-[0.625rem] px-[2.8125rem] rounded-[1.25rem] overflow-hidden mt-[0.625rem] shadow-[0px_4px_8px_rgba(0,0,0,0.8)]">
        <button
          onClick={() => handleSignUpWithPopup(navigate)}
          className="bg-none border-none flex items-center text-[rgba(0,0,0,0.8)] font-[Montserrat] text-[1.125rem] font-[400]">
          <FaGoogle className="mr-2" /> Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Registration;