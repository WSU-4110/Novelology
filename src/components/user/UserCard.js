import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, collection, addDoc, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { FaInfoCircle, FaUser } from 'react-icons/fa';
import fetchPFP from '../../functions/fetchPFP';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { toast } from 'react-toastify';
import { serverTimestamp } from 'firebase/firestore';
import createNotification from '../../functions/createNotification';

const FollowButton = ({ isFollowing, toggleFollow, hasRequested }) => {
    let buttonText = isFollowing ? 'Unfollow' : 'Follow';
    if (hasRequested) {
        buttonText = 'Requested';
    }

    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={toggleFollow}
        >
            {buttonText}
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
    const [hasRequested, setHasRequested] = useState(false);

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

                        const currentUserDocRef = doc(db, 'users', currentUser.uid);
                        const currentUserDoc = await getDoc(currentUserDocRef);
                        if (currentUserDoc.exists()) {
                            const currentUserData = currentUserDoc.data();
                            setHasRequested(currentUserData.requested && currentUserData.requested.includes(userId));
                        }
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
    }, [userId, fetchedProfilePicture]);

    async function checkIfUserIsMuted(userDocRef, currentUserId) {
        // Fetch the target user's document to check if they have muted the current user
        const userSnapshot = await getDoc(userDocRef);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
           return userData.muted && userData.muted.includes(currentUserId);
        }
        return false; // Default to false if there's no data or 'muted' field
      }

    const sendFollowRequest = async (currentUserDocRef, userDocRef, currentUserId, userId) => {
        try {
          // First, check if the target user has the current user muted
          const isMuted = await checkIfUserIsMuted(userDocRef, currentUserId); // Implement this function based on your data structure
      
          // Only attempt to create a notification if the user hasn't muted the current user
          if (!isMuted) {
            await createNotification(currentUserId, userId, serverTimestamp(), 'follow_request');
          } else {
            // Optionally handle the case where the user is muted differently
            console.log('User has muted notifications from this user, not sending follow request notification.');
          }
      
          // Regardless of mute status, proceed to add the userId to the current user's 'requested' array
          await updateDoc(currentUserDocRef, {
            requested: arrayUnion(userId)
          });
      
          toast.success('Follow request sent!');
          console.log('Follow request sent successfully.');
      
        } catch (error) {
          console.error('Error handling follow request:', error);
        }
      };
  
  const cancelFollowRequest = async (currentUserDocRef, userDocRef, currentUserId, userId) => {
      await updateDoc(currentUserDocRef, {
          requested: arrayRemove(userId)
      });
      const notificationsRef = collection(db, 'users', userId, 'notifications');
      const q = query(notificationsRef, where('type', '==', 'follow_request'), where('fromUserId', '==', currentUserId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
      });
      console.log('Follow request canceled successfully.');
      toast.info('Follow request canceled.');
  };
  
  const toggleFollow = async () => {
      if (!userData || !auth.currentUser) {
          console.error('User data or current user not available.');
          return;
      }
  
      const currentUserId = auth.currentUser.uid;
      const currentUserDocRef = doc(db, 'users', currentUserId);
      const userDocRef = doc(db, 'users', userId);
  
      try {
          if (isFollowing) {
              // Optimistically update UI
              setIsFollowing(false);
              setFollowersCount(prevCount => prevCount - 1);
  
              // Perform Firestore updates
              await updateDoc(currentUserDocRef, {
                  following: arrayRemove(userId)
              });
              await updateDoc(userDocRef, {
                  followers: arrayRemove(currentUserId)
              });
              console.log('User unfollowed successfully.');
              toast.error('Unfollowed user.');
          } else if (userData.visibility === 'private') {
              if (!hasRequested) {
                  await sendFollowRequest(currentUserDocRef, userDocRef, currentUserId, userId);
                  setHasRequested(true); // Optimistically update UI
              } else {
                  await cancelFollowRequest(currentUserDocRef, userDocRef, currentUserId, userId);
                  setHasRequested(false); // Optimistically update UI
              }
          } else {
              // Optimistically update UI
              setIsFollowing(true);
              setFollowersCount(prevCount => prevCount + 1);
  
              // Perform Firestore updates
              await updateDoc(currentUserDocRef, {
                  following: arrayUnion(userId)
              });
              await updateDoc(userDocRef, {
                  followers: arrayUnion(currentUserId)
              });
              console.log('User followed successfully.');
              toast.success('Followed user.');
          }
      } catch (error) {
          console.error('Error toggling follow:', error);
          // Revert optimistic UI updates in case of error
          setIsFollowing((prev) => !prev);
          setFollowersCount((prevCount) => (isFollowing ? prevCount + 1 : prevCount - 1));
          setHasRequested((prev) => !prev);
      }
  };
  

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const defaultProfilePicture = require('../../assets/default-profile-picture.jpg');

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
                        <FollowButton isFollowing={isFollowing} toggleFollow={toggleFollow} hasRequested={hasRequested} />
                    )}
                </div>
            ) : (
                <p className="text-red-500">User data not found.</p>
            )}
        </div>
    );
};

export default UserCard;
