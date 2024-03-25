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
      <div className='w-5/6 flex flex-col mx-auto'>
          <h2 className="text-xl font-bold mb-4 text-gray-800 pt-4 mx-auto">Popular Users</h2>
          {loading && <p className="text-gray-600">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex flex-col gap-4 justify-start w-full">
              {popularUsers.slice(0, 3).map(user => (
                  <UserCard key={user.id} userId={user.id} />
              ))}
          </div>
      </div>
    </>
  );
}

export default PopularUsers;
