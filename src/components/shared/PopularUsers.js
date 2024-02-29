import React, { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import UserCard from '../user/UserCard';

const PopularUsers = () => {
  // Replace the class-based component with a functional component
  const [popularUsers, setPopularUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch popular users from Firestore
  useEffect(() => {
    const fetchPopularUsers = async () => {
      try {
        console.log('Fetching popular users...');
        const usersRef = collection(db, 'users');
        const usersSnapshot = await getDocs(usersRef);

        const usersData = usersSnapshot.docs.map(doc => {
          const userData = doc.data();
          const followersCount = userData.followers ? userData.followers.length : 0;
          return { id: doc.id, ...userData, followersCount };
        });

        // Sort users by followers count in descending order
        const sortedUsers = usersData.sort((a, b) => b.followersCount - a.followersCount);
  
        setPopularUsers(sortedUsers);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('PU - Error fetching popular users:', error);
        setError('Failed to fetch popular users. Please try again later.');
        setLoading(false); // Set loading to false on error
      }
    };

    fetchPopularUsers();
  }, []); // Run once on component mount

  return (
    <>
      <h2 className="text-xl font-bold">Popular Users</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="flex flex-row gap-20">
        {popularUsers.slice(0, 3).map(user => (
          <UserCard key={user.id} userId={user.id} />
        ))}
      </div>
    </>
  );
}

export default PopularUsers;
