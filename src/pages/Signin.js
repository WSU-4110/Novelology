import * as React from "react";
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { FaGoogle } from 'react-icons/fa';
import { handleSignInWithPopup } from "../functions/Auth.js";
import NavigationBar from "../components/NavigationBar.js";
function SignIn({showNavBar}) {
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSignInWithEmailAndPassword() {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch (error) {
      alert("Error signing in with email: " + error.message);
    }
    setLoading(false);
  }

  return (
    <>
    {showNavBar && <NavigationBar />}

    <div className="flex justify-center items-center px-16 py-12 text-xl text-white bg-maroon max-md:px-5">
      <div className="flex flex-col mt-6 max-w-full w-[408px]">
        <img
          loading="lazy"
          srcSet= {require("../assets/novelology_newlogo.png")}
          className="self-center max-w-full aspect-[1.08] w-[184px]"
        />
        <div className="self-center mt-14 text-6xl whitespace-nowrap max-md:mt-10 max-md:text-4xl">
          Sign In{" "}
        </div>
        <div className="justify-center px-7 py-2.5 mt-14 text-center text-black whitespace-nowrap rounded-3xl max-md:px-5 max-md:mt-10">
          <button
            type="button"
            className="text-gray-900 bg-lightcolor border border-gray-300 focus:outline-none 
            hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-lg px-16 py-4 me-2 mb-2 
            dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-lightcolor dark:hover:border-gray-600 
            dark:focus:ring-lightcolor"

            
              onClick={(event) => {
              event.preventDefault(); // Prevent default form submission
              handleSignInWithPopup(navigate,setLoading).catch((error) => console.error('Error during sign-in:', error));
          }}
          >
            Sign in with Google
          </button>
        </div>
        <div className="self-center mt-10 text-center">
          _________ OR __________
        </div>
        
        <div className="mt-8 text-2xl">Email Address</div>
        <input
                  type="text"
                  id="username"
                  className="bg-lightcolor border border-gray-300 text-gray-900 text-sm rounded-full 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-lightcolor dark:border-gray-600 
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ref={emailRef}
                  placeholder="email"
                />
        {/* <div className="shrink-0 mt-3.5 h-10 rounded-3xl" /> */}
        <div className="mt-12 text-2xl max-md:mt-10">Password</div>
        <input
                  type="password"
                  id="password"
                  ref={passwordRef}
                  className="bg-lightcolor border border-gray-300 text-gray-900 text-sm rounded-full 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-lightcolor dark:border-gray-600 
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Password"
                />
        {/* <div className="shrink-0 mt-2 h-10 rounded-3xl" /> */}
        <button className="self-center px-12 pt-3 pb-1 mt-12 text-2xl text-center rounded-3xl border border-white border-solid bg-maroon max-md:px-5 max-md:mt-10"
        type="button" disabled={loading} onClick={handleSignInWithEmailAndPassword}
        >
          Sign In
        </button>
        <div className="self-center mt-20 w-full text-center max-md:mt-10">
          Don’t have an account?
          <button className="focus:outline-none 
            hover:border-white focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-lg px-16 py-4 me-2 mb-2 mt-4
            dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-lightcolor dark:hover:border-gray-600 
            dark:focus:ring-lightcolor"> Sign Up</button>
        </div>
      </div>
    </div>
    </>
  );
}

export default SignIn;
