import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Searchbar({ onSearch }) {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
      
        //save the searchQuery to local storage so that it can be accessed by the search results page
        localStorage.setItem('searchQuery', searchQuery);
        localStorage.setItem('searchFilters', 'all');
        navigate(`/search/?q=${searchQuery}`);
    };

    return (
        <div className="flex w-10 z-0">
            <form onSubmit={handleSubmit} className="flex items-center">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search..."
                    className="px-1 py-1 border square-l-lg mr-3 bg-lightcolor rounded-xl focus:outline-none focus:ring focus:border-maroon flex-grow"
                />
                <button
                    type="submit"
                    className="flex text-gray-900 bg-lightcolor border border-gray-300 focus:outline-none 
                    hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 
                    dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 
                    dark:focus:ring-gray-700"
                                                >
                    Search
                </button>
            </form>
        </div>
    );
}

export default Searchbar;
