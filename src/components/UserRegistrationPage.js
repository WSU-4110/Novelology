import React from "react";
import { signUpWithEmail, handleSignUpWithPopup } from "../functions/Auth";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";

const UserRegistrationPage = (props) => {
  // Style for the main container

  const mainContainerStyle = {
    width: "100%",
    minHeight: "100vh",
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  // State to manage password validation status and requirements
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordRequirements, setPasswordRequirements] = useState({
    minLength: true,
    hasUpperCase: true,
    hasLowerCase: true,
    hasSpecialSymbol: true,
    hasNumber: true,
    match: true,
  });

  const validatePassword = () => {
    // Check if refs are currently pointing to an element before accessing `.value`
    const password = passwordRef.current ? passwordRef.current.value : "";
    const confirmPassword = confirmPasswordRef.current
      ? confirmPasswordRef.current.value
      : "";

    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNumber = /\d/.test(password);
    const match = password === confirmPassword;

    setPasswordValid(
      minLength &&
        hasUpperCase &&
        hasLowerCase &&
        hasSpecialSymbol &&
        hasNumber &&
        match
    );
    setPasswordRequirements({
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasSpecialSymbol,
      hasNumber,
      match,
    });
  };

  const [loading, setLoading] = useState(false);

  const handleSignUpWithEmailClick = async () => {
    if (!passwordValid) {
      alert("Please make sure your password meets all requirements.");
      return;
    }
    setLoading(true);
    try {
      await signUpWithEmail(
        emailRef.current.value,
        passwordRef.current.value,
        usernameRef.current.value // Assuming the signUpWithEmail function accepts username as an argument
      );
      navigate("/dashboard"); // Adjust the redirect path as needed
    } catch (error) {
      alert("Error signing up with email: " + error.message);
    }
    setLoading(false);
  };

  // Ref hooks for form inputs
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const usernameRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const phoneNumberRef = useRef();
  const birthDateRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Redirect to a different page if the user is already signed in
        navigate("/dashboard"); // Adjust the path as needed
      }
    });
    return unsubscribe; // Cleanup subscription on unmount
  }, [navigate]);

  // Style for the registration form container
  const formContainerStyle = {
    backgroundColor: "rgba(255, 255, 255, 1)",
    width: "105%",
    height: "1024px",
    display: "flex",
    alignItems: "flex-start",
    flexShrink: "0",
    position: "relative",
    overflow: "hidden",
  };

  const signInWithGoogleStyle = {
    width: "320px",
    height: "50px",
    backgroundColor: "#4285F4", // Google's brand color
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
    position: "absolute",
    top: "525px",
    left: "76%",
    transform: "translateX(-50%)",
    transition: "background-color 0.3s",
  };

  // Function to handle Google sign-in, adjust as needed
  const handleGoogleSignIn = () => {
    // Implementation depends on your authentication setup
    console.log("Google Sign-In triggered");
  };

  const orTextStyle = {
    position: "absolute",
    top: "545px", // Positioned between the "Create Profile" and "Sign in with Google" buttons
    left: "50%",
    transform: "translateX(-50%)",
    color: "#000",
    fontWeight: "bold",
  };

  // Style for the form background with border, shadow, and rounded corners
  const formBackgroundStyle = {
    position: "absolute",
    top: "97px",
    left: "76px",
    right: "76px",
    bottom: "97px",
    border: "2px solid rgba(0, 0, 0, 0.1)",
    borderRadius: "20px",
    boxShadow: "0px 10px 20px 0px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  // Style for images
  const imageStyle = (top, left, width, height) => ({
    width: `${width}px`,
    height: `${height}px`,
    position: "absolute",
    top: `${top}px`,
    left: `${left}px`,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    borderRadius: "20px",
  });

  // Style for text elements
  const textStyle = (
    top,
    left,
    color = "rgba(255, 255, 255, 1)",
    fontSize = 64
  ) => ({
    color: "black",
    height: "auto",
    textAlign: "left",
    lineHeight: "normal",
    position: "absolute",
    top: `115px`,
    left: `830px`,
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    fontFamily: "Inknut Antiqua",
    fontSize: `${fontSize}px`,
    fontStretch: "normal",
    fontStyle: "Regular",
    fontWeight: 400,
    textDecoration: "none",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    borderRadius: "20px",
    backgroundColor: "#ffffff",
    padding: "20px",
  });

  const registerHeadingStyle = {
    color: "rgba(0, 0, 0, 1)",
    position: "absolute",
    top: "110px", // Adjust the top value as needed to place it above the form
    left: "66%", // Center the text horizontally in the container
    transform: "translateX(-50%)", // Align center with the "Create Profile" button
    fontFamily: "Inknut Antiqua",
    fontSize: "64px",
    fontWeight: 400,
    textDecoration: "none",
    textAlign: "center", // Ensure the text is centered
  };

  // Style for input fields
  const inputStyle = (top, left, placeholder, width = "320px") => ({
    width: width,
    padding: "10px 14px",
    flexShrink: "0",
    position: "absolute",
    top: `${top}px`,
    left: `${left}px`,
    borderRadius: "8px",
    borderWidth: "1px",
    borderColor: "rgba(207, 212, 220, 1)",
    borderStyle: "solid",
    boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05000000074505806)",
  });

  const buttonStyle = {
    width: "320px",
    height: "50px",
    borderRadius: "20px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "white",
    fontSize: "24px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    position: "absolute",
    top: "525px",
    left: "23%",
    transform: "translateX(-50%)",
    transition: "background-color 0.3s",
  };

  const labelStyle = (top, left, fontSize = 20) => ({
    color: "rgba(0, 0, 0, 1)",
    height: "auto",
    textAlign: "left",
    lineHeight: "normal",
    position: "absolute",
    top: `${top}px`,
    left: `${left}px`,
    fontFamily: "Inknut Antiqua",
    fontSize: `${fontSize}px`,
    fontStretch: "normal",
    fontStyle: "Regular",
    fontWeight: 400,
    textDecoration: "none",
  });

  const labeledInputStyle = (
    id,
    top,
    left,
    labelText,
    placeholder,
    type = "text",
    isRequired = false,
    onChange // Accept onChange as a parameter
  ) => {
    const fullInputWidth = "320px";
    return (
      <>
        <label htmlFor={id} style={labelStyle(top, left)}>
          {labelText}
          {isRequired && <span style={{ color: "red" }}> *</span>}
        </label>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          style={inputStyle(top + 40, left, placeholder, fullInputWidth)}
          onChange={onChange} // Apply the onChange event handler
          required={isRequired}
        />
      </>
    );
  };

  // Ensure to call validatePassword on every input change for password and confirm password fields
  useEffect(() => {
    validatePassword();
  }, [passwordRequirements, passwordValid]);

  return (
    <div style={mainContainerStyle}>
      <div style={formContainerStyle}>
        <div style={formBackgroundStyle}></div>
        <span style={textStyle(166, 231, "rgba(255, 255, 255, 1)", 40)}>
          Novelology
        </span>
        <div
          style={{
            ...formBackgroundStyle,
            top: "240px",
            left: "543px",
            width: "803px",
            height: "658px",
          }}
        >
          {labeledInputStyle(
            "first-name",
            24,
            27,
            "First Name",
            "First Name",
            "text",
            true
          )}
          {labeledInputStyle("email", 135, 27, "Email", "Email", "email", true)}
          {labeledInputStyle(
            "password",
            259,
            27,
            "Password",
            "Password",
            "password",
            true,
            validatePassword
          )}
          {labeledInputStyle(
            "confirm-password",
            259,
            449,
            "Confirm Password",
            "Confirm Password",
            "password",
            true,
            validatePassword
          )}
          {labeledInputStyle(
            "last-name",
            24,
            449,
            "Last Name",
            "Last Name",
            "text",
            true
          )}
          {labeledInputStyle(
            "username",
            373,
            27,
            "Username",
            "Username",
            "text",
            true
          )}
          {labeledInputStyle(
            "phone-number",
            135,
            449,
            "Phone Number",
            "Phone Number",
            "tel",
            false
          )}
          {labeledInputStyle(
            "birth-date",
            373,
            449,
            "Birth Date",
            "DD/MM/YYYY",
            "text",
            false
          )}

          <button
            style={buttonStyle}
            onClick={() => {
              /* Handle the click event for registration */
            }}
          >
            Create Profile
          </button>
          <span style={orTextStyle}>OR</span>
          <button style={signInWithGoogleStyle} onClick={handleSignUpWithPopup}>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserRegistrationPage;