import * as React from "react";
import NavigationBar from "./NavigationBar";
import BookRating from "./BookRating.js";


export default function SearchResultsBook() {
 
    return (
    <div>
      <div className="flex flex-col bg-white space-y-10">
        
        {/* 1 */}
        <NavigationBar />
        
        {/* 2 */}
        <div className="flex flex-col justify-center items-center w-full">
            {/* 2.1 */}
            <div className="text-3xl font-bold flex flex-col gap-5" >
                Search Results
            </div>
        </div>

        {/* 3 */}
        <div className="flex justify-between items-center w-full">
            {/* 3.1 */}
            <div className="flex flex-col justify-center items-end w-full">
                {/* 3.1.1 */}
                <div className="flex items-center">
                    <div className="mr-2 text-lg font-extralight px-4 py-1 rounded-full bg-gray border-2 border-slate-200">
                    Search by Book Title, User, or Author
                    </div>
                    <button className="px-4 py-1 rounded-full bg-maroon text-lg font-extralight text-white">
                    Search
                    </button>
                </div>
                {/* 3.1.2 */}
                <div className="flex flex-row justify-center items-center w-full space-x-10">
                    <div>
                    All
                    </div>
                    <div>
                    Title 
                    </div>
                    <div>
                    Users
                    </div>
                    <div>
                    Authors
                    </div>
                </div>
            </div>

            {/* 3.2 */}
            <div className="flex flex-col justify-center items-start w-full">
            </div>

            {/* 3.3 */}
            <div className="flex flex-col justify-center items-start w-full">
            </div>

            {/* 3.4 */}
            <div className="flex flex-col justify-center items-start w-full text-xl">
                Select Genres
                {/* 3.4.1 */}
                <div className="space-x-1 space-y-2">
                    <button className="px-4 py-1 rounded-full bg-pink-900 text-lg  font-extralight text-white">
                    Horror
                    </button>
                    <button className="px-4 py-1 rounded-full bg-pink-900 text-lg  font-extralight text-white">
                    Fiction
                    </button>
                    <button className="px-4 py-1 rounded-full bg-pink-900 text-lg  font-extralight text-white">
                    Romance
                    </button>
                    <button className="px-4 py-1 rounded-full bg-pink-900 text-lg  font-extralight text-white">
                    Mystery
                    </button>
                    <button className="px-4 py-1 rounded-full bg-pink-900 text-lg  font-extralight text-white">
                    Fantasy
                    </button>
                </div>
            </div>
        </div> 

        {/* 4 */}
        <div>
            {/* 4.1 */}
            <div className="w-full border-b border-gray-700 mt-4 space-y-4">
            </div>
        </div>

        {/* 5 */}
        <div className="flex justify-between items-center w-full space-x-10 ">
            
            {/* 5.1 */}
            <div className="flex flex-col justify-center items-end w-full">
                {/* 5.1.1 */}
                <div className="h-48 w-40 rounded-none bg-gray-400 space-x-32">
                </div>
            </div>

            {/* 5.2 */}
            <div className="flex flex-col justify-center items-start w-full text-2xl font-Semibold mb-8">
                Book Title
                {/* 5.2.1 */}
                <div className="flex flex-col justify-center items-start w-full text-xl font-extralight">
                    By: Author Name
                </div>
                {/* 5.2.2 */}
                <div className="flex flex-col justify-center items-start w-full text-lg font-extralight">
                    <BookRating />
                </div>
                {/* 5.2.3 */}
                <button className="px-3 py-1.0 rounded-full bg-maroon text-lg font-extralight text-white flex flex col gap-2">
                    Add to Book List
                </button>
            </div>

            {/* 5.3 */}
            <div className="flex flex-col justify-center items-center w-full">
            </div>
        </div>

        {/* 6 */}
        <div>
            {/* 6.1 */}
            <div className="w-full border-b border-gray-700 mt-4 space-y-4">
            </div>
        </div>




      </div> 
    </div>
    
  )
}
