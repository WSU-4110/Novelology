import { useState, useEffect } from 'react';
import axios from 'axios';

export function useSearchBook(query) {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        // Check if the query is empty or undefined, and handle it gracefully
        if (!query) {
            setBooks([]);
            return;
        }

        // Encode the query parameter to ensure proper URL formatting
        const encodedQuery = encodeURIComponent(query);

        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${encodedQuery}&orderBy=newest&maxResults=3`)
            .then(res => {
                const items = res.data.items;
                const bookList = items.map(item => ({
                    id: item.id,
                    title: item.volumeInfo.title,
                    authors: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author',
                    // Add other book information as needed
                }));
                setBooks(bookList);
                console.log('Books:', bookList);
            })
            .catch(err => {
                console.error('Error fetching books:', err);
                // Handle the error here if needed, e.g., show a notification to the user
            });
    }, [query]);

    // Return the books state only
    return books;
}
