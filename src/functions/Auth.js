
import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup} from 'firebase/auth';
import { GoogleAuthProvider, signOut} from "firebase/auth";
import {auth, db, provider} from '../firebase';

 

export function handleSignInWithPopup(event) {
    event.preventDefault(); // Prevent the default behavior of the button

    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...

    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  
  }

export async function signUpWithEmail(htmlEmail, htmlPass, htmlUser) {
    var promise = createUserWithEmailAndPassword(auth, htmlEmail, htmlPass)
    
    // If there is any error stop the process.
    promise.catch(function (error) {
        var errorCode = error.code;
        console.log(`GOT ERROR: ` + errorCode)
        if (errorCode === 'auth/weak-password') return // password to weak. Minimal 6 characters
        if (errorCode === 'auth/email-already-in-use') return // Return a email already in use error
    });
  
    // When no errors create the account
    promise.then(function () {
        var userUid = auth.currentUser.uid;
  
        setDoc(doc(db, "users", userUid), {
            email: htmlEmail,
            emailVertified: false,
            username: htmlUser,
        });
        /* Do not add until production
        sendEmailVerification(auth.currentUser)
        .then(() =>{
          //verification email sent
        });*/
     }); 
  }

  
  // Hook
  export function useAuth() {
    const [currentUser, setCurrentUser] = useState();
  
    useEffect(() => {
      const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
      return unsub;
    },[])
  
    return currentUser;
  }
  
  export async function handleSignout() {
    signOut(auth).then( () =>{
        console.log("Logged out successfully.");
    }).catch((error)=>{
        console.log(error.message);
    
    });
  }

