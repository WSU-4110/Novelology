// Import searchUsers function
import { searchUsers } from './userSearch';

// Function to handle search with error handling and logging
export async function handleSearch(query, setSearchResults, setSearchStatus) {
    try {
        // Perform search using searchUsers function
        const results = await searchUsers(query);

        // Log the search results
        console.log("Handle search results:", results.map(user => ({ ...user })));

        // Update the search results and status
        setSearchResults(results);
        if (results.length > 0) {
            setSearchStatus(`Found ${results.length} user(s) matching "${query}"`);
        } else {
            setSearchStatus('No users found');
        }
    } catch (error) {
        // Handle errors by logging and updating the search status
        console.error("Error handling search:", error);
        setSearchResults([]); // Set search results to empty array if there's an error
        setSearchStatus('Error searching users');
    }
}
