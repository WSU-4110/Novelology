import * as React from "react";
import Footer from "../components/Footer.js";

function userOnboarding(props) {
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
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/90804d6ee9d466025c14df08fa70f00a89bb57ba3311e6facbb8d5175ed0b010?apiKey=00dd8100ff0f48749da2736e824a4b02&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/90804d6ee9d466025c14df08fa70f00a89bb57ba3311e6facbb8d5175ed0b010?apiKey=00dd8100ff0f48749da2736e824a4b02&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/90804d6ee9d466025c14df08fa70f00a89bb57ba3311e6facbb8d5175ed0b010?apiKey=00dd8100ff0f48749da2736e824a4b02&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/90804d6ee9d466025c14df08fa70f00a89bb57ba3311e6facbb8d5175ed0b010?apiKey=00dd8100ff0f48749da2736e824a4b02&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/90804d6ee9d466025c14df08fa70f00a89bb57ba3311e6facbb8d5175ed0b010?apiKey=00dd8100ff0f48749da2736e824a4b02&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/90804d6ee9d466025c14df08fa70f00a89bb57ba3311e6facbb8d5175ed0b010?apiKey=00dd8100ff0f48749da2736e824a4b02&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/90804d6ee9d466025c14df08fa70f00a89bb57ba3311e6facbb8d5175ed0b010?apiKey=00dd8100ff0f48749da2736e824a4b02&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/90804d6ee9d466025c14df08fa70f00a89bb57ba3311e6facbb8d5175ed0b010?apiKey=00dd8100ff0f48749da2736e824a4b02&"
              className="shrink-0 aspect-[1.08] w-[85px]"
            />
            <div className="flex justify-center items-center">
              User Onboarding
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center px-5 pt-16 w-full bg-[linear-gradient(0deg,#F4F3EE_0%,#F4F3EE_100%,#89023E)] max-md:max-w-full">
          <div className="flex flex-col rounded-lg shadow-2xl px-20 py-4 max-w-full text-center text-black shadow-sm bg-maroon bg-opacity-50 w-[569px] max-md:px-5">
            <div className="self-center text-xl">
              Upload your profile picture
            </div>
            <div className="flex gap-5 justify-between items-start mt-3 w-full text-xl whitespace-nowrap">
              <div className="shrink-0 rounded-full bg-zinc-300 h-[117px] w-[123px]" />
              <div className="flex flex-col flex-1 items-center mt-3">
                <button className="justify-center text-lg self-stretch px-2.5 py-1 rounded-xl bg-maroon bg-opacity-70">
                  View Current Picture
                </button>
                <button className="justify-center text-lg px-3 py-1 mt-3 rounded-xl bg-maroon bg-opacity-70">
                  Upload picture
                </button>
                <button className="justify-center text-lg px-3 py-1 mt-2 rounded-xl bg-maroon bg-opacity-70">
                  Remove picture
                </button>
              </div>
            </div>
          </div>

          <div className="items-center rounded-lg shadow-2xl px-16 pt-2.5 pb-8 mt-24 max-w-full text-xl text-center text-black whitespace-nowrap shadow-sm bg-maroon bg-opacity-50 w-[738px] max-md:px-5 max-md:mt-10">
            Bio
            <label
              for="bio"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            ></label>
            <textarea
              id="message"
              rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-maroon bg-opacity-30 rounded-lg border border-maroon focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tell us something about yourself..."
            ></textarea>
          </div>
          <div className="flex flex-col rounded-lg shadow-2xl px-16 pt-4 pb-10 mt-28 max-w-full text-center text-black whitespace-nowrap shadow-sm bg-maroon bg-opacity-50 w-[456px] max-md:px-5 max-md:mt-10">
            <div className="text-xl">Are you a reader or author?</div>
            <div className="flex gap-5 justify-between mt-6 text-lg">
              <div className="flex w-1/2 gap-5">
                Reader
                <input
                  type="radio"
                  value="reader"
                  name="roles"
                  class="w-8 h-8 text-blue-600 bg-maroon border-maroon focus:ring-maroon dark:focus:ring-maroon dark:ring-offset-maroon focus:ring-2 dark:bg-maroon dark:border-maroon"
                />
              </div>
              <div className="flex w-1/2 gap-5">
                Author
                <input
                  type="radio"
                  value="author"
                  name="roles"
                  class="w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center rounded-lg shadow-2xl items-center px-12 py-7 mt-14 w-[200px] text-xl text-center text-black whitespace-nowrap bg-maroon bg-opacity-50 w-[474px] max-md:px-5 max-md:mt-10">
            <div className="w-1/2">Your Pronouns</div>
            <div className="w-1/2">
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
            </div>
          </div>
          <div className="mt-12 text-xl text-black whitespace-nowrap max-md:mt-10">
            Tell us some of your interests:
          </div>
          <div className="flex flex-col rounded-lg shadow-2xl items-center px-16 pt-7 pb-20 mt-6 max-w-full text-xl text-center text-black shadow-sm bg-maroon bg-opacity-50 w-[908px] max-md:px-5">
            <div className="flex gap-5 justify-between mb-4 max-w-full w-[600px] max-md:flex-wrap">
              <div>Preferred Genres</div>
              <div>Choose from </div>
            </div>
          </div>
          <div className="flex gap-5 justify-between my-20 max-w-full text-xl text-center text-black whitespace-nowrap w-[631px] max-md:flex-wrap max-md:mt-10">
            <button className="flex-1 justify-center hover:bg-maroon hover:bg-opacity-30 active:bg-maroon active:bg-opacity-60 focus:outline-none focus:ring focus:ring-maroon px-16 py-4 rounded-xl border-black border-solid shadow-sm bg-maroon bg-opacity-80 border-[3px] max-md:pr-6 max-md:pl-6">
              SUBMIT
            </button>
            <button className="flex-1 justify-center hover:bg-maroon hover:bg-opacity-30 active:bg-maroon active:bg-opacity-60 focus:outline-none focus:ring focus:ring-maroon  items-center px-16 py-4 rounded-xl border-black border-solid shadow-sm bg-maroon bg-opacity-80 border-[3px] max-md:px-5">
              RESET
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default userOnboarding;
