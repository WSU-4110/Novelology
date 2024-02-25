import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs, doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { FaInfoCircle, FaUser } from 'react-icons/fa';
import fetchPFP from '../functions/fetchPFP';
import fetchUIDwithUsername from '../functions/fetchUIDwithUsername';
import MiniUserCard from '../components/MiniUserCard';
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

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setIsLoading(true);
    
                // Fetch UID using username
                const uid = await fetchUIDwithUsername(username);
    
                // Fetch user data using UID
                const userRef = doc(db, 'users', uid);
                const userSnapshot = await getDoc(userRef);
    
                if (userSnapshot.exists()) {
                    const userData = userSnapshot.data();
                    setUserData(userData);
    
                    // Fetch profile picture using fetchPFP function with the obtained UID
                    const fetchedProfilePicture = await fetchPFP(uid);
                    setProfilePictureURL(fetchedProfilePicture);
    
                    setFollowersCount(userData.followers ? userData.followers.length : 0);
                    setFollowingCount(userData.following ? userData.following.length : 0);
    
                    const currentUser = auth.currentUser;
                    if (currentUser && userData.uid && currentUser.uid !== userData.uid) {
                        setIsFollowing(userData.followers && userData.followers.includes(currentUser.uid));
                    }
                } else {
                    console.error('User document not found for username:', username);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchUserData();
    }, [username]);
    
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

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
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
                    <div>
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
                             <button
                            onClick={toggleFollowers}>
                                <p className="font-semibold"><FaUser className="inline-block mr-2" /> Followers: {followersCount}</p>
                           
                                {showFollowers && (
                                    <div>
                                        <ul>
                                        {followers.map((followerId, index) => (
                                            <MiniUserCard key={index} userId={followerId} />
                                        ))}
                                        </ul>
                                    </div>
                                )}

                            </button>
                            <button
                            onClick={toggleFollowing}>
                                
                                <p className="font-semibold"><FaUser className="inline-block mr-2" /> Following: {followingCount}</p>
                           
                                {showFollowing && (
                                    <div>
                                        <ul>
                                        {following.map((followingId, index) => (
                                            <MiniUserCard key={index} userId={followingId} />
                                        ))}
                                        </ul>
                                    </div>
                                )}

                            </button>
                             </div>

                                            
                        {userData.role && userData.role.length > 0 && (
                            <div className="mb-2">
                                <p><strong>Roles:</strong></p>
                                <ul className="list-disc ml-4">
                                    {userData.role.map((role, index) => (
                                        <li key={index}>{role}</li>
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
