import * as React from "react";
import NavigationBar from "./NavigationBar";
import BookRating from "./BookRating.js";


export default function SearchResultsBook() {
    return (
        <div>
            <div className="flex flex-col bg-white space-y-10">
        
            
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
                
                    {/* 3.2 */}
                    <div className="flex flex-col justify-start items-center w-full w-full">
                        {/* 3.2.1 */}
                        <div className="h-48 w-40 rounded-none bg-gray-400 space-x-32">
                        </div>
                        {/* 3.2.2*/}
                        <div className="flex flex-col justify-center items-center w-full text-2xl font-Semibold mb-8">
                        Book Title
                            <div className="flex flex-col justify-center items-center w-full text-xl font-extralight">
                            By: Author Name
                            </div>
                            <div className="flex flex-col justify-center items-center w-full text-lg font-extralight">
                            <BookRating />
                            </div>
                            <button className="px-3 py-1.0 rounded-full bg-maroon text-lg font-extralight text-white flex flex col gap-2">
                            </button>
                        </div>
                    </div>

                    {/* 3.3 */}
                    <div className="flex flex-col justify-start items-start w-full">
                        {/* 3.3.1 */}
                        <div className="h-48 w-40 rounded-none bg-gray-400 space-x-32">
                        </div>
                        {/* 3.3.2*/}
                        <div className="flex flex-col justify-center items-start w-full text-2xl font-Semibold mb-8">
                        Book Title
                            <div className="flex flex-col justify-center items-start w-full text-xl font-extralight">
                            By: Author Name
                            </div>
                            <div className="flex flex-col justify-center items-start w-full text-lg font-extralight">
                            <BookRating />
                            </div>
                            <button className="px-3 py-1.0 rounded-full bg-maroon text-lg font-extralight text-white flex flex col gap-2">
                            </button>
                        </div>
                    </div>

                    {/* 3.4 */}
                    <div className="flex flex-col justify-center items-center w-full text-xl">
                    Select Genres
                        {/* 3.4.1 */}
                        <div className="flex flex-row justify-center items-center space-x-2">
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
                        
                        {/* 3.4.2 */}
                        <div className="flex flex-row justify-center items-center w-full space-y-6">
                            {/* 3.4.2.1 */}
                            <div className="flex flex-col justify-center items-center w-full mt-5">
                                <button className="text-lg  font-extralight space-x-3 space-y-2">
                                All
                                </button>
                                <button className="text-lg  font-extralight space-x-1 space-y-2">
                                Title
                                </button>
                                <button className="text-lg  font-extralight space-x-1 space-y-2">
                                Users
                                </button>
                                <button className="text-lg  font-extralight space-x-1 space-y-2">
                                Authors
                                </button>
                            </div>
                            {/* 3.4.2.2 */}
                            <div className="flex flex-col justify-center items-start w-full">
                            </div>
                        </div>
                    </div>
                </div> 

                {/* 4 */}
                <div>
                </div>

                {/* 5 */}
                <div className="flex justify-between items-center w-full space-x-10 ">
                    {/* 5.1 */}
                    <div className="flex flex-col justify-center items-end w-full">
                    </div>

                    {/* 5.2 */}
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
