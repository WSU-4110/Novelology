import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { searchUsers } from '../functions/userSearch';

function Searchbar({ onSearch }) {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = async (event) => {
        const { value } = event.target;
        setQuery(value);

        if (value.trim() === '') {
            setSearchResults([]); // Clear search results if the query is empty
            return; // Exit early if the query is empty
        }

        const results = await searchUsers(value);
        setSearchResults(results);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (query.length > 0) {
            onSearch(query);
        }
    };

    return (
        <div className="relative">
            <form onSubmit={handleSubmit} className="flex items-center">
                <input type="text" value={query} onChange={handleChange} placeholder="Search..." className="px-3 py-2 border rounded-l-lg mr-2 focus:outline-none focus:ring focus:border-blue-300 flex-grow" />
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Search</button>
            </form>
            {searchResults.length > 0 && (
                <ul className="dropdown bg-white border rounded shadow-lg w-64 absolute top-0 right-0 mt-12">
                    {searchResults.map((user) => (
                        <li key={user.id} className="flex items-center p-2 hover:bg-gray-100">
                            <img src={user.profilePicture} alt={user.username} className="w-8 h-8 rounded-full mr-2" />
                            <div>
                                <strong>Name:</strong> {user.username} | <strong>Email:</strong> {user.email}
                                <Link to={`/users/${user.username}`} className="block text-blue-500">View Profile</Link>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Searchbar;
