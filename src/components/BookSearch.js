import React,{useState} from "react";
import Card from "./Card.js";
import axios from "axios";

const BookSearch = () => {
    const [bSearch,setBSearch] = useState("");
    const [booksData,setBooksData] = useState([]);
    const[bGenre,setBGenre] = useState("");
    const[bAuthor,setBAuthor] = useState("");
    
    
    const searchBook = () => {
        axios.get('https://www.googleapis.com/books/v1/volumes?q='+bSearch+'&key='+process.env.REACT_APP_GOOGLE_BOOKS_SEARCH+'&maxResults=10')
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
        <center>
        <div className="main">
          <h3 class="font-semibold">Find your book!</h3>
          <form
            id="bookSearchForm"
            onSubmit={(e) => {
              e.preventDefault();
              retrieveBooksData();
            }}
          >
            <input
               type="search"
               class="relative m-0 block min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
               placeholder="Search"
              
              id="searchBooksInput"
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
            
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 
                            focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 
                            text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </form>

          <br></br>
          <div className="card-container">{<Card book={booksData} />}</div>
        </div>
        </center>
      </>
    );

        
    
};

export default BookSearch;

            
