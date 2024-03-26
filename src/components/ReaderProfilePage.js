import * as React from "react";
import NavigationBar from "./NavigationBar";


import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase.js';
import { doc, getDoc } from 'firebase/firestore';
import fetchPFP from '../functions/fetchPFP';
import fetchUsernameWithUID from '../functions/fetchUsernameWithUID.js';
import DOMPurify from 'dompurify';
import NewBookList from './BookStacks/NewBookList.js'


export default function ReaderProfilePage() {
  const [user, loading] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [fetchedProfilePicture, setFetchedProfilePicture] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Set loading to false initially
  const [show, setShow] = useState(false);
  const noShow = () => setShow(false);


  useEffect(() => {
      const fetchUserData = async () => {
          try {
              if (user && !userData) {
                  setIsLoading(true); 
                  const userRef = doc(db, 'users', user.uid);
                  const docSnapshot = await getDoc(userRef);

                  if (docSnapshot.exists()) {
                      const userData = docSnapshot.data();
                      setUserData(userData);
                      localStorage.setItem('userData', JSON.stringify(userData)); 
                  } else {
                      console.log('User document does not exist');
                  }

                  const profilePictureURL = await fetchPFP(user.uid);
                  if (profilePictureURL !== fetchedProfilePicture) {
                      setFetchedProfilePicture(profilePictureURL);
                      localStorage.setItem('profilePicture', profilePictureURL); 
                  }
              }
          } catch (error) {
              console.error('Error fetching user data:', error);
          } finally {
              setIsLoading(false); 
          }
      };

      fetchUserData();
  }, [user, userData, fetchedProfilePicture]);

  if (loading || isLoading) {
      return <div>Loading...</div>; 
  }
  if (!user) {
      return (
          <div>
              <p>You need to sign in to view your profile. Redirecting...</p>
              {setTimeout(() => {
                  window.location.href = '/';
              }, 2000)}
          </div>
      );
  }

  const defaultProfilePicture = require('../assets/default-profile-picture.jpg');


  return (
    <div>
      <div className="flex flex-col bg-lightcolor">

        {/* 2 */}

        <div className="h-80 w-full bg-gray-200" >
        </div>
        {/* 3 */}

        <div className="flex justify-center items-center w-full">
                  {/* 3.1 */}

          <div className=" h-40 w-40 rounded-full bg-gray-400">
          </div>
        </div>
                {/* 4 */}

        {userData && (<div className="flex flex-col justify-center items-center w-full space-y-4">
                  {/* 4.1 */}

          <div className="text-3xl font-bold"> 
          {userData.username}
          </div>
          {/* 4.2 */}
          <div> 
            @{userData.username}
          </div>
          {/* 4.3 */}
          <div className=" px-3 py-2 rounded-lg shadow-lg bg-maroon text-white">
            {userData.role && userData.role.length > 0 && (
                            <div className="mb-2">
                                <ul className="list-disc ml-4">
                                    {userData.role.map((role, index) => (
                                        <li key={index}>{role}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
          </div>
          {/* 4.4 */}
          <div className="text-lg flex flex-row gap-5 mx-48">
            {/* 4.4.1 */}
            <div className="text-center">{userData.genres ? userData.genres.join(', ') : 'No genres selected'}</div>

          </div>
          {/* 4.5 */}
          <div className="text-xl flex flex-row gap-5">
            {/* 4.5.1 */}
            <div>
              100 Followers
            </div>
            <div>
              150 Following
            </div>
          </div>
          <button type='button' className="px-3 py-2 rounded-lg shadow-lg bg-maroon text-white">
            + Follow
            </button>
          {/* 4.6 */}
          <div className="text-lg flex flex-row gap-5"> 
            {userData.bio ? (
                            <p dangerouslySetInnerHTML={{ __html: `<strong>Bio:</strong> ${DOMPurify.sanitize(userData.bio)}` }}></p>
                        ) : (
                            <p className="mb-2">
                            <span className="text-orange-500">No bio provided</span>
                        </p>
                        )}
          </div>


          <div className="w-full border-b border-gray-700 mt-4">
          </div>

            
          <div className="flex justify-between items-center w-full">

            <div className="flex flex-col justify-center items-center w-full">
              <div>
              <button className="text-2xl text-black">Book Lists</button>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center w-full">
              <div className="space-x-32">
              <button className="text-2xl text-black">Activity</button>
              <button className="text-2xl text-black">Posts</button>
              </div>
            </div>
          
          </div>
        
        </div> )}

      </div>

    </div>
  )
}


