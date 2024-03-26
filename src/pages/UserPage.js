import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc, collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { FaInfoCircle, FaUser, FaEllipsisV, FaLock } from 'react-icons/fa';
import fetchPFP from '../functions/fetchPFP';
import fetchUIDwithUsername from '../functions/fetchUIDwithUsername';
import MiniUserCard from '../components/user/MiniUserCard';
import DOMPurify from 'dompurify';
import { toast } from 'react-toastify';
import ReactDOM from 'react-dom';
import { getDocs, query, where } from 'firebase/firestore';
import { deleteDoc } from 'firebase/firestore';
import createNotification from '../functions/createNotification';
import ReaderProfilePage from "../components/ReaderProfilePage"
import AuthorProfilePage from "../components/AuthorProfilePage"
import { UserOptionsModal } from '../components/user/UserOptionsModal';
import { toggleMute } from '../functions/toggleMute';
import { reportUser } from '../functions/reportUser';
import { requestFollow } from '../functions/requestFollow';
import { useAuthState } from 'react-firebase-hooks/auth';




const FollowButton = ({ isFollowing, toggleFollow, visibility, requestFollow, targetUserId }) => {
  const [hasRequested, setHasRequested] = useState(false);

  useEffect(() => {
    const checkRequested = async () => {
      const currentUserDocRef = doc(db, 'users', auth.currentUser.uid);
      const currentUserDoc = await getDoc(currentUserDocRef);
      if (currentUserDoc.exists()) {
        const currentUserData = currentUserDoc.data();
        const requested = currentUserData.requested && currentUserData.requested.includes(targetUserId);
        setHasRequested(requested);
      }
    };

    checkRequested();
  }, [targetUserId, requestFollow]);

  const handleToggleFollow = async () => {
    if (visibility === 'public') {
      toggleFollow();
    } else {
      const result = await requestFollow(targetUserId);
      if (result !== null) {
        setHasRequested(result);
      }
    }
  };

  let buttonText = 'Follow';
  if (isFollowing) {
    buttonText = 'Unfollow';
  } else if (hasRequested) {
    buttonText = 'Requested';
  } else if (visibility === 'private') {
    buttonText = 'Request Follow';
  }

  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
      onClick={handleToggleFollow}
    >
      {buttonText}
    </button>
  );
};

const UserPage = () => {
  const { username: paramUsername } = useParams();
  const [username, setUsername] = useState(paramUsername);
  const [authUser, loadingAuthUser] = useAuthState(auth);

  useEffect(() => {
    const fetchUsername = async () => {
      if (!paramUsername && authUser) {
        const userRef = doc(db, 'users', authUser.uid);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setUsername(userData.username);
        }
      }
    };

    fetchUsername();
  }, [paramUsername, authUser]);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [profilePictureURL, setProfilePictureURL] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [showFollowers, setShowFollowers] = useState(false);
  const [following, setFollowing] = useState([]);
  const [showFollowing, setShowFollowing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [followersFetched, setFollowersFetched] = useState(false);
  const [followingFetched, setFollowingFetched] = useState(false);
  const [uid, setUID] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);

        // Fetch UID using username
        const fetcheduid = await fetchUIDwithUsername(username);
        if (!fetcheduid) throw new Error(`No UID found for username: ${username}`);

        setUID(fetcheduid);

        // Fetch user data using UID
        const userRef = doc(db, 'users', fetcheduid);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setUserData(userData);

          // Fetch profile picture using fetchPFP function with the obtained UID
          const fetchedProfilePicture = await fetchPFP(fetcheduid);
          setProfilePictureURL(fetchedProfilePicture || require('../assets/default-profile-picture.jpg'));

          setFollowersCount(userData.followers?.length || 0);
          setFollowingCount(userData.following?.length || 0);

          const currentUser = auth.currentUser;
          setIsFollowing(currentUser && userData.followers?.includes(currentUser.uid));
        } else {
          console.error('User document not found for username:', username);
          setUserData(undefined); // Handle not found case
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUserData(undefined); // Set userData to undefined on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  useEffect(() => {
    // Check if the user is muted
    const checkIfMuted = async () => {
      const currentUser = auth.currentUser;
      if (currentUser && userData) {
        const userRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userDocData = userDoc.data();
          setIsMuted(userDocData.muted && userDocData.muted.includes(userData.UID));
        }
      }
    };

    checkIfMuted();
  }, [userData]);

  const toggleFollow = async () => {
    try {
      if (!userData || !userData.UID) {
        console.error('User data or UID not initialized.');
        return;
      }

      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error('Current user not authenticated.');
        return;
      }

      const currentUserId = currentUser.uid;

      // Define document references
      const currentUserDocRef = doc(db, 'users', currentUserId);
      const userDocRef = doc(db, 'users', userData.UID);

      // Update Firestore documents based on follow status
      if (isFollowing) {
        // Confirm unfollow for private users
        if (userData.visibility === 'private' && !window.confirm('Are you sure you want to unfollow this user?')) {
          return; // Do nothing if user cancels the confirmation
        }
        // Unfollow the user
        await updateDoc(currentUserDocRef, {
          following: arrayRemove(userData.UID)
        });
        await updateDoc(userDocRef, {
          followers: arrayRemove(currentUserId)
        });
        console.log('User unfollowed successfully.');
      } else {
        // Follow the user
        await updateDoc(currentUserDocRef, {
          following: arrayUnion(userData.UID)
        });
        await updateDoc(userDocRef, {
          followers: arrayUnion(currentUserId)
        });
        console.log('User followed successfully.');
      }

      // Toggle follow status
      setIsFollowing(!isFollowing);

      // Update followers count
      setFollowersCount(prevCount => isFollowing ? prevCount - 1 : prevCount + 1);
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };

  const toggleFollowers = async () => {
    try {
      if (!showFollowers && !followersFetched) {
        if (!userData || !userData.UID) {
          console.error('User data or UID not initialized.');
          return;
        }

        console.log('User UID:', userData.UID);

        // Access the 'followers' array within the user document data
        const followersData = userData.followers || [];
        console.log('Followers Data:', followersData);
        setFollowers(followersData);
        setFollowersFetched(true);
      }
      setShowFollowers(prevState => !prevState);
    } catch (error) {
      console.error('Error fetching followers:', error);
    }
  };

  const toggleFollowing = async () => {
    try {
      if (!showFollowing && !followingFetched) {
        if (!userData || !userData.UID) {
          console.error('User data or UID not initialized.');
          return;
        }

        console.log('User UID:', userData.UID);

        // Access the 'following' array within the user document data
        const followingData = userData.following || [];
        console.log('Following Data:', followingData);
        setFollowing(followingData);
        setFollowingFetched(true);
      }
      setShowFollowing(prevState => !prevState);
    } catch (error) {
      console.error('Error fetching following:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const defaultProfilePicture = require('../assets/default-profile-picture.jpg');

  return (
    userData ? (
      userData.role.includes("Reader") ? (
        <ReaderProfilePage />
      ) : (
        userData.role.includes("Author") ? (
          <AuthorProfilePage />
        ) : (
          <div>
            <p>User role not recognized</p>
          </div>
        )
      )
    ) : (
      <div>
        <p>User data not found</p>
      </div>
    )
  );
}

export default UserPage;
