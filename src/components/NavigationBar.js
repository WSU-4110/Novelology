

import {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { handleLogout } from '../functions/Auth';
import SideBar,{SideBarItem} from './SideBar.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faPlus, faSignOutAlt, faSignInAlt, faPersonCircleQuestion, faBookBookmark, faGear, faBell } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Searchbar from './shared/Searchbar.js';
import { handleSearch } from '../functions/searchFunctions';
import { Tooltip } from 'react-tooltip';
import { onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect } from 'react';
import { collection } from 'firebase/firestore';


import "../styles/sideBar.css"
export default function NavigationBar() {
  const [user, setUser] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchStatus, setSearchStatus] = useState('');
  const [newNotifications, setNewNotifications] = useState(false);
  const location = useLocation();

  // Fetch notifications from the database
  // subscribe to the notifications collection of the current user
  // If there are new notifications, setNewNotifications to true
  // if there are no new notifications, setNewNotifications to false

  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
          setUser(user);
      });
      return () => unsubscribe();
  }, []);

  if (auth.currentUser) {
      const subscribe = onSnapshot(collection(db, 'users', auth.currentUser.uid, 'notifications'), (snapshot) => {
          // if there are notifications where "read" is false, setNewNotifications to true
          snapshot.forEach((doc) => {
              if (doc.data().read === false) {
                  setNewNotifications(true);
              }
          });

          if (snapshot.empty) {
              setNewNotifications(false);
          }

      });
  }


  const handleSignIn=()=> {
    window.location.href = '/sign_in';
  }
  const handleSignUp=()=> {
    window.location.href = '/Register';
  }
    return (
      <>
      {user ? (
        //When user is logged in
        <>
        <div className="fixed left-0 top-0 bottom-0 bg-white w-[5.2rem] z-10">

        <SideBar>
        <Link to="/" data-tip="Home" data-for="home-tooltip">
          <SideBarItem icon={<FontAwesomeIcon icon={faHome}/>} text="Home" />
        </Link>
        <Link to="/profile" data-tip="Profile" data-for="profile-tooltip">
          <SideBarItem icon={<FontAwesomeIcon icon={faUser}/>} text="Profile"
           />
        </Link>
        <Link to="/notifications" data-tip="Notifications" data-for="notifications-tooltip">
          <SideBarItem icon={<FontAwesomeIcon icon={faBell}/>} text="Notifications"  alert={newNotifications} />
        </Link>
        <Link to="/create-post" data-tip="Create a Post" data-for="create-post-tooltip">
          <SideBarItem icon={<FontAwesomeIcon icon={faPlus}/>} text="Create Post" />
        </Link>
        <Link to="/bookList" data-tip="Open your book lists" data-for="book-lists-tooltip">
          <SideBarItem icon={<FontAwesomeIcon icon={faBookBookmark} />} text="Book Lists" />
          </Link>
          <SideBarItem icon={<FontAwesomeIcon icon={faPersonCircleQuestion} />} text="Reader Q&A" />
        <Link to="/settings" data-tip="Settings" data-for="settings-tooltip">
          <SideBarItem icon={<FontAwesomeIcon icon={faGear}/>} text="Settings" />
          </Link>

        </SideBar>
        </div>

        <div className="ml-20">
        <div className="flex justify-center items-center px-16 py-1.0 w-full text-base whitespace-nowrap bg-maroon max-md:px-5 max-md:max-w-full">
        
        <div className="flex gap-5 justify-between items-center w-full max-w-[1080px] max-md:flex-wrap max-md:max-w-full">
        
        <Link to="/">
        <img
                    loading="lazy"
                    srcSet={require("../assets/novelology_newlogo.png")}
                    style={{ height: "5em", width: "5em" }}
                    className="self-stretch aspect-[1.08] w-[85px]"
                  />
        </Link>
        {location.pathname !== '/search/' && (
                  <div className="flex my-auto text-base gap-3">
                    <Searchbar onSearch={(query) => handleSearch(query, setSearchResults, setSearchStatus)} />
                  </div>
                )}
          <button className="text-gray-900 bg-lightcolor border border-gray-300 focus:outline-none 
            hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 
            dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 
            dark:focus:ring-gray-700" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </div>
      </div>
      </>
      ):(
        //When user is logged out
        <>
        <div className="flex flex-col bg-lightcolor">
          <div className="flex z-10 flex-col pb-0 w-full max-md:max-w-full">
            <div className="flex justify-center items-center px-16 py-1.0 w-full whitespace-nowrap bg-maroon max-md:px-5 max-md:max-w-full ">
              <div className="flex gap-5 justify-between w-full max-w-[1097px] max-md:flex-wrap max-md:max-w-full">
                <div className="flex gap-4 justify-between items-center max-md:flex-wrap max-md:max-w-full">
                  <img
                    loading="lazy"
                    srcSet={require("../assets/novelology_newlogo.png")}
                    style={{ height: "5em", width: "5em" }}
                    className="self-stretch aspect-[1.08] w-[85px]"
                  />
                  <div className="flex my-auto text-base gap-3">
                   

                    <check>
                      <form class="flex flex-col gap-3 md:flex-row">
                        <select
                          id="searchType"
                          name="searchType"
                          class="w-1/5 h-10 border-2 border-maroon bg-lightcolor focus:outline-none focus:border-maroon text-black rounded-full px-2 md:px-3 py-0 md:py-1 tracking-wider"
                        >
                          <option value="All" selected="">
                            All
                          </option>
                          <option value="User">User search</option>
                          <option value="BookName">Book Name</option>
                          <option value="ByGenre">Book by Genre</option>
                          <option value="ByAuthor">Book by Author</option>
                        </select>

                        <div class="flex w-4/5 gap-2">
                          <input
                            type="text"
                            id="search_input"
                            className="bg-lightcolor border border-gray-300 text-gray-900 text-sm rounded-full 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter your search title"
                          />

                          <button
                            type="submit"
                            className="flex bg-white border border-gray-300 p-4 text-gray-900 rounded-full"
                          >
                            Search
                          </button>
                        </div>
                      </form>

                    </check>
                  </div>
                  <div className="flex gap-10 justify-between self-stretch my-auto text-xl text-white">
                    <button type="button">Home</button>
                    <button type="button">About</button>
                    <button type="button">Feed</button>
                  </div>
                </div>
                <div className="flex gap-5 justify-between my-auto text-xl text-black">
                  <div className="grow justify-center px-4 py-3.5 bg-[linear-gradient(0deg,#F4F3EE_0%,#F4F3EE_100%),#89023E] rounded-[50px]">
                    <button
                      type="button"
                      className="text-gray-900 bg-lightcolor border border-gray-300 focus:outline-none 
              hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 
              dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 
              dark:focus:ring-gray-700"
                      onClick={handleSignIn}
                    >
                      {/* <Link to="/">Go to homepage</Link> */}
                      Sign in
                    </button>
                  </div>
                  <div className="grow justify-center px-3 py-3.5 bg-[linear-gradient(0deg,#F4F3EE_0%,#F4F3EE_100%),#89023E] rounded-[50px]">
                    <button
                      type="button"
                      className="text-gray-900 bg-lightcolor border border-gray-300 focus:outline-none 
              hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 
              dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 
              dark:focus:ring-gray-700"
                      onClick={handleSignUp}
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
      )}
        




        
      </>
    );
};

