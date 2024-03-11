import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { FaInfoCircle, FaUser, FaEllipsisV } from 'react-icons/fa';
import fetchPFP from '../functions/fetchPFP';
import fetchUIDwithUsername from '../functions/fetchUIDwithUsername';
import MiniUserCard from '../components/user/MiniUserCard';
import DOMPurify from 'dompurify';
import { toast } from 'react-toastify';
import ReactDOM from 'react-dom';


const OptionsModal = ({ isMuted, toggleMute, reportUser, onClose }) => {
    return ReactDOM.createPortal(
      <div className="relative top-0 right-0 bg-white shadow-lg p-4 rounded z-10">
        <ul>
          <li className="cursor-pointer mb-2" onClick={toggleMute}>
            {isMuted ? 'Unmute' : 'Mute'}
          </li>
          <li className="cursor-pointer" onClick={reportUser}>
            Report
          </li>
        </ul>
        <button className="mt-4 w-full bg-gray-200 p-2 rounded" onClick={onClose}>
          Close
        </button>
      </div>,
      document.getElementById('portal')
    );
  };
  

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

const UserPage = () => {
    const { username } = useParams();
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

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            setIsLoading(true);
      
            // Fetch UID using username
            const uid = await fetchUIDwithUsername(username);
            if (!uid) throw new Error(`No UID found for username: ${username}`);
      
            // Fetch user data using UID
            const userRef = doc(db, 'users', uid);
            const userSnapshot = await getDoc(userRef);
      
            if (userSnapshot.exists()) {
              const userData = userSnapshot.data();
              setUserData(userData);
      
              // Fetch profile picture using fetchPFP function with the obtained UID
              const fetchedProfilePicture = await fetchPFP(uid);
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
    

    // Set the initial toggle state of Follow button to "Unfollow" if the current user is in the followers list of the user's page
    useEffect(() => {
        if (userData && auth.currentUser) {
            setIsFollowing(userData.followers && userData.followers.includes(auth.currentUser.uid));
        }
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
            if (!showFollowers) {
                if (!userData || !userData.UID) {
                    console.error('User data or UID not initialized.');
                    return;
                }
    
                console.log('User UID:', userData.UID);
    
                // Access the 'followers' array within the user document data
                const followersData = userData.followers || [];
                console.log('Followers Data:', followersData);
                setFollowers(followersData);
            }
            setShowFollowers(prevState => !prevState);
        } catch (error) {
            console.error('Error fetching followers:', error);
        }
    };
    
    const toggleFollowing = async () => {
        try {
            if (!showFollowing) {
                if (!userData || !userData.UID) {
                    console.error('User data or UID not initialized.');
                    return;
                }
    
                console.log('User UID:', userData.UID);
    
                // Access the 'following' array within the user document data
                const followingData = userData.following || [];
                console.log('Following Data:', followingData);
                setFollowing(followingData);
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

    const toggleMute = async () => {
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
          const userRef = doc(db, 'users', currentUserId);
          const userDoc = await getDoc(userRef);
      
          if (!userDoc.exists()) {
            console.error('User document not found.');
            return;
          }
      
          const userDocData = userDoc.data();
          const mutedList = userDocData.muted || [];
      
          if (mutedList.includes(userData.UID)) {
            // Unmute the user
            await updateDoc(userRef, {
              muted: arrayRemove(userData.UID),
            });
            setIsMuted(false);
            toast.success('User unmuted successfully.');
          } else {
            // Mute the user
            await updateDoc(userRef, {
              muted: arrayUnion(userData.UID),
            });
            setIsMuted(true);
            toast.success('User muted successfully.');
          }
        } catch (error) {
          console.error('Error muting/unmuting user:', error);
          toast.error('Error muting/unmuting user.');
        }
      };

      const reportUser = () => {
        // Your reportUser logic
        toast.info('Reported user.');
      };

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md relative">
            {userData ? (
                <div>
                    <h2 className="text-3xl font-semibold mb-4"><span className="text-blue-400">@</span> {userData.username}</h2>
                    <div className="mr-8">
                                    <img 
                                    src={profilePictureURL || defaultProfilePicture} 
                                    alt="Profile" 
                                    className="w-24 h-24 rounded-full" 
                                  />

                    </div>

                    <div id='portal'>

                    <button className="relative top-4 right-4" onClick={() => setShowOptionsModal(!showOptionsModal)}>
                        <FaEllipsisV />
                    </button> 
                    {showOptionsModal && (
                        <OptionsModal
                        isMuted={isMuted}
                        toggleMute={toggleMute}
                        reportUser={reportUser}
                        onClose={() => setShowOptionsModal(false)}
                        />
                    )}
                    {userData.bio ? (
                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userData.bio) }} />
                        ) : (
                            <p className="mb-2">
                                <FaInfoCircle className="inline-block mr-2" />
                                <span className="font-semibold">Bio:</span> 
                                <span className="text-orange-500">No bio provided</span>
                            </p>
                        )}
                        {userData.pronouns && <p className="mb-2"><FaInfoCircle className="inline-block mr-2" /><span className="font-semibold">Pronouns:</span> {userData.pronouns}</p>}
                        
                        <div className="flex justify-between mb-4">
                            <div>
                                <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={toggleFollowers}
                                >
                                <p className="font-semibold"><FaUser className="inline-block mr-2" /> Followers: {followersCount}</p>
                                </button>

                                {showFollowers && (
                                <div className="mt-2 max-h-48 overflow-y-auto">
                                    <ul className="list-none">
                                    {followers.map((followerId, index) => (
                                        <li key={index} className="mb-2">
                                        <MiniUserCard userId={followerId} />
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                                )}
                            </div>

                            <div>
                                <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={toggleFollowing}
                                >
                                <p className="font-semibold"><FaUser className="inline-block mr-2" /> Following: {followingCount}</p>
                                </button>

                                {showFollowing && (
                                <div className="mt-2 max-h-48 overflow-y-auto">
                                    <ul className="list-none">
                                    {following.map((followingId, index) => (
                                        <li key={index} className="mb-2">
                                        <MiniUserCard userId={followingId} />
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                                )}
                            </div>
                            </div>

                                            
                        {userData.role && userData.role.length > 0 && (
                            <div className="mb-2">
                                <p><strong>Roles:</strong></p>
                                <ul className="list-disc ml-4">
                                    {userData.role.map((role, index) => (
                                        <li key={index} className="inline-block mr-2 mb-2">
                                            <span className="bg-purple-200 text-purple-700 py-1 px-3 rounded-full text-sm">
                                                {role}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
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

export default UserPage;
