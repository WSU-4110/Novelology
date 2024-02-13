import { useRef, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { FaGoogle } from 'react-icons/fa';
import { handleSignInWithPopup } from "../functions/Auth";


export function SignIn() {
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSignInWithEmailAndPassword() {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      alert("Error signing in with email: " + error.message);
    }
    setLoading(false);
  }

  return (
    <div>
      <form>
      <button
        className="flex items-center w-full bg-white border border-gray-300 rounded-[1rem] shadow-md px-6 py-2 text-sm font-medium text-gray-800 mt-4 mb-4"
        id="register"
        onClick={(event) => handleSignInWithPopup(event)}
      >
        <FaGoogle className="mr-2" /> Sign In with Google
      </button>
        <input className="mt-1 mb-1 rounded-md p-0.5" ref={emailRef} placeholder="E-Mail Address" />
        <input className="mt-1 mb-1 rounded-md p-0.5" ref={passwordRef} type="password" placeholder="Password" />
        <button type="button" disabled={loading} onClick={handleSignInWithEmailAndPassword}>
          Sign In
        </button>
      </form>
    </div>
  );
}
