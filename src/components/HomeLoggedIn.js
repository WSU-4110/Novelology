import * as React from "react";
import NavigationBar from "./NavigationBar";

export default function HomeLoggedIn() {
    return (
        <div>
            <div class="flex flex-col bg-white h-full"> 
            <NavigationBar />
            </div>

            <div class="flex flex-row bg-white h-full">
                <div class="flex flex-col justify-center items-start w-full h-full"> 
                sidebar
                </div>

                <div class="flex flex-col justify-center items-center w-full h-full">
                    Feed 
                </div>

                <div class="flex flex-col justify-center items-center w-full h-full space-y-10"> 
                    <div className="margin-bottom: 10px text-xl font-bold">
                    Popular Users
                    </div>
                    <div className="h-60 w-60 rounded-none bg-gray-400">
                    </div>

                    <div className="h-60 w-60 rounded-none bg-gray-400">
                    </div>

                    <div className="h-60 w-60 rounded-none bg-gray-400">
                    </div>
                </div>
            </div>
        </div>
  )
}
