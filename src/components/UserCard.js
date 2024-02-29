import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { FaInfoCircle, FaUser } from 'react-icons/fa';
import fetchPFP from '../functions/fetchPFP';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';
import { arrayRemove, arrayUnion, updateDoc } from 'firebase/firestore';
import DOMPurify from 'dompurify';

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

const UserCard = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [fetchedProfilePicture, setFetchedProfilePicture] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
        try {
            setIsLoading(true);
            const userRef = doc(db, 'users', userId);
            const userSnapshot = await getDoc(userRef);

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
            await updateDoc(currentUserDocRef, {
                following: arrayRemove(userId)
            });
            await updateDoc(userDocRef, {
                followers: arrayRemove(currentUserId)
            });
            console.log('User unfollowed successfully.');
        } else {
            await updateDoc(currentUserDocRef, {
                following: arrayUnion(userId)
            });
            await updateDoc(userDocRef, {
                followers: arrayUnion(currentUserId)
            });
            console.log('User followed successfully.');
        }

        setIsFollowing(!isFollowing); // Toggle follow status

        // Update followers count
        setFollowersCount(prevCount => isFollowing ? prevCount - 1 : prevCount + 1);
    } catch (error) {
        console.error('Error toggling follow:', error);
    }
};


  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const defaultProfilePicture = require('../assets/default-profile-picture.jpg');

  return (
    <div className="user-card border rounded-lg shadow-md p-6 w-75">
      {userData ? (
        <div>
        <Link to={`/users/${userData.username}`}>
          <h2 className="text-2xl font-semibold mb-4"><span className="text-blue-400">@</span> {userData.username}</h2>
        </Link>
          <div className="mr-8">
            <img 
              src={fetchedProfilePicture || defaultProfilePicture} 
              alt="Profile" 
              className="w-24 h-24 rounded-full" 
            />
          </div>
          {userData.bio ? (
            <p className="mb-2">
              <FaInfoCircle className="inline-block" />
              <span className="font-semibold"></span> 
              <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userData.bio) }} />
            </p>
          ) : (
            <p className="mb-2">
              <FaInfoCircle className="inline-block" />
              <span className="font-semibold"></span> 
              <span className="text-orange-500">No bio provided</span>
            </p>
          )}
           <div className="flex justify-between mb-4">
            <p className="font-semibold"><FaUser className="inline-block mr-2" /> Followers: {followersCount}</p>
            <p className="font-semibold"><FaUser className="inline-block mr-2" /> Following: {followingCount}</p>
          </div>
          {userData && userData.role && userData.role.length > 0 && (
            <div className="mb-2">
              <p><strong>Roles:</strong></p>
              <ul className="list-disc ml-4">
                {userData.role.map((role, index) => (
                  <li key={index}>{role}</li>
                ))}
              </ul>
            </div>
          )}
          {auth.currentUser && auth.currentUser.uid !== userData.uid && (
            <FollowButton isFollowing={isFollowing} toggleFollow={toggleFollow} />
          )}
        </div>
      ) : (
        <p className="text-red-500">User data not found.</p>
      )}
    </div>
  );
};

export default UserCard;
