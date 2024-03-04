import * as React from "react";

const LoggedOutNavBar=()=> {
  const handleClick=()=> {
    window.location.href = '/sign_in';

  }
    return(
        <>
      <div className="flex flex-col bg-lightcolor">
      <div className="flex z-10 flex-col pb-7 w-full max-md:max-w-full">
        <div className="flex justify-center items-center px-16 py-1.0 w-full whitespace-nowrap bg-maroon max-md:px-5 max-md:max-w-full ">
          <div className="flex gap-5 justify-between w-full max-w-[1097px] max-md:flex-wrap max-md:max-w-full">
            <div className="flex gap-4 justify-between items-center max-md:flex-wrap max-md:max-w-full">
              <img
              
                loading="lazy"
                srcSet={require("../assets/novelology_newlogo.png")}
                style={{ height: "5em", width: "5em" }}
                className="self-stretch aspect-[1.08] w-[85px]"
              />
              <div className="flex gap-3 self-stretch my-auto text-base">
                <input
                  type="text"
                  id="search_input"
                  className="bg-lightcolor border border-gray-300 text-gray-900 text-sm rounded-full 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your search title"
                />

                <button
                  type="button"
                  className="text-gray-900 bg-lightcolor border border-gray-300 focus:outline-none 
              hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 
              dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 
              dark:focus:ring-gray-700"
                >
                  Search
                </button>
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
                  onClick={handleClick}
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
    );
};

export default LoggedOutNavBar;