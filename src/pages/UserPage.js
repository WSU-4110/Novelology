import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserByUsername } from '../firebase'; // Function to fetch user data from Firestore

function UserPage() {
  const { username } = useParams();
  
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    console.log('UserPage component mounted'); // Log when the component mounts
    console.log('Fetching user data for:', username); // Log the username being fetched
    // Fetch user data based on name
    getUserByUsername(username).then((data) => {
      console.log('userData:', data); // Log userData to console
      setUserData(data);
    });
  }, [username]);

  console.log('userData:', userData); // Log userData to console

  return (
    <div>
      {userData ? (
        <div>
          <h2>{userData.username}</h2>
          <p>Email: {userData.email}</p>
          {userData.profilePicture && (
            <img src={userData.profilePicture} alt="Profile Picture" />
          )}
          {userData.bio && <p>Bio: {userData.bio}</p>}
          {/* Additional user data rendering */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserPage;
