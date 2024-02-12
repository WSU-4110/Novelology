import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth, db, provider } from '../firebase';
import { valid } from "semver";
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export function signUpWithEmail(htmlEmail, htmlPass, htmlUser) {
    handleSignUpWithEmail(htmlEmail, htmlPass, htmlUser);
}

export async function handleSignUpWithPopup(navigate) {
    try {
        // Sign out the current user from Firebase Authentication
        await signOut(auth);

        // Sign in with Google using a popup
        const result = await signInWithPopup(auth, new GoogleAuthProvider());

        // If signing up with Google, check if the user already exists in the database
        const userRef = doc(db, "users", result.user.uid);
        const docSnapshot = await getDoc(userRef);

        if (docSnapshot.exists()) {
            // User already exists, log in instead of signing up
            await signInWithEmailAndPassword(auth, result.user.email, result.user.uid);
        } else {
            // User does not exist in the database, add the user data to the database
            await addUserToDatabase(result.user.uid, result.user.email, result.user.displayName);
        }

        // Redirect to setup-account page after successful sign-up or login
        navigate('/setup-account');
    } catch (error) {
        console.error("Error signing up with Google:", error);
    }
}


export function handleSignInWithPopup() {
    return signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
    })
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

        // Redirect to setup-account page after user is successfully added to the database
        const navigate = useNavigate();
        navigate('/setup-account');
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