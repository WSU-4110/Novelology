import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth, db } from '../firebase';

export function signUpWithEmail(htmlEmail, htmlPass, htmlUser) {
    handleSignUpWithEmail(htmlEmail, htmlPass, htmlUser);
}

export function handleSignUpWithPopup(event) {
    event.preventDefault(); // Prevent the default behavior of the button
    signInWithPopup(auth, new GoogleAuthProvider())
    .then((result) => {
        // If signing up with Google, add the user data to the database
        addUserToDatabase(result.user.uid, result.user.email, result.user.displayName);
    })
    .catch((error) => {
        console.error("Google sign-in error:", error);
    });
}

function addUserToDatabase(uid, email, displayName) {
    const signUpTime = Date.now; // Get current timestamp
    setDoc(doc(db, "users", uid), {
        email: email,
        emailVerified: false,
        username: displayName,
        signUpTime: signUpTime // Add sign-up time
    })
    .then(() => {
        console.log("User added to database successfully");
    })
    .catch((error) => {
        console.error("Error adding user to database:", error);
    });
}

function handleSignUpWithEmail(htmlEmail, htmlPass, htmlUser) {
    createUserWithEmailAndPassword(auth, htmlEmail, htmlPass)
    .then((result) => {
        // If signing up with email, add the user data to the database
        addUserToDatabase(result.user.uid, htmlEmail, htmlUser);
    })
    .catch((error) => {
        const errorCode = error.code;
        console.log(`GOT ERROR: ${errorCode}`);
        if (errorCode === 'auth/weak-password') return; // password too weak. Minimum 6 characters
        if (errorCode === 'auth/email-already-in-use') return; // Email already in use
    });
}
