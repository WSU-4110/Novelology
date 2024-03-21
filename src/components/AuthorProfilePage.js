import * as React from "react";
import NavigationBar from "./NavigationBar";

export default function ReaderProfilePage() {

  return (
    <div>
      <div className="flex flex-col bg-white">
        {/* 1 */}
        <NavigationBar />
        {/* 2 */}

        <div className="h-96 w-full bg-gray-200" >
        </div>
        {/* 3 */}

        <div className="flex justify-center items-center w-full">
                  {/* 3.1 */}

          <div className=" h-40 w-40 rounded-full bg-gray-400">
          </div>
        </div>
                {/* 4 */}

        <div className="flex flex-col justify-center items-center w-full space-y-4">
                  {/* 4.1 */}

          <div className="text-3xl font-bold"> 
          UserName
          </div>
          {/* 4.2 */}
          <div> 
            @UserName
          </div>
          {/* 4.3 */}
          <div className=" px-3 py-1 rounded-lg shadow-lg bg-maroon text-white">
            Author
          </div>
          {/* 4.4 */}
          <div className="text-lg flex flex-row gap-5">
            {/* 4.4.1 */}
            <div>
              Genre1
            </div>
            <div>
              Genre2
            </div>
            <div>
              Genre3
            </div>
          </div>
          {/* 4.5 */}
          <div className="text-xl flex flex-row gap-5">
            {/* 4.5.1 */}
            <div>
              100 Followers
            </div>
            <div>
              150 Following
            </div>
          </div>
          {/* 4.6 */}
          <div className="text-lg flex flex-row gap-5"> 
            Bio Description
          </div>


          <div className="w-full border-b border-gray-700 mt-4">
          </div>

            
          <div className="flex justify-between items-center w-full">

            <div className="flex flex-col justify-center items-center w-full">
              <div>
              <button className="text-2xl text-black">Books Published</button>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center w-full">
              <div className="space-x-32">
              <button className="text-2xl text-black">Activity</button>
              <button className="text-2xl text-black">Posts</button>
              </div>
            </div>
          
          </div>
        
        </div> 

      </div>

    </div>
  )
}


