import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import NovelologyCircleBorderLogo from '../../NovelologyCircleBorderLogo.png';


// Define the SignIn component
export const SignIn = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to navigate to the registration page
  const navigateToRegistration = () => {
    window.location.href = '/register'; // URL of your registration page
  };

  // Main container styling with maroon/purple background color
  const mainContainerStyle = {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'auto',
    backgroundColor: 'rgba(91, 46, 72, 1)', // Background color for entire screen
  };

  const dontHaveAccountTextStyle = (fontSize, fontWeight, marginBottom, marginTop, color = 'rgba(255, 255, 255, 1)') => ({
    color: color,
    textAlign: 'center',
    lineHeight: 'normal',
    fontFamily: 'Montserrat',
    fontSize: fontSize,
    fontWeight: fontWeight,
    textDecoration: 'none',
    marginBottom: marginBottom,
    marginTop: '60px', // Added marginTop for more control over spacing
  });

  // Adjusted sign in box styling for vertical coverage
  const signInBoxStyle = {
    maxWidth: '600px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around', // Ensures even distribution of space
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    paddingTop: '20px', // Padding at the top
    paddingBottom: '20px', // Padding at the bottom
  };

  // Adjusted text styling function for minimal spacing
  const textStyle = (fontSize, fontWeight, marginBottom, color = 'rgba(255, 255, 255, 1)') => ({
    color: color,
    textAlign: 'center',
    lineHeight: 'normal',
    fontFamily: 'Montserrat',
    fontSize: fontSize,
    fontWeight: fontWeight,
    textDecoration: 'none',
    marginBottom: marginBottom,
    marginTop: '20px',
  });

  // Separate style for the "Sign In with Google" button
  const googleSignInButtonStyle = {
    backgroundColor: '#ffffff',
    width: '300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1px',
    borderRadius: '30px',
    marginBottom: '15px',
    marginTop: '70px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.8)',
  };

  // Adjusted function for login button styling
  const loginButtonStyle = () => ({
    // Existing login button styles
    backgroundColor: 'rgba(91, 46, 72, 1)',
    width: '300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '20px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 1)',
    marginBottom: '10px', // Reduced spacing to minimize empty space
    marginTop: '10px',
  });

  // Separate style for the sign-up button
  const signUpButtonStyle = {
    backgroundColor: '#ffffff',
    width: '300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    borderRadius: '40px',
    marginBottom: '40px',
    marginTop: '1px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.8)',
  };

  const inputFieldStyle = {
    backgroundColor: '#ffffff',
    width: '300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '20px',
    marginBottom: '20px',
    marginTop: '5px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.8)',
  };

  // Function to handle email change
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Function to handle password change
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div style={mainContainerStyle}>
      <div style={signInBoxStyle}>

      <img
          src={NovelologyCircleBorderLogo}
          alt="Novelology Logo"
          style={{
            width: '184px',
            height: '172px',
            marginBottom: '20px',
          }}
        />

        {/* Sign In title */}
        <span style={textStyle(65, 400, '20px')}>Sign In</span>
        

        {/* Sign in with Google button (Placeholder for actual implementation) */}
        <div style={googleSignInButtonStyle}>
          <span style={textStyle(20, 400, '20px', 'rgba(0, 0, 0, 1)')}>Sign in with Google</span>
        </div>

        {/* Divider text */}
        <span style={textStyle(20, 400, '20px')}>---------- OR ----------</span>

        {/* Email/Username label and input */}
        <span style={textStyle(24, 400, '5px', 'rgba(255, 255, 255, 1)')}>Email/Username</span>
        <input
          type="text"
          placeholder="Enter your email or username"
          style={inputFieldStyle}
          value={email}
          onChange={handleEmailChange}
        />

        {/* Password label and input */}
        <span style={textStyle(24, 400, '5px', 'rgba(255, 255, 255, 1)')}>Password</span>
        <input
          type="password"
          placeholder="Enter your password"
          style={inputFieldStyle}
          value={password}
          onChange={handlePasswordChange}
        />

        {/* Login text (Placeholder for actual button action) */}
        <span style={loginButtonStyle(24, 400, '20px')}>Log In</span>

        {/* Sign up invitation text */}
        <span style={dontHaveAccountTextStyle(20, 400, '20px')}>Don’t have an account?</span>

        {/* Adjusted Sign Up button to use navigateToRegistration */}
        <button style={signUpButtonStyle} onClick={navigateToRegistration}>
          Sign Up
        </button>

      </div>
    </div>
  );
};

export default SignIn;
