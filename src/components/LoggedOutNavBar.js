import * as React from "react";

const LoggedOutNavBar=()=> {
  const handleClick=()=> {
    window.location.href = '/sign_in';
  }
  document.addEventListener("DOMContentLoaded", function () {
    const navigateButton = document.getElementById("dropdown-button");

    navigateButton.addEventListener("click", function () {
      // Scroll to the target div
      document.getElementById("dropdown").scrollIntoView({ behavior: "smooth" });
    });
  });
  
    return (
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
                    {/* <input
                  type="text"
                  id="search_input"
                  className="bg-lightcolor border border-gray-300 text-gray-900 text-sm rounded-full 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your search title"
                /> */}

                    <check>
                      
                      <form class="flex flex-col gap-3 md:flex-row">
                      <select
                          id="pricingType"
                          name="pricingType"
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
                            className="flex text-gray-900 bg-lightcolor border border-gray-300 focus:outline-none 
              hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 
              dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 
              dark:focus:ring-gray-700"
                          >
                            Search
                          </button>

                        </div>
                        
                      </form>
                      {/* <form class="max-w-lg mx-auto">
    <div class="flex">
        <label for="search-dropdown" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
        <button id="dropdown-button" data-dropdown-toggle="dropdown" class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">All <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
  </svg></button> */}

                      {/* <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
            <li>
                <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mockups</button>
            </li>
            <li>
                <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Templates</button>
            </li>
            <li>
                <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Design</button>
            </li>
            <li>
                <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logos</button>
            </li>
            </ul>
        </div>
        <div class="relative w-full">
            <input type="search" id="search-dropdown" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search" required />
            <button type="submit" class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
                <span class="sr-only">Search</span>
            </button>
        </div>
    </div>
</form> */}
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