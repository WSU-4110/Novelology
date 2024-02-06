
// Import the functions you need from the SDKs you need
import { useRef, useState } from "react";
import { signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { auth, db, provider} from '../firebase';
import { signUpWithEmail, handleSignInWithPopup } from "../functions/Auth";



export function Registration() {

  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  async function handleSignUpWithEmail() {
    setLoading(true);
    try {
      await signUpWithEmail(emailRef.current.value, passwordRef.current.value, usernameRef.current.value);
    } catch(error) {
      alert("Error signing up with email " + error.message);
    }
    setLoading(false);
  }

    return (
      <div>
        <form>
          <input ref={emailRef} placeholder="E-Mail Address"/>
          <input ref={passwordRef} type="password" placeholder="password"/>
          <input ref={usernameRef} placeholder="username"/>
          <button type="button" disabled={loading} onClick={handleSignUpWithEmail}>Sign Up</button>
        </form>
        <button className="flex items-center bg-white dark:bg-gray-900 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 " id="register" onClick={(event) => handleSignInWithPopup(event)}>
        
        Continue with Google
        </button>
        
        <hr></hr>
        
      </div>
    );

    }