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
                <h3>Book Search</h3>
                <div className="search">
                    <input type="text" placeholder="Search Book..." value={bSearch} onChange={e=>setBSearch(e.target.value)} onKeyDown ={searchBook} />
                    {/* <button>Search</button> */}
                
                    <button 
                    type="submit" 
                    className="px-4 py-1 bg-#F4D0A7-500 text-black sqauare-lg hover:bg-#f7e3cb-600 focus:outline-none focus:bg-#f7e3cb-600"
                >
                    Search
                </button>
                
                
                </div>
            </div>
            <div className="card-container">
                {<Card book={booksData}/>}
                
            </div>
        </>
     )
};

export default BookSearch;

            