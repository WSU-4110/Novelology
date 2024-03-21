import React, { useState, useEffect } from "react";
import NavigationBar from "../components/NavigationBar.js";
// import { useNavigate } from "react-router-dom";
// import { db, auth, storage } from "../../firebase.js"; 
// import { getDoc, doc, setDoc } from "firebase/firestore"; // Import necessary Firestore functions
import UploadPFP from "../components/shared/UploadPFP.js";
import PronounsDropdown from "../components/user/PronounsDropdown.js";
import RolesSelection from "../components/user/RolesSelection.js";
import BioTextArea from "../components/BioTextArea.js";
// import fetchPFP from "../../functions/fetchPFP.js"; // Import fetchPFP function

import Footer from "../components/Footer.js";
import SelectGenres from "../components/user/SelectGenres.js"
function UserOnboarding({showNavBar}) {
  {showNavBar && <NavigationBar />}

  const [bio, setBio] = useState("");
  const [fetchedProfilePicture, setFetchedProfilePicture] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null); 
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [pronouns, setPronouns] = useState("");


  document.addEventListener("DOMContentLoaded", function () {
    const navigateButton = document.getElementById("dropdown-button");

    navigateButton.addEventListener("click", function () {
      // Scroll to the target div
      document.getElementById("dropdown").scrollIntoView({ behavior: "smooth" });
    });
  });
  
  return (
    <>
      <div className="flex flex-col bg-white">
        <div className="flex flex-col justify-center items-start px-16 py-2.5 w-full text-3xl text-white bg-maroon max-md:px-5 max-md:max-w-full">
          <div className="flex gap-5 justify-between ml-32 max-w-full w-[648px] max-md:flex-wrap">
            
            <div className="flex justify-center items-center">
              User Onboarding
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center px-5 pt-16 w-full bg-[linear-gradient(0deg,#F4F3EE_0%,#F4F3EE_100%,#89023E)] max-md:max-w-full">
          <div className="self-center">
            <UploadPFP setProfilePicture={setProfilePicture} />
            {fetchedProfilePicture && (
              <img
                src={fetchedProfilePicture}
                alt="Profile"
                className="w-24 h-24 rounded-full my-4"
              />
            )}
          </div>

          <div className="items-center rounded-lg shadow-2xl px-16 pt-2.5 pb-8 mt-24 max-w-full text-xl text-center text-black whitespace-nowrap shadow-sm bg-maroon bg-opacity-50 w-[738px] max-md:px-5 max-md:mt-10">
            Bio
            <label
              for="bio"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            ></label>
            <BioTextArea bio={bio} setBio={setBio} />
            
          </div>

          <div className="flex flex-col rounded-lg shadow-2xl px-16 pt-4 pb-10 mt-28 max-w-full text-center text-black whitespace-nowrap shadow-sm bg-maroon bg-opacity-50 w-[456px] max-md:px-5 max-md:mt-10">
            <div className="text-xl">Are you a reader or author?</div>
            <div className="flex gap-5 justify-between mt-6 text-lg">
            <RolesSelection selectedRoles={selectedRoles} setSelectedRoles={setSelectedRoles} />

              {/* <div className="flex w-1/2 gap-5">
                Reader
                <input
                  type="radio"
                  value="reader"
                  name="roles"
                  class="w-8 h-8 text-maroon bg-maroon border-maroon accent-red focus:ring-maroon dark:focus:ring-maroon dark:ring-offset-maroon focus:ring-2 dark:bg-maroon dark:border-maroon"
                />
              </div>
              <div className="flex w-1/2 gap-5">
                Author
                <input
                  type="radio"
                  value="author"
                  name="roles"
                  class="w-8 h-8 text-maroon bg-maroon border-maroon focus:ring-maroon dark:focus:ring-maroon dark:ring-offset-maroon focus:ring-2 dark:bg-maroon dark:border-maroon"
                />
              </div> */}
            </div>
          </div>
          <div className="flex flex-row justify-center rounded-lg shadow-2xl items-center px-12 py-7 mt-14 w-[200px] text-xl text-center text-black whitespace-nowrap bg-maroon bg-opacity-50 w-[474px] max-md:px-5 max-md:mt-10">
            <div className="w-1/2">Your Pronouns</div>
            <PronounsDropdown pronouns={pronouns} setPronouns={setPronouns} />

            {/* <div className="w-1/2">
              <select
                id="pronouns"
                name="pronouns"
                class="w-3/4 h-10 border-2 border-maroon bg-lightcolor focus:outline-none focus:border-maroon text-black rounded-full px-2 md:px-3 py-0 md:py-1 tracking-wider"
              >
                <option value="null" selected="">
                  Choose
                </option>
                <option value="he/him">He/Him</option>
                <option value="she/her">She/Her</option>
                <option value="they/them">They/Them</option>
                <option value="other">Other</option>
              </select>
            </div> */}
          </div>
          <div className="mt-12 text-xl text-black whitespace-nowrap max-md:mt-10">
            Tell us some of your interests:
          </div>
          <SelectGenres />

          <div className="flex gap-5 justify-between my-20 max-w-full text-xl text-center text-black whitespace-nowrap w-[631px] max-md:flex-wrap max-md:mt-10">
            <button className="flex-1 justify-center hover:bg-maroon hover:bg-opacity-40 active:bg-maroon active:bg-opacity-60 focus:outline-none focus:ring focus:ring-maroon px-16 py-4 rounded-xl border-black border-solid shadow-sm bg-maroon bg-opacity-80 border-[3px] max-md:pr-6 max-md:pl-6">
              SUBMIT
            </button>
            <button className="flex-1 justify-center hover:bg-maroon hover:bg-opacity-40 active:bg-maroon active:bg-opacity-60 focus:outline-none focus:ring focus:ring-maroon  items-center px-16 py-4 rounded-xl border-black border-solid shadow-sm bg-maroon bg-opacity-80 border-[3px] max-md:px-5">
              RESET
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserOnboarding;
