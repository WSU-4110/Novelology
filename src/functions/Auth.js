import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { valid } from "semver";
import { Navigate } from "react-router";

export function signUpWithEmail(htmlEmail, htmlPass, htmlUser) {
    handleSignUpWithEmail(htmlEmail, htmlPass, htmlUser);
}

export function handleSignUpWithPopup(event) {
    event.preventDefault(); // Prevent the default behavior of the button

    // Sign out the current user from Firebase Authentication
    signOut(auth)
        .then(() => {
            // Sign in with Google using a popup
            signInWithPopup(auth, new GoogleAuthProvider())
                .then((result) => {
                    // If signing up with Google, check if the user already exists in the database
                    const userRef = db.collection("users").doc(result.user.uid);
                    userRef.get().then((doc) => {
                        if (doc.exists) {
                            console.log("User already exists in the database.");
                        } else {
                            // User does not exist in the database, add the user data to the database
                            addUserToDatabase(result.user.uid, result.user.email, result.user.displayName);
                        }
                    }).catch((error) => {
                        console.error("Error checking user existence:", error);
                    });
                })
                .catch((error) => {
                    console.error("Google sign-in error:", error);
                });
        })
        .catch((error) => {
            console.error("Sign-out error:", error);
        });
}

export function handleSignInWithPopup() {
    return signInWithPopup(auth, new GoogleAuthProvider())
    .then((result) => {
        const { uid, email, displayName } = result.user;
        console.log("User signed in successfully:", { uid, email, displayName });
    })
    .catch((error) => {
        console.error("Google sign-in error:", error);
    });
}



function addUserToDatabase(uid, email, displayName) {
    const signUpTime = Date.now(); // Get current timestamp
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


export const handleLogout = (navigate) => {
    localStorage.removeItem('userData');
    auth.signOut();
    navigate('/');
};
