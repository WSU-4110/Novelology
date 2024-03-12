import {useState} from 'react'
import axios from 'axios';

const SearchISBN = (query) => {
    const [booksData,setBooksData] = ([]);

    axios.get('https://www.googleapis.com/books/v1/volumes?q=isbn:'+query)
        .then(res=>{
            const num = res.data.totalItems;
            console.log(num);
            if (num > 0) {
                setBooksData(res.data.items);
                console.log("isbn ran");
            }
            else console.log('No results found.');
        }).catch(err=>console.log(err));

    return booksData;
}
export default SearchISBN;