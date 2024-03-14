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
                    className="px-1 py-1 border square-l-lg mr-3 focus:outline-none focus:ring focus:border-blue-300 flex-grow"
                />
                <button
                    type="submit"
                    className="px-4 py-1 bg-#F4D0A7-500 text-black square-lg hover:bg-#f7e3cb-600 focus:outline-none focus:bg-#f7e3cb-600"
                >
                    Search
                </button>
            </form>
        </div>
    );
}

export default Searchbar;
