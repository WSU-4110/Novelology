import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Card from '../components/Card';
import UserCard from '../components/user/UserCard';

async function searchUsers(searchQuery) {
    
    // Fetch the user data from the database
    const q = typeof searchQuery === 'string' ? searchQuery.trim() : '';
    const results = [];

    // query is not empty
    if (q !== '') {
        const qRef = collection(db, 'usernames');
        try {
            // snapshot of the usernames collection
            const qSnapshot = await getDocs(qRef);
            
            qSnapshot.forEach(doc => {
                // Check if document ID starts with the query or contains the query
                if (doc.id.startsWith(q.toLowerCase()) || doc.id.includes(q)) { 
                    results.push({ id: doc.id, UID: doc.data().UID });
                }
            });
            return results;
        } catch (error) {
            console.error('Error searching users:', error);
            return [];
        }
    } else {
        return [];
    }
}



const SearchResults = () => {
    // States for search results, search query, selected filter, selected genres, and users
    const [searchResults, setSearchResults] = useState({ books: [] });
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [users, setUsers] = useState([]);


    // select genre(s) component
    const SelectGenres = ({ selectedGenres: selectedGenresProp, setSelectedGenres: setSelectedGenresProp }) => {
        const genres = ['Horror', 'Fiction', 'Romance', 'Mystery', 'Fantasy']; // Example genres
    
        // add the genre to the selectedGenres array
        const handleGenreSelect = genre => {
            setSelectedGenresProp(prevGenres => [...prevGenres, genre]);
        };
    
        // for each item in the selectedGenres array, remove the genre from the array
        const handleGenreUnselect = genre => {
            setSelectedGenresProp(prevGenres => prevGenres.filter(item => item !== genre));
        };
    
        // Display the genres as buttons
        return (
            <div>
                <h2 className="text-lg font-semibold mb-4">Select Genres</h2>
                <div className="mb-2">
                    {genres.map(genre => (
                        <button
                            key={genre}
                            className={`mr-2 mb-2 border rounded px-3 py-1 ${selectedGenresProp.includes(genre) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => selectedGenresProp.includes(genre) ? handleGenreUnselect(genre) : handleGenreSelect(genre)}
                        >
                            {genre}
                        </button>
                    ))}
                </div>
            </div>
        );
    };
    
    useEffect(() => {

        console.log('selectedGenres:', selectedGenres);
        const query = localStorage.getItem('searchQuery') || '';
        const filters = localStorage.getItem('searchFilters');
        const defaultFilter = filters ? filters.split(',')[0] : 'all';
        
        setSearchQuery(query);
        setSelectedFilter(defaultFilter);

        // call performSearch with the selectedGenres
        performSearch(query, defaultFilter, selectedGenres); // Include selectedGenre in the call to performSearch
    }, [selectedGenres]); // Empty dependency array ensures useEffect runs only once on component mount

    const performSearch = async (query, filter, genres) => {
        const encodedQuery = encodeURIComponent(query);
        let apiUrl = '';
        let genreQuery = genres && genres.length > 0 ? genres.join('+') : '';
        let bookResults = [];
        let userResults = [];
    
        // based on the filter, set the API URL accordingly
        if (filter === 'all' || filter === 'titles' || filter === 'authors' || filter === 'genre') {
            apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodedQuery}${filter === 'genre' ? '+subject:' + genreQuery : ''}&orderBy=newest&maxResults=3`;
    
            try {
                const res = await axios.get(apiUrl);
                console.log('API response:', res);
                if (res.data && res.data.items) {
                    bookResults = res.data.items; // No longer doing the map here
                  }
            } catch (err) {
                console.error('Error fetching books:', err);
            }
        }
    
        if (filter === 'all' || filter === 'users') {
            try {
                userResults = await searchUsers(query);
            } catch (err) {
                console.error('Error fetching users:', err);
            }
        }
    
        // Save the search results to local storage
        localStorage.setItem('lastSearchResults', JSON.stringify({ books: bookResults, users: userResults }));
    
        setSearchResults({ books: bookResults, users: userResults });
    };
    
    
    const handleFilterChange = event => {
        setSelectedFilter(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        performSearch(searchQuery, selectedFilter, selectedGenres); // Include selectedGenre in the call to performSearch
    };

    return (
        <div className="flex">
            {/* Display search results */}
            <div className="w-3/4 p-6">
                <h1 className="text-xl font-bold mb-4">Search Results</h1>
                <form onSubmit={handleSubmit} className="mb-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border border-gray-400 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 ml-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                        Search
                    </button>
                </form>
                {searchResults && searchResults.books && (selectedFilter === 'all' || selectedFilter === 'titles') ? (
                    <div className="flex flex-wrap -m-4">
                        <Card book={searchResults.books} />
                    </div>
                    ) : (selectedFilter !== 'users' && (
                    <p>No book search results found.</p>
                ))}

                
                {searchResults && searchResults.users && searchResults.users.length > 0 ? (
                <div className="flex flex-wrap -m-4">
                    {searchResults.users.map((user) => (
                    <UserCard key={user.UID} user={user} />
                    ))}
                </div>
                ) : (
                <p>No user search results found.</p>
                )}
            </div>
    
            {/* Sidebar with search filters */}
            <div className="w-1/4 p-6">
                <h2 className="text-lg font-semibold mb-4">Show results for</h2>
                <SelectGenres selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} />
    
                <div className="mb-2">
                    <input type="radio" id="all" name="filter" value="all" onChange={handleFilterChange} checked={selectedFilter === 'all'} className="mr-2 cursor-pointer" />
                    <label htmlFor="all" className="cursor-pointer">All</label>
                </div>
                <div className="mb-2">
                    <input type="radio" id="titles" name="filter" value="titles" onChange={handleFilterChange} checked={selectedFilter === 'titles'} className="mr-2 cursor-pointer" />
                    <label htmlFor="titles" className="cursor-pointer">Titles</label>
                </div>
                <div className="mb-2">
                    <input type="radio" id="authors" name="filter" value="authors" onChange={handleFilterChange} checked={selectedFilter === 'authors'} className="mr-2 cursor-pointer" />
                    <label htmlFor="authors" className="cursor-pointer">Authors</label>
                </div>
                <div className="mb-2">
                    <input type="radio" id="users" name="filter" value="users" onChange={handleFilterChange} checked={selectedFilter === 'users'} className="mr-2 cursor-pointer" />
                    <label htmlFor="users" className="cursor-pointer">Users</label>
                    </div>
            </div>
        </div>
    );
    
};

export default SearchResults;
