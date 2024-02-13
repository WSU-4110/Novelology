import React,{useState} from "react";
import Card from "./Card.js";
import axios from "axios";

const BookSearch = () => {
    const [bSearch,setBSearch] = useState("");
    const [booksData,setBooksData] = useState([]);
    const searchBook = (e)=>{
        if (e.key === "Enter") {
            axios.get('https://www.googleapis.com/books/v1/volumes?q='+bSearch+'&key=AIzaSyDMNfJ4zzUox2lqwWG2CzE1BdOkCdKsJQc'+'&maxResults=40')
            .then(res=>setBooksData(res.data.items)).catch(err=>console.log(err));
        }
    }
    return (
        
        <>
            <div className="main">
                <h3>Find your book!</h3>
                <div className="search">
                    <input type="text" placeholder="Search for a book" value={bSearch} onChange={e=>setBSearch(e.target.value)} onKeyDown ={searchBook} />
                    <button>Search</button>
                </div>
            </div>
            <div className="card-container">
                {<Card book={booksData}/>}
                
            </div>
        </>
     )
};

export default BookSearch;