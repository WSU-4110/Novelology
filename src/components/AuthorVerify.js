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
        <div className="flex flex-col text-3xl bg-white">
          <div className="flex flex-col justify-center items-start px-16 py-px w-full text-white bg-maroon max-md:px-5 max-md:max-w-full">
            <div className="flex gap-5 justify-between ml-44 max-w-full w-[602px] max-md:flex-wrap">
            <img
                    loading="lazy"
                    srcSet={require("../assets/novelology_newlogo.png")}
                    style={{ height: "3em", width: "3em" }}
                    className="self-stretch aspect-[1.08] w-[85px]"
                  />
              <div className="flex-auto my-auto pl-25">Author Verification</div>
            </div>
          </div>
          <div className="flex overflow-hidden relative flex-col justify-center w-full min-h-[928px] max-md:max-w-full">
          <img
            loading="lazy"
            srcSet={require("../assets/author-verify.png")}
            style={{ height: "40em", width: "55em" }}
            className="object-cover absolute inset-0 size-full"
          />
            {/* <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/6dfbf193ca937b2b9f9ee5636a9e48ab1c63dd5b5f021f258027b29a81f49199?apiKey=00dd8100ff0f48749da2736e824a4b02&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/6dfbf193ca937b2b9f9ee5636a9e48ab1c63dd5b5f021f258027b29a81f49199?apiKey=00dd8100ff0f48749da2736e824a4b02&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/6dfbf193ca937b2b9f9ee5636a9e48ab1c63dd5b5f021f258027b29a81f49199?apiKey=00dd8100ff0f48749da2736e824a4b02&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/6dfbf193ca937b2b9f9ee5636a9e48ab1c63dd5b5f021f258027b29a81f49199?apiKey=00dd8100ff0f48749da2736e824a4b02&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/6dfbf193ca937b2b9f9ee5636a9e48ab1c63dd5b5f021f258027b29a81f49199?apiKey=00dd8100ff0f48749da2736e824a4b02&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/6dfbf193ca937b2b9f9ee5636a9e48ab1c63dd5b5f021f258027b29a81f49199?apiKey=00dd8100ff0f48749da2736e824a4b02&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/6dfbf193ca937b2b9f9ee5636a9e48ab1c63dd5b5f021f258027b29a81f49199?apiKey=00dd8100ff0f48749da2736e824a4b02&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/6dfbf193ca937b2b9f9ee5636a9e48ab1c63dd5b5f021f258027b29a81f49199?apiKey=00dd8100ff0f48749da2736e824a4b02&"
              className="object-cover absolute inset-0 size-full"
            /> */}
            <div className="flex overflow-hidden relative flex-col items-center px-16 pt-14 pb-20 w-full min-h-[928px] max-md:px-5 max-md:max-w-full">
              <div className="flex relative flex-col mb-20 max-w-full w-[929px] max-md:mb-10">
                <div className="self-center text-black text-[1em] max-md:max-w-full">
                  Please verify your Author status
                </div>
                <div className="flex justify-center items-center px-16 py-14 mt-12 text-center text-white shadow-sm bg-maroon max-md:px-5 max-md:mt-10 max-md:max-w-full">
                  <div className="flex flex-col items-center max-w-full w-[639px]">
                    <div className="text-sm">
                      <div className="self-stretch max-md:max-w-full">
                        Upload your government ID:
                        <br />
                        (Accepted: State ID, Driver’s License, Passport)
                      </div>
                      <div className="upload-id text-center">
                        <form encType="multipart/form-data">
                          <input
                            type="file"
                            id="ID-input"
                            name="ID-input"
                            accept=" .pdf, image/*"
                          />
                        </form>
                      </div>
                      <div className="mt-40 whitespace-nowrap max-md:mt-10">
                        Enter your author name:
                      </div>
                      <div className="author-name">
                        <h3 class="verify-section-titles">
                          Type your author name
                        </h3>
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
                      </div>
                    </div>
                    <button
                      type="button"
                      className="justify-center text-base text-black p-2.5 mt-28 whitespace-nowrap bg-lightcolor hover:lightcolor hover:opacity-40 rounded-3xl max-md:mt-10"
                      onClick={searchAuthor}
                    >
                      Submit
                    </button>
                    <div id="verified">
            <p>
              {isAuthor ? (
                <div>
                  <h3>You are verified as an author. Welcome!</h3>
                  <Link to="/">Go to homepage</Link>
                </div>
              ) : (
                <h3>You are not found in the system. Try Again!</h3>
              )}
            </p>
          </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>

        {/* <div className="verify-author">
          <h1 id="author-heading">Please verify your author account.</h1>
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
            <br />
            <br />
            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 
            focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full 
            text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 
            dark:focus:ring-blue-800"
              onClick={searchAuthor}
            >
              Submit
            </button>
          </div>
          <div id="verified">
            <p>
              {isAuthor ? (
                <div>
                  <h3>You are verified as an author. Welcome!</h3>
                  <Link to="/">Go to homepage</Link>
                </div>
              ) : (
                <h3>You are not found in the system. Try Again!</h3>
              )}
            </p>
          </div>
        </div> */}
      </>
    );
};

export default AuthorVerify;