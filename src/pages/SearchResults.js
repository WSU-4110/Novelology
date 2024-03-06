import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  fetchUIDwithUsername  from '../functions/fetchUIDwithUsername';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

async function searchUsers(searchQuery) {
    console.log('Searching for:', searchQuery);
    const q = typeof searchQuery === 'string' ? searchQuery.trim() : '';
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



const SearchResults = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [selectedGenres, setSelectedGenres] = useState([]); // State to hold the selected genres

    const SelectGenres = ({ selectedGenres: selectedGenresProp, setSelectedGenres: setSelectedGenresProp }) => {
        const genres = ['Horror', 'Fiction', 'Romance', 'Mystery', 'Fantasy']; // Example genres
    
        const handleGenreSelect = genre => {
            console.log('Selected Genre:', genre);
            setSelectedGenresProp(prevGenres => [...prevGenres, genre]);
        };
    
        const handleGenreUnselect = genre => {
            setSelectedGenresProp(prevGenres => prevGenres.filter(item => item !== genre));
        };
    
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

        performSearch(query, defaultFilter, selectedGenres); // Include selectedGenre in the call to performSearch
    }, []); // Empty dependency array ensures useEffect runs only once on component mount

    const performSearch = async (query, filter, genres) => {
        const encodedQuery = encodeURIComponent(query);
        let apiUrl = '';
    
        console.log('genres:', genres);

        if (filter === 'titles') {
            // Check if genres are selected and construct the query accordingly
            let genreQuery = genres && genres.length > 0 ? genres.join('+') : '';
            
            console.log('genreQuery:', genreQuery);
            apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodedQuery}+subject:${genreQuery}&orderBy=newest&maxResults=3`;
        } else if (filter === 'authors') {
            apiUrl = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${encodedQuery}&orderBy=newest&maxResults=3`;
        } else if (filter === 'genre') {
            // Include genreQuery for the 'genre' filter as well
            let genreQuery = '';
            if (genres && genres.length > 0) {
                genreQuery = genres.join('+');
            }
            console.log('genreQuery:', genreQuery);
            apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodedQuery}+subject:${genreQuery}&orderBy=newest&maxResults=3`;
        }
    
        if (apiUrl) {
            console.log('API URL:', apiUrl);
            axios.get(apiUrl)
                .then(res => {
                    console.log('API response:', res); // Log the entire response object
                    if (res.data && res.data.items) {
                        const items = res.data.items;
                        let resultList = [];
                        if (filter === 'all' || filter === 'titles') {
                            resultList = items.map(item => ({
                                id: item.id,
                                title: item.volumeInfo.title,
                                authors: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author',
                            }));
                        } else if (filter === 'authors') {
                            resultList = items.map(item => ({
                                id: item.id,
                                name: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author',
                            }));
                        } else if (filter === 'genre') {
                            resultList = items.map(item => ({
                                id: item.id,
                                title: item.volumeInfo.title,
                                authors: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author',
                            }));
                        }
                        setSearchResults(resultList);
                    }
                })
                .catch(err => console.error('Error fetching data:', err));
        } else {
            // handle other search filters
            if (filter === 'users') {
                // Handle user search by searching usernames in firebase
                console.log('Searching for users...' + query);
                const uid = await fetchUIDwithUsername(query.toLowerCase());
                console.log('UID:', uid);
                searchUsers(uid);
            }
        }
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
                {searchResults && searchResults.length > 0 ? (
    <ul>
        {searchResults.map((result, index) => (
            <li key={index} className="mb-2">
                {result.title}
            </li>
        ))}
    </ul>
) : (
    <p>No search results found.</p>
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
