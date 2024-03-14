import axios from "axios";
import React, { useState, useEffect } from 'react';

export function useSearchAuthor(query) {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        axios.get('https://www.googleapis.com/books/v1/volumes?q=inauthor:' + query + '&orderBy=newest&maxResults=3')
            .then(res => {
                const items = res.data.items;
                const authorList = items.map(item => ({
                    id: item.id,
                    name: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author',
                    // Add other author information as needed
                }));
                setAuthors(authorList);
                console.log('Authors:', authorList);
            })
            .catch(err => console.error('Error fetching authors:', err));
    }, [query]);

    return authors;
}
