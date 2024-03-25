import { useRef, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import { FaGoogle } from 'react-icons/fa';
import { handleSignInWithPopup } from "../../functions/Auth";
import { useNavigate } from "react-router-dom";

export function SignIn() {
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  async function handleSignInWithEmailAndPassword() {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      alert("Error signing in with email: " + error.message);
    }
    setLoading(false);
  }

  const signInWithGoogle = async () => {
    try {
      handleSignInWithPopup(navigate, setLoading)
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  }


  const navigateToRegistration = () => {
    navigate('/-Register');
  };
  

  return (
    <div className="min-w-20 p-1">
      <h1 style={{ fontSize: '1.0rem', marginBottom: '2.5rem', textAlign: 'center' }}>
      Sign In
      </h1>

      <form>
        <button
            className="flex items-center w-full bg-white border border-gray-300 rounded-[5rem] shadow-md px-6 py-2 text-sm font-medium text-gray-800 mt-4 mb-4"
            id="register"
            onClick={(event) => {
                event.preventDefault(); // Prevent default form submission
                signInWithGoogle();
              }}
        >
            <FaGoogle className="mr-2" /> Sign In with Google
        </button>

        <div className="h-2 w-full flex flex-row mb-2 select-none">
        <div className="w-[45%] h-[.05em] bg-black">
          </div>
          <p className="text-[.75em] relative top-[-.75em] mr-1 ml-1">OR</p>
          <div className="w-[45%] h-[.05em] bg-black">
          </div>
        </div>

          E-Mail Address
          <input className="mt-1 mb-1 rounded-md p-0.5 outline-none focus:ring focus:ring-blue-300 h-8 w-full" ref={emailRef} placeholder="E-Mail Address" />
          Password
          <input className="mt-1 mb-1 rounded-md p-0.5 outline-none focus:ring focus:ring-blue-300 h-8 w-full" ref={passwordRef} type="password" placeholder="Password" />
          <button type="button" disabled={loading} onClick={handleSignInWithEmailAndPassword}>
            Sign In
          </button>

          {/* Sign Up button */}
          
          <button
          type="button"
          className="mt-4 w-full bg-blue-500 text-white rounded-md px-4 py-2"
          onClick={navigateToRegistration}
        >
            Sign Up
          </button>
      </form>
      <div className="h-2 w-full flex flex-row mb-2 select-none">
      <div className="w-[45%] h-[.05em] bg-black">
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
}
