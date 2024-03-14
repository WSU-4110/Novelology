import axios from 'axios';

export const searchGenre = (query) => {
    const [booksData,setBooksData] = ([]);

    axios.get('https://www.googleapis.com/books/v1/volumes?q=subject:'+query+'&orderBy=newest&maxResults=40')
        .then(res=>{
            const num = res.data.totalItems;
            if (num > 0) 
                setBooksData(res.data.items)
            else console.log('No results found.');
        }).catch(err=>console.log(err));

    return booksData;
}