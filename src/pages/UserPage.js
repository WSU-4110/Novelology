
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserByUsername } from './api'; // Function to fetch user data from Firestore

function UserPage() {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data based on username
    getUserByUsername(username).then((data) => setUserData(data));
  }, [username]);

  return (
    <div>
      {userData ? (
        <div>
          <h2>{userData.name}</h2>
          <p>Email: {userData.email}</p>
          {/* Additional user data rendering */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserPage;