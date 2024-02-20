import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Import your Firebase instance
import UserCard from './UserCard'; // Import the UserCard component

async function searchUsers(idQuery) {
    console.log('Searching for:', idQuery);
    const q = idQuery.trim();
    const results = [];

    if (q !== '') {
        const qRef = collection(db, 'usernames'); // Replace 'usernames' with your collection name
        try {
            const qSnapshot = await getDocs(qRef);
            console.log('Snapshot:', qSnapshot);
            qSnapshot.forEach(doc => {
                // Check if document ID starts with the query or contains the query
                if (doc.id.startsWith(q.toLowerCase()) || doc.id.includes(q)) { 
                    results.push({ id: doc.id, UID: doc.data().UID });
                }
            });
            console.log('Results:', results);
            return results;
        } catch (error) {
            console.error('Error searching users:', error);
            return [];
        }
    } else {
        return [];
    }
}


function Searchbar({ onSearch }) {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = async (event) => {
        const { value } = event.target;
        setQuery(value);

        if (value.trim() === '') {
            setSearchResults([]); // Clear search results
            console.log('Search results cleared.');
            return;
        }

        const results = await searchUsers(value);
        console.log('Search results:', results);
        setSearchResults(results);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (query.length > 0) {
            onSearch(query); // Pass the query value to the onSearch function
            console.log('Submitted query:', query);
        }
    };

    return (
        <div className="relative z-10">
            <form onSubmit={handleSubmit} className="flex items-center">
                <input 
                    type="text" 
                    value={query} 
                    onChange={handleChange} 
                    placeholder="Search..." 
                    className="px-3 py-2 border rounded-l-lg mr-2 focus:outline-none focus:ring focus:border-blue-300 flex-grow" 
                />
                <button 
                    type="submit" 
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Search
                </button>
            </form>
            {searchResults.length > 0 && query.trim() !== '' && (
                <ul className="dropdown bg-white border rounded shadow-lg w-64 absolute top-0 right-0 mt-12 z-50">
                    {searchResults.map((result) => (
                        <li key={result.id} className="p-2 hover:bg-gray-100">
                            <UserCard userId={result.UI} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Searchbar;
