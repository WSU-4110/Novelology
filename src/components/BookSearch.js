import React,{useState} from "react";
import Card from "./Card.js";
import axios from "axios";

const BookSearch = () => {
    const [bSearch,setBSearch] = useState("");
    const [booksData,setBooksData] = useState([]);
    const[bGenre,setBGenre] = useState("");
    const[bAuthor,setBAuthor] = useState("");
    
    
    const searchBook = () => {
        axios.get('https://www.googleapis.com/books/v1/volumes?q='+bSearch+'&key='+process.env.REACT_APP_GOOGLE_BOOKS_SEARCH+'&maxResults=40')
            .then(res=>{
                const num = res.data.totalItems;
                if (num > 0) 
                    setBooksData(res.data.items)
                else console.log('No results found.');
            }).catch(err=>console.log(err));
    }
    const searchGenres = () => {
        axios.get('https://www.googleapis.com/books/v1/volumes?q=subject:'+bGenre+'&orderBy=newest&maxResults=40')
            .then(res=>{
                const num2 = res.data.totalItems;
                if (num2 > 0) 
                    setBooksData(res.data.items)
                else console.log('No results found.');
            }).catch(err=>console.log(err));
    }
    const searchbyAuthor = () => {
        axios.get('https://www.googleapis.com/books/v1/volumes?q=inauthor:'+bAuthor+'&orderBy=newest&maxResults=40')
            .then(res=>{
                const num3 = res.data.totalItems;
                if (num3 > 0) 
                    setBooksData(res.data.items)
                else console.log('No results found.');
            }).catch(err=>console.log(err));
    }

    
    const retrieveBooksData = () => {
        const form = document.getElementById("bookSearchForm");
        const searchInput = document.getElementById("searchBooksInput");
        const searchType = document.getElementById("searchTypes");
        if (searchType.value == "by-title") {
          setBSearch(searchInput.value);
          searchBook();
        } else if (searchType.value == "by-genre") {
            setBGenre(searchInput.value);
            searchGenres(); 
        } else if (searchType.value == "by-author") {
            setBAuthor(searchInput.value);
            searchbyAuthor();
        }
      }
    return (
      <>
        <div className="main">
          <h3>Find your book!</h3>
          <form
            id="bookSearchForm"
            onSubmit={(e) => {
              e.preventDefault();
              retrieveBooksData();
            }}
          >
            <input
              type="text"
              id="searchBooksInput"
              placeholder="Search for a book"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  retrieveBooksData();
                }
              }}
            />
            <select name="searchBooks" id="searchTypes">
              <option value="by-title">Title</option>
              <option value="by-genre">Genre</option>
              <option value="by-author">Author</option>
            </select>
            <button type="submit">Submit</button>
          </form>

          <br></br>
          <div className="card-container">{<Card book={booksData} />}</div>
        </div>
      </>
    );
{/* 
          <div className="search">
            <div className="with-book">
              <input
                type="text"
                placeholder="Search for a book"
                value={bSearch}
                onChange={(e) => setBSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    searchBook();
                  }
                }}
              />
              <button onClick={searchBook}>Search</button>
            </div>

            <div className="with-genre">
              <input
                type="text"
                placeholder="Book Search with genre"
                value={bGenre}
                onChange={(e) => setBGenre(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    searchGenres();
                  }
                }}
              />
              <button onClick={searchGenres}>Search</button>
            </div>

            <div className="with-author">
              <input
                type="text"
                placeholder="Author's books search"
                value={bAuthor}
                onChange={(e) => setBAuthor(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    searchbyAuthor();
                  }
                }}
              />
              <button onClick={searchbyAuthor}>Search</button>
            </div>
          </div>
        </div> */}
        
    
};

export default BookSearch;