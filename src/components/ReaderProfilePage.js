import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase.js';
import DOMPurify from 'dompurify';
import NewBookList from './BookStacks/NewBookList.js';
import { FollowButton } from '../components/user/FollowButton';

export default function ReaderProfilePage({ userData, isFollowing, profilePictureURL }) {
  const [user] = useAuthState(auth);
  const defaultProfilePicture = require('../assets/default-profile-picture.jpg');

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ml-20">
      <div className="flex flex-col bg-lightcolor">

        <img src={require('../assets/reader-profile-banner.jpg')} alt="Reader Profile Banner" className="w-full h-60 object-cover" />
        <div className="flex justify-center items-center w-full">
        {profilePictureURL ? ( 
          <img src={profilePictureURL} alt="Profile Picture" className="h-40 w-40 rounded-full border-4 border-white -mt-20" />
      ) : (
          <img src={defaultProfilePicture} alt="Profile Picture" className="h-40 w-40 rounded-full border-4 border-white -mt-20" />
      )}

        </div>
        {userData && (
          <div className="flex flex-col justify-center items-center w-full space-y-4">
            <div className="text-3xl font-bold">{userData.username}</div>
            <div>@{userData.username}</div>
            <div className="px-3 py-2 h-10 rounded-lg shadow-lg bg-maroon text-white">
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
            <div className="text-lg flex flex-row gap-5 mx-48">
              <div className="text-center">{userData.genres ? userData.genres.join(', ') : 'No genres selected'}</div>
            </div>
            <div className="text-xl flex flex-row gap-5">
              <div>100 Followers</div>
              <div>150 Following</div>
            </div>
            {user && user.uid !== userData.uid && <FollowButton targetUserId={user.uid} isFollowing={isFollowing} />}
            <div className="text-lg flex flex-row gap-5">
              {userData.bio ? (
                <p dangerouslySetInnerHTML={{ __html: `<strong>Bio:</strong> ${DOMPurify.sanitize(userData.bio)}` }}></p>
              ) : (
                <p className="mb-2">
                  <span className="text-orange-500">No bio provided</span>
                </p>
              )}
            </div>
            <div className="w-full border-b border-gray-700 mt-4"></div>
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

              {/* <div className="flex flex-col justify-center items-center w-full"> */}
                {/* <div className="space-x-32">
                  <button className="text-2xl text-black">Activity</button>
                  <button className="text-2xl text-black">Posts</button>
                </div> */}
              {/* </div> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

