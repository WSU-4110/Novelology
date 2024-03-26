import * as React from "react";
import NavigationBar from "./NavigationBar";
import TalkingTo from "./reader/functions/TalkingTo";
// import TalkingTo from "./reader/functions/TalkingTo";


export default function ReaderQandA() {
  return (
    <div>
      <div className="flex flex-col justify-center items-center w-full text-3xl font-bold mt-10">
      Reader Q & A
      </div>

      <div className="flex flex-col justify-center items-center w-full mt-10">
      <TalkingTo/>
      </div>

    </div>
  )
}
  
