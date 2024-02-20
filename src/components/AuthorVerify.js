import React,{useState} from 'react';
import axios from "axios";
import Onboarding from './Onboarding';

const AuthorVerify =() => {
    // var roleName = Role;
    // console.log("Is Author?: "+roleName);
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
          <h2 id= "author-heading">Author Verification</h2>
          <br />
          <div className="upload-id">
            <form encType="multipart/form-data">
              <label>
                <h3 class="verify-section-titles">Upload your govt. ID</h3>
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
            <button type="submit" onClick={searchAuthor}>Submit</button>
          </div>
          <div id="verified">
              <p>{ isAuthor? (
                <h3>You are an author!</h3>
              ):(
                <h3>You are not an author!</h3>
              )}</p>
          </div>
        </div>
      </>
    );
};

export default AuthorVerify;