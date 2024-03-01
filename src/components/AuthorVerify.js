import React,{useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import Onboarding from './user/Onboarding';
import "../styles/author-verify.css";

const AuthorVerify =() => {
  // const navigate = useNavigate();
    const [AuthorName,setAuthorName] = useState("");
    const [isAuthor,setIsAuthor] = useState(false);
    const searchAuthor = () => {
        axios.get('https://www.googleapis.com/books/v1/volumes?q=inauthor:'+AuthorName+'&orderBy=newest&maxResults=40')
            .then(res=>{
                const num = res.data.totalItems;
                if (num > 0) 
                    setIsAuthor(true);
                else {
                    console.log('No results found.');
                    setIsAuthor(false);
                }
            }).catch(err=>console.log(err));
    }
    
    return (
      <>
        <div className="verify-author">
          <h1 id= "author-heading">Please verify your author account.</h1>
          <br />
          <div className="upload-id">
            <form encType="multipart/form-data">
              <label>
                <h3  class="verify-section-titles">Upload your govt. ID</h3>
              </label>
              <input
                type="file"
                id="ID-input"
                name="ID-input"
                accept=" .pdf, image/*"
              />
            </form>
          </div>
          <br />
          <div className="author-name">
            <h3 class="verify-section-titles">Type your author name</h3>
            <input
              type="text"
              id="author-name"
              name="author-name"
              placeholder="Enter it here"
              onChange={(e) => setAuthorName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchAuthor();
                }
              }}
            />
            <br /> 
            <br />
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 
            focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full 
            text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 
            dark:focus:ring-blue-800" onClick={searchAuthor}>Submit</button>
          </div>
          <div id="verified">
              <p>{ isAuthor? (
                <div>
                <h3>You are verified as an author. Welcome!</h3>
                <Link to="/">Go to homepage</Link>
                </div>
              ):(
                <h3>You are not found in the system. Try Again!</h3>
              )}</p>
              
          </div>

        </div>
      </>
    );
};

export default AuthorVerify;