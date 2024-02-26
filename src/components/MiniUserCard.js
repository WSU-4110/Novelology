import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import fetchPFP from '../functions/fetchPFP';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';
import { arrayRemove, arrayUnion, updateDoc } from 'firebase/firestore';

// Allows users to follow or unfollow other users.
const FollowButton = ({ isFollowing, toggleFollow }) => {
    return (
        <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            onClick={toggleFollow}
        >
            {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
    );
};

const MiniUserCard = ({ userId }) => {
    // State variables for user data, profile picture, and loading status
  const [userData, setUserData] = useState(null);
  const [fetchedProfilePicture, setFetchedProfilePicture] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  // Fetch user data and profile picture
  // UseEffect runs when the component mounts and when the userId changes
  useEffect(() => {
    const fetchUserData = async () => {
        try {
            setIsLoading(true);
            const userRef = doc(db, 'users', userId);
            const userSnapshot = await getDoc(userRef);

            // If the user document exists, set the user data state variable to the document data
            // and set the profile picture state variable to the fetched profile picture URL
            if (userSnapshot.exists()) {
                const userData = userSnapshot.data();
                setUserData(userData);

                const profilePictureURL = await fetchPFP(userId);
                if (profilePictureURL !== fetchedProfilePicture) {
                    setFetchedProfilePicture(profilePictureURL);
                }

                setFollowersCount(userData.followers ? userData.followers.length : 0);
                setFollowingCount(userData.following ? userData.following.length : 0);

                const currentUser = auth.currentUser;
                if (currentUser && currentUser.uid !== userData.uid) {
                    setIsFollowing(userData.followers && userData.followers.includes(currentUser.uid));
                }
            } else {
                console.error('User document not found for user ID:', userId);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    fetchUserData();
}, [userId]); // Include userId in the dependency array to re-run effect when it changes

  
    // Function to toggle follow status
  const toggleFollow = async () => {
    try {
        if (!userData) {
            console.error('User data not initialized.');
            return;
        }

        const currentUser = auth.currentUser;
        if (!currentUser) {
            console.error('Current user not authenticated.');
            return;
        }
        const currentUserId = currentUser.uid;

        const currentUserDocRef = doc(db, 'users', currentUserId);
        const userDocRef = doc(db, 'users', userId);

        if (isFollowing) {
            // if the user IS following the other user, unfollow them
            // by removing the other user's ID from the current user's following array
            // and removing the current user's ID from the other user's followers array
            await updateDoc(currentUserDocRef, {
                following: arrayRemove(userId)
            });
            await updateDoc(userDocRef, {
                followers: arrayRemove(currentUserId)
            });
            console.log('User unfollowed successfully.');
        } else { //otherwise follow them
            await updateDoc(currentUserDocRef, {
                following: arrayUnion(userId)
            });
            await updateDoc(userDocRef, {
                followers: arrayUnion(currentUserId)
            });
            console.log('User followed successfully.');
        }

        // toggle the follow state either way
        setIsFollowing(!isFollowing); // Toggle follow status

        // Update followers count
        setFollowersCount(prevCount => isFollowing ? prevCount - 1 : prevCount + 1);
    } catch (error) {
        console.error('Error toggling follow:', error);
    }
};


  
    // If the user data is still loading, display a loading message
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const defaultProfilePicture = require('../assets/default-profile-picture.jpg');

  return (
    <div className="relative user-card rounded-lg shadow-md p-2 max-h-30 bg-white">
      {userData ? (
        <div>
            <div className='flex flex-row align-middle h-full items-center justify-center'>
                <div className="h-full w-1/3">
                    <Link to={`/users/${userData.username}`}>
                    <img 
                    src={fetchedProfilePicture || defaultProfilePicture} 
                    alt="Profile" 
                    className="rounded-full object-cover h-full w-full" 
                    />
                    </Link>
                </div>
                <div className=' flex flex-col justify-center items-center w-full'>
                
                {/* Display username*/}
                <Link to={`/users/${userData.username}`}>
                    <h2 className="text-[1.5rem] justify-center font-semibold mb-2"><span className="text-blue-400">@</span> {userData.username}</h2>
                </Link>
            
          {/*Display follow button if the current user is not the user being displayed*/}
          {auth.currentUser && auth.currentUser.uid !== userData.uid && (
            <FollowButton isFollowing={isFollowing} toggleFollow={toggleFollow} />
          )}
          </div>
          </div>
        </div>
      ) : (
        <p className="text-red-500">User data not found.</p>
      )}
    </div>
  );
};

export default MiniUserCard;
