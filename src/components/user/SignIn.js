import { useRef, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import { FaGoogle } from 'react-icons/fa';
import { handleSignInWithPopup } from "../../functions/Auth";


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
              handleSignInWithPopup().catch((error) => console.error('Error during sign-in:', error));
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
      </form>
    </div>
  );
}



