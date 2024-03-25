import axios from 'axios';
import {useState, useEffect} from 'react';

export const SearchISBN = (query) => {
    const [booksData,setBooksData] = useState([]);

    useEffect(()=>{
        axios.get('https://www.googleapis.com/books/v1/volumes?q=isbn:'+query)
        .then(res=>{
            const num = res.data.totalItems;
            if (num > 0) 
                setBooksData(res.data.items)
            else console.log('No results found.');
        }).catch(err=>console.log(err));
    },[query]);
    

    return booksData;
}