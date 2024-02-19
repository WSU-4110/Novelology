import React, { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import UserCard from './UserCard';

const PopularUsers = () => {
  const [popularUsers, setPopularUsers] = useState([]);

  useEffect(() => {
    const fetchPopularUsers = async () => {
      try {
        console.log('Fetching popular users...');
        // Query users collection
        const usersRef = collection(db, 'users');
        const usersSnapshot = await getDocs(usersRef);

        // Map through each user document
        const usersData = usersSnapshot.docs.map(doc => {
          const userData = doc.data();
          const followersCount = userData.followers ? userData.followers.length : 0; // Calculate followers count
          return { id: doc.id, ...userData, followersCount }; // Include followersCount in user data
        });

        // Sort users by followers count in descending order
        const sortedUsers = usersData.sort((a, b) => b.followersCount - a.followersCount);
        console.log('PU - Sorted users:', sortedUsers);

        setPopularUsers(sortedUsers);
        console.log('PU - Popular users set:', popularUsers);
      } catch (error) {
        console.error('PU - Error fetching popular users:', error);
      }
    };

    fetchPopularUsers();
  }, []);

  return (
    <>
      <h2 className="text-xl font-bold">Popular Users</h2>
      <div className="flex flex-row gap-20">
        {popularUsers.slice(0, 3).map(user => (
          <UserCard key={user.id} userId={user.id} />
        ))}
      </div>
    </>
  );
}

export default PopularUsers;
