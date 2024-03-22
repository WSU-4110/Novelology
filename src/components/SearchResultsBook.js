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
        <div>
            {/* 3.1 */}
            <div className="w-full border-b border-gray-700 mt-4 space-y-4">
            </div>
        </div>

        {/* 4 */}
        <div className="flex justify-between items-center w-full space-x-10 ">
            
            {/* 4.1 */}
            <div className="flex flex-col justify-center items-end w-full">
                {/* 4.1.1 */}
                <div className="h-48 w-40 rounded-none bg-gray-400 space-x-32">
                </div>
            </div>

            {/* 4.2 */}
            <div className="flex flex-col justify-center items-start w-full text-2xl font-Semibold mb-8">
                Book Title
               
                {/* 4.2.1 */}
                <div className="flex flex-col justify-center items-start w-full text-xl font-extralight">
                    By: Author Name
                </div>

                {/* 4.2.2 */}
                <div className="flex flex-col justify-center items-start w-full text-lg font-extralight">
                    <BookRating />
                </div>

                {/* 4.2.3 */}
                <button className="px-3 py-1.0 rounded-full bg-maroon text-lg font-extralight text-white flex flex col gap-2">
                    Add to Book List
                </button>
            </div>

            {/* 4.3 */}
            <div className="flex flex-col justify-center items-center w-full">
            </div>
        </div>

        {/* 5 */}
        <div>
            {/* 5.1 */}
            <div className="w-full border-b border-gray-700 mt-4 space-y-4">
            </div>
        </div>


      </div> 
    </div>
    
  )
}
