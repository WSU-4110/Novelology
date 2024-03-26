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
import { FollowButton } from '../components/user/FollowButton';

const UserPage = () => {
  const { username: paramUsername } = useParams();
  const [username, setUsername] = useState(paramUsername);
  const [authUser, loadingAuthUser] = useAuthState(auth);


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
        const fetchedUID = await fetchUIDwithUsername(paramUsername);
        if (!fetchedUID) throw new Error(`No UID found for username: ${paramUsername}`);

        setUID(fetchedUID);

        // Fetch user data using UID
        const userRef = doc(db, 'users', fetchedUID);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setUserData(userData);

          // Fetch profile picture using fetchPFP function with the obtained UID
          const fetchedProfilePicture = await fetchPFP(fetchedUID);
          setProfilePictureURL(fetchedProfilePicture || require('../assets/default-profile-picture.jpg'));

          const currentUser = auth.currentUser;
          setIsFollowing(currentUser && userData.followers?.includes(currentUser.uid));
        } else {
          console.error('User document not found for username:', paramUsername);
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
  }, [paramUsername]);

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
      userData.visibility === 'private' && !isFollowing && userData.UID !== authUser.uid ? (
        <div className="flex flex-col items-center justify-center h-screen">
                  <img src={require('../assets/reader-profile-banner.jpg')} alt="Reader Profile Banner" className="w-full h-60 object-cover" />
        <div className="flex justify-center items-center w-full">
        {profilePictureURL ? ( 
          <img src={profilePictureURL} alt="Profile Picture" className="h-40 w-40 rounded-full border-4 border-white -mt-20" />
      ) : (
          <img src={defaultProfilePicture} alt="Profile Picture" className="h-40 w-40 rounded-full border-4 border-white -mt-20" />
      )}
        </div>
          <FaLock className="text-9xl text-maroon" />
          <p className="text-4xl text-center mt-4">This profile is private.</p>
          <p className="text-4xl text-center">Follow to view content.</p>
          <FollowButton
            targetUserId={userData.UID}
            />
        </div>
      ) : (
      userData.role.includes("Reader") ? (
        <ReaderProfilePage userData={userData} isFollowing={isFollowing} profilePictureURL={profilePictureURL}  />
      ) : (
        userData.role.includes("Author") ? (
          <AuthorProfilePage userData={userData} isFollowing={isFollowing} profilePictureURL={profilePictureURL} />
        ) : (
          <div>
            <p>User role not recognized</p>
          </div>
        )
      )
   ) ) : (
      <div>
        <p>User data not found</p>
      </div>
    )
  );
  
}

export default UserPage;
