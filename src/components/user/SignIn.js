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
    navigate('/register');
  };
  

  return (
    <div className="min-w-20 p-1">
      <h1 style={{ fontSize: '1.0rem', marginBottom: '2.5rem', textAlign: 'center' }}>
        Sign In
      </h1>

      <form>
        <button
            className="flex items-center w-full bg-white border border-gray-300 rounded-[5rem] shadow-md px-6 py-2 text-sm font-medium text-gray-800 mt-4 mb-4"
            id="google-sign-in"
            onClick={(event) => {
                event.preventDefault(); // Prevent default form submission
                signInWithGoogle();
              }}
        >
            <FaGoogle className="mr-2" /> Sign In with Google
        </button>

        <div className="flex justify-between items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-400">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div>
          <label>E-Mail Address</label>
          <input className="mt-1 mb-1 rounded-md p-0.5 outline-none focus:ring focus:ring-blue-300 h-8 w-full" ref={emailRef} placeholder="E-Mail Address" />
        </div>
        <div>
          <label>Password</label>
          <input className="mt-1 mb-1 rounded-md p-0.5 outline-none focus:ring focus:ring-blue-300 h-8 w-full" ref={passwordRef} type="password" placeholder="Password" />
        </div>
        <button type="button" disabled={loading} onClick={handleSignInWithEmailAndPassword} className="mt-4 w-full bg-blue-500 text-white rounded-md px-4 py-2">
          Sign In
        </button>

        <button
          type="button"
          className="mt-4 w-full text-blue-500"
          onClick={navigateToRegistration}
        >
          Don't have an account? Sign Up
        </button>
      </form>
    </div>
  );
}
