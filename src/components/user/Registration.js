import logoWithCircleBorder from "../../assets/logo_with_circle_border-removebg.png"; // Path to novelology logo in assets
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { signUpWithEmail, handleSignUpWithPopup } from "../../functions/Auth";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa"; // Import FaEyeSlash for the hidden eye icon

const ReactiveInputField = ({ type, placeholder, inputRef, onChange }) => (
  <div className="relative">
    <label
      className="input-label"
      htmlFor={placeholder}
      style={{ color: "#ffffff" }} // Set label color to white
    >
      {placeholder}
      <span className="text-red-500"> *</span> {/* Indicates a required field */}
    </label>
    <input
      className="mt-2 rounded-lg p-2.5 outline-none focus:ring focus:ring-blue-300 w-full shadow-lg"
      style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.8)" }} // Inline style for boxShadow
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
        className="input-label"
        htmlFor={placeholder}
        style={{ color: "#ffffff" }} // Set label color to white
      >
        {placeholder}
        <span className="text-red-500"> *</span>{" "}
        {/* Indicates a required field */}
      </label>
      <input
        className="mt-2 rounded-lg p-2.5 outline-none focus:ring focus:ring-blue-300 w-full shadow-lg"
        style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.8)" }} // Inline style for boxShadow
        ref={inputRef}
        type={showPassword ? "text" : "password"}
        required
        onChange={onChange}
      />
      <button
        onClick={togglePasswordVisibility}
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
        type="button"
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
  // Adding state hooks for user input validation and feedback
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  // useRef hooks for form inputs
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const usernameRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/user-onboarding"); // Updated path
      }
    });
    return unsubscribe;
  }, [navigate]);

  
  // Function to validate password and confirm password fields
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

  // Handler for input change to validate passwords in real-time
  const handleInputChange = () => {
    validatePasswords();
  };

  // Function to handle sign-up with email and password
  const handleSignUpWithEmail = async () => {
    if (!validatePasswords()) return;
  
    setLoading(true);
    try {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const username = usernameRef.current.value;
      await signUpWithEmail(email, password, username);
      navigate("/user-onboarding"); // Updated path
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    handleSignUpWithEmail();
  };

  // Styles
  const styles = {
    mainContainer: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      width: "100%",
      minHeight: "100vh",
      overflow: "auto",
      flexDirection: "column",
      backgroundColor: "rgba(91, 46, 72, 1)",
      paddingTop: "20px",
      paddingBottom: "20px",
    },
    logo: {
      width: "184px",
      height: "172px",
      marginBottom: "20px",
    },
    signUpTitle: {
      color: "rgba(255, 255, 255, 1)",
      fontFamily: "Montserrat",
      fontSize: "65px",
      fontWeight: "400",
      marginBottom: "20px",
      marginTop: "30px",
    },
    gridContainer: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "60px",
      marginBottom: "40px",
      marginTop: "30px",
    },
    label: {
      color: "rgba(255, 255, 255, 0.9)",
      fontFamily: "Montserrat",
      paddingLeft: "10px",
    },
    input: {
      padding: "10px",
      borderRadius: "20px",
      marginTop: "5px",
      width: "100%",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.8)", // Added shadow
    },
    createAccountButton: {
      backgroundColor: "rgba(91, 46, 72, 1)",
      width: "509px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "10px 45px",
      borderRadius: "20px",
      marginBottom: "20px",
      marginTop: "30px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 1)", // Added shadow
    },

    signUpWithGoogleButtonText: {
      color: "rgba(0, 0, 0, 0.8)",
      fontFamily: "Montserrat",
      fontSize: "18px", // Slightly smaller font size for differentiation
      fontWeight: "400",
      textAlign: "center", // Center the text within the button
    },

    buttonText: {
      color: "white",
      fontFamily: "Montserrat",
      fontSize: "20px",
      fontWeight: "400",
    },
    orTextContainer: {
      marginBottom: "20px",
      marginTop: "10px",
    },
    orText: {
      color: "rgba(255, 255, 255, 0.7)",
      fontFamily: "Montserrat",
      fontSize: "16px",
    },
    googleButton: {
      backgroundColor: "#ffffff",
      width: "302px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
      padding: "10px 45px",
      borderRadius: "20px",
      overflow: "hidden",
      marginTop: "10px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.8)", // Added shadow
    },
  };

  // JSX Structure with styles applied
  return (
    <div style={styles.mainContainer}>
    <img
      src={logoWithCircleBorder}
      alt="Novelology Logo"
      style={styles.logo}
    />

    <span style={styles.signUpTitle}>Sign Up</span>

    <div style={styles.gridContainer}>
      <ReactiveInputField
        key="firstName"
        type="text"
        placeholder="Enter your first name"
        inputRef={firstNameRef}
        onChange={(e) => handleInputChange(e, "firstName")}
      />
      <ReactiveInputField
        key="lastName"
        type="text"
        placeholder="Enter your last name"
        inputRef={lastNameRef}
        onChange={(e) => handleInputChange(e, "lastName")}
      />
      <ReactiveInputField
        key="email"
        type="email"
        placeholder="Enter your email address"
        inputRef={emailRef}
        onChange={(e) => handleInputChange(e, "email")}
      />
      <ReactiveInputField
        key="username"
        type="text"
        placeholder="Choose a username"
        inputRef={usernameRef}
        onChange={(e) => handleInputChange(e, "username")}
      />
      <ReactivePasswordInputField
        placeholder="Create a password"
        inputRef={passwordRef}
        onChange={(e) => handleInputChange(e, "password")}
      />
      <ReactivePasswordInputField
        placeholder="Confirm your password"
        inputRef={confirmPasswordRef}
        onChange={(e) => handleInputChange(e, "confirmPassword")}
      />
    </div>

      <div style={styles.createAccountButton}>
        <button style={styles.buttonText} onClick={(event) => handleSubmit(event, navigate)}
>Create Account</button>
      </div>

      <div style={styles.orTextContainer}>
        <span style={styles.orText}>---------- OR ----------</span>
      </div>

      <div style={styles.googleButton}>
        <button
          className="flex items-center w-full bg-white border border-gray-300 rounded-[1rem] shadow-md px-6 py-2 text-sm font-medium text-gray-800 mt-4 mb-4"
          id="register"
          onClick={(event) => handleSignUpWithPopup(event, navigate)}
        >
          <FaGoogle className="mr-2" /> Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Registration;
