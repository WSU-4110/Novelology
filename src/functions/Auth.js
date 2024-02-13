import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, signInWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { auth, db, provider} from '../firebase';
import { useNavigate } from "react-router";
import { doc, setDoc, getDoc, deleteDoc} from 'firebase/firestore';
import { getStorage, ref, deleteObject } from "firebase/storage";

const storage = getStorage();

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
            await addUserToDatabase(result.user.uid, result.user.email, result.user.displayName, navigate);
        }

        // Redirect to setup-account page after successful sign-up or login
        navigate('/setup-account');
    } catch (error) {
        console.error("Error signing up with Google:", error);
    }
}
export async function handleSignInWithPopup(navigate) {
    try {
        // Sign in with Google using a popup
        const result = await signInWithPopup(auth, provider);

        // Handle successful sign-in
        const user = result.user;

        // Check if the user already exists in the database
        const userRef = doc(db, "users", user.uid);
        const docSnapshot = await getDoc(userRef);

        if (!docSnapshot.exists()) {
            // User does not exist in the database, sign up
            console.log('User signed up for the first time');
            // Perform actions specific to first sign-up
            await addUserToDatabase(user.uid, user.email, user.displayName, navigate);
        } else {
            // Redirect to setup-account page after successful sign-in or login
            navigate('/setup-account');
        }
    } catch (error) {
        console.error("Error signing in with Google:", error);
    }
}



async function addUserToDatabase(uid, email, displayName, navigate) {
    try {
        const signUpTime = Date.now(); // Get current timestamp
        await setDoc(doc(db, "users", uid), {
            email: email,
            emailVerified: false,
            username: displayName,
            signUpTime: signUpTime // Add sign-up time
        });
        console.log("User added to database successfully");

        // Redirect to setup-account page after user is successfully added to the database
        navigate('/setup-account');
    } catch (error) {
        console.error("Error adding user to database:", error);
    }
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

export const handleDeleteAccount = async (navigate) => {
    try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            console.error('User is not authenticated.');
            return;
        }

        let authMethod = '';

        // Check if the user is authenticated with password or Google provider
        currentUser.providerData.forEach(provider => {
            if (provider.providerId === 'password') {
                authMethod = 'password';
            } else if (provider.providerId === 'google.com') {
                authMethod = 'Google';
            }
        });

        if (!authMethod) {
            console.error('Authentication method not found.');
            return;
        }

        if (authMethod === 'password') {
            // Prompt the user to input their password
            const password = prompt("Please enter your password to delete your account:");
            if (!password) {
                console.log('Password input cancelled.');
                return;
            }

            // Authenticate the user with email and password
            await signInWithEmailAndPassword(auth, currentUser.email, password);
        } else if (authMethod === 'Google') {
            // Sign out the user if authenticated with Google
            await signOut(auth);
            // Don't open the popup again if authenticated with Google
            // Handle sign in with popup only if not authenticated with Google
            if (auth.currentUser?.providerData?.every(provider => provider.providerId !== 'google.com')) {
                await handleSignInWithPopup(navigate);
            }
        }

        // Delete user's profile picture
        await deleteProfilePicture(currentUser.uid);

        // After successful sign-in and profile picture deletion, delete user's account
        await deleteUserAccount(currentUser);

        navigate('/');
    } catch (error) {
        console.error('Error deleting account:', error);
    }
};


const deleteProfilePicture = async (uid) => {
    try {
        // Create a reference to the profile picture in Firebase Storage
        const storageRef = ref(storage, `users/${uid}/profilePicture.png`);
        
        // Delete the profile picture
        await deleteObject(storageRef);

        console.log('Profile picture deleted successfully.');
    } catch (error) {
        console.error('Error deleting profile picture:', error);
        // Handle error appropriately, e.g., retry, show error message, etc.
    }
};





const deleteUserAccount = async (user) => {
    try {
        // Delete user's data in Firestore
        await deleteUserData(user.uid);

        // Delete user's account
        await deleteUser(user);
        
        console.log('User account deleted successfully.');
    } catch (error) {
        console.error('Error deleting user account:', error);
        // Handle error appropriately, e.g., retry, show error message, etc.
    }
};



const deleteUserData = async (uid) => {
    try {
        // Delete user's data in Firestore
        const userDocRef = doc(db, "users", uid);
        await deleteDoc(userDocRef);

        // Delete profile picture files in Cloud Storage
        const storageRef = storage.ref(`users/${uid}`);
        const deletePromises = ['profilePicture.png', 'profilePicture.jpg', 'profilePicture.jpeg'].map(async (fileName) => {
            const fileRef = storageRef.child(fileName);
            await fileRef.delete();
            console.log(`Deleted ${fileName} successfully.`);
        });

        await Promise.all(deletePromises);
        console.log('Profile pictures deleted successfully.');
    } catch (error) {
        console.error('Error deleting user data:', error);
    }
};
