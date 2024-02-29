import * as React from "react";

function SampleHome(props) {
  return (
    <div className="flex flex-col bg-white">
      <div className="flex z-10 flex-col pb-7 w-full max-md:max-w-full">

        <div className="flex justify-center items-center px-16 py-1.0 w-full whitespace-nowrap bg-maroon max-md:px-5 max-md:max-w-full ">
          <div className="flex gap-5 justify-between w-full max-w-[1097px] max-md:flex-wrap max-md:max-w-full">
            <div className="flex gap-4 justify-between items-center max-md:flex-wrap max-md:max-w-full">
              <img
                loading="lazy"
                srcSet={require('../assets/novelology_newlogo.png')} style={{ height: '5em', width: '5em' }}
                className="self-stretch aspect-[1.08] w-[85px]"
              />
              <div className="flex gap-3 self-stretch my-auto text-base">
                <input type="text" id="search_input" class="bg-lightcolor border border-gray-300 text-gray-900 text-sm rounded-full 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Enter your search title" />
                
                <button type="button" class="text-gray-900 bg-lightcolor border border-gray-300 focus:outline-none 
                hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 
                dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 
                dark:focus:ring-gray-700">Search</button>

              </div>
              <div className="flex gap-10 justify-between self-stretch my-auto text-xl text-white">
                <button type="button">Home</button>
                <button type="button">About</button>
                <button type="button">Feed</button>
              </div>
            </div>
            <div className="flex gap-5 justify-between my-auto text-xl text-black">
              <div className="grow justify-center px-4 py-3.5 bg-[linear-gradient(0deg,#F4F3EE_0%,#F4F3EE_100%),#89023E] rounded-[50px]">
              <button type="button" class="text-gray-900 bg-lightcolor border border-gray-300 focus:outline-none 
                hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 
                dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 
                dark:focus:ring-gray-700">Sign in</button>
              </div>
              <div className="grow justify-center px-3 py-3.5 bg-[linear-gradient(0deg,#F4F3EE_0%,#F4F3EE_100%),#89023E] rounded-[50px]">
              <button type="button" class="text-gray-900 bg-lightcolor border border-gray-300 focus:outline-none 
                hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 
                dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 
                dark:focus:ring-gray-700">Register</button>
              </div>
            </div>
          </div>
        </div>


        <div className="overflow-hidden relative flex-col justify-center items-center px-16 pt-52 pb-52 w-full text-6xl text-black min-h-[705px] max-md:px-5 max-md:py-10 max-md:max-w-full max-md:text-4xl">
          <img
            loading="lazy"
            srcSet={require('../assets/home_page.jpg')} style={{ height: '10em', width: '25em' }}
            className="object-cover absolute inset-0 size-full"
          />
            <div class="relative z-1 text-center">
              Sign up with Novelology <br />
              and connect with your <br />
              favorite book community
            </div>
        </div>

      </div>
      
      <div className="flex justify-center items-center px-16 py-12 mt-0 w-full text-center max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col mb-40 w-full max-w-[1086px] max-md:mb-10 max-md:max-w-full">
          <div className="justify-center items-center self-center px-10 py-11 max-w-full text-5xl text-white whitespace-nowrap rounded-xl shadow-sm bg-maroon w-[512px] max-md:px-2 max-md:text-4xl">
            What we offer?
          </div>
          </div>
          </div>
          {/* <div className="flex gap-5 justify-between mt-36 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
            <img
              loading="lazy"
              srcSet={require('../assets/best-seller.png')} style={{ height: '10em' }}
              className="flex-1 w-auto shadow-sm aspect-[1.37]"
            />
            <div className="self-start mt-5 w-3 rounded-3xl shadow-sm bg-maroon h-[282px] max-md:hidden" />
            <div className="flex flex-col flex-1 self-end px-20 pt-5 pb-12 mt-0 rounded-xl shadow-sm bg-maroon bg-opacity-40 max-md:px-5 max-md:mt-0 max-md:max-w-full">
              <div className="text-3xl text-black">
                Waiting to read the next <br />
                bestseller?
              </div>
              <div className="self-center mt-3 text-xl text-black text-opacity-60">
                Give us your favorite genres <br />
                while registering <br />
                and we will provide you
                <br /> great recommendations.
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <div className="flex flex-col items-center px-16 pb-12 w-full text-center bg-[linear-gradient(0deg,#F4F3EE_0%,#F4F3EE_100%),#89023E] max-md:px-5 max-md:max-w-full">
        <div className="flex z-10 flex-col mt-0 w-full max-w-[1185px] max-md:max-w-full">
          <div className="flex gap-5 justify-between pr-14 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
            <div className="flex flex-col flex-1 pt-5 pb-11 my-auto rounded-xl shadow-sm bg-maroon bg-opacity-40 max-md:max-w-full">
              <div className="self-center text-3xl text-black">
                Engage in spurring <br />
                conversations
              </div>
              <div className="mt-3 text-xl text-black text-opacity-60 max-md:max-w-full">
                Want to discuss a plot twist with other <br />
                readers?
                <br />
                Start a conversation or jump into existing <br />
                discussions. Share your gasp-worthy <br />
                moments with other!
              </div>
            </div>
            <div className="self-end mt-14 w-3 rounded-3xl shadow-sm bg-maroon h-[282px] max-md:hidden max-md:mt-10" />
            <img
              loading="lazy"
              srcSet={require('../assets/spurring-conversations.jpg')} style={{ height: '20em', width: '5em' }}
              className="flex-1 w-full aspect-[1.39] max-md:max-w-full"
            />
          </div>
          <div className="flex gap-5 justify-between mt-48 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
            <img
              loading="lazy"
              srcSet={require('../assets/reader-profile.png')} style={{ height: '20em', width: '5em' }}
              className="flex-1 w-full aspect-[1.43] max-md:max-w-full"
            />
            <div className="self-end mt-16 w-3 rounded-3xl shadow-sm bg-maroon h-[282px] max-md:hidden max-md:mt-10" />

            <div className="flex flex-col flex-1 px-14 py-6 my-auto rounded-xl shadow-sm bg-maroon bg-opacity-40 max-md:px-5 max-md:max-w-full">
              <div className="self-center text-3xl text-black whitespace-nowrap">
                Create your reader profile
              </div>
              <div className="mt-3 text-xl text-black text-opacity-60">
                Sign up for our free reader profile and <br />
                learn what everyone’s current <br />
                favorite is.
                <br />
                <br />
                Connect with your friends and learn their <br />
                current interests.
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center px-16 pt-12 w-full bg-[linear-gradient(0deg,#F4F3EE_0%,#F4F3EE_100%),#89023E] max-md:px-5 max-md:max-w-full">
        <div className="flex z-10 flex-col mt-24 mb-0 w-full max-w-[1170px] max-md:mt-10 max-md:mb-2.5 max-md:max-w-full">
          <div className="flex gap-5 justify-between items-center pr-5 text-center max-md:flex-wrap max-md:max-w-full">
            <div className="flex flex-col flex-1 self-stretch px-9 pt-3 pb-12 my-auto rounded-xl shadow-sm bg-maroon bg-opacity-40 max-md:px-5 max-md:max-w-full">
              <div className="self-center text-3xl text-black max-md:max-w-full">
                Share your favorite memories
              </div>
              <div className="mt-8 text-xl text-black text-opacity-60 max-md:max-w-full">
                Want to share some of your favorite book <br />
                memories or events with your fellow readers?
                <br />
                <br />
                We got that covered with our feed post feature
                <br /> where you can share it with others.
              </div>
            </div>
            <div className="self-stretch my-auto w-3 rounded-3xl bg-maroon h-[282px] max-md:hidden" />
            <img
              loading="lazy"
              srcSet= {require('../assets/share-memories.png')} style={{ height: '20em', width: '5em' }}
              className="flex-1 self-stretch w-full aspect-[1.3] max-md:max-w-full"
            />
          </div>
          <div className="mt-36 max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
              <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                <img
                  loading="lazy"
                  srcSet= {require('../assets/reviewer-artist.jpg')} style={{ height: '20em', width: '25em' }}
                  className="grow w-full aspect-[1.11] max-md:mt-10 max-md:max-w-full"
                />
              </div>
              <div className="self-start mt-5 w-3 rounded-3xl shadow-sm bg-maroon h-[282px] max-md:hidden" />

              <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col self-stretch px-16 pt-5 pb-8 my-auto w-full text-center rounded-xl shadow-sm bg-maroon bg-opacity-40 max-md:px-5 max-md:mt-10 max-md:max-w-full">
                  <div className="self-center text-3xl text-black">
                    Become a Novelology <br />
                    Reviewer ot Artist
                  </div>
                  <div className="mt-3 text-xl text-black text-opacity-60">
                    Do you love writing reviews for books or <br />
                    sketching fan art or making
                    <br /> specialized book covers?
                    <br />
                    <br />
                    You came to right place where you can
                    <br />
                    rise your creativity by sharing your work <br />
                    with others. Maybe with our authors!
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center px-16 pb-12 w-full bg-[linear-gradient(0deg,#F4F3EE_0%,#F4F3EE_100%),#89023E] max-md:px-5 max-md:max-w-full">
        <div className="flex z-10 flex-col mt-0 mb-11 w-full max-w-[1198px] max-md:mb-10 max-md:max-w-full">
          {/* <div className="self-center w-3 rounded-3xl shadow-sm bg-maroon h-[282px] max-md:hidden" /> */}
          {/*<div className="flex gap-5 justify-between pr-3.5 mt-60 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
            <div className="flex flex-col flex-1 px-3.5 pt-2 pb-12 my-auto rounded-xl shadow-sm bg-maroon bg-opacity-40 max-md:max-w-full">
              <div className="self-center text-3xl text-black whitespace-nowrap">
                Are you an author?
              </div>
              <div className="mt-3 text-xl text-center text-black text-opacity-60 max-md:max-w-full">
                <br />
                Sign up with our new author account <br />
                and engage with your audience through <br />
                author Q&A board and collaborate with artists to <br />
                draw fan-arts for your books.
              </div>
            </div>
            <div className="self-start w-3 rounded-3xl bg-maroon h-[282px] max-md:hidden" />
            <img
              loading="lazy"
              srcSet= {require('../assets/author-intro-feature.png')} style={{ height: '20em', width: '25em' }}
              className="flex-1 w-full shadow-sm aspect-[1.61] max-md:max-w-full"
            />
          </div>
          
        </div>
      </div>
      <div className="flex flex-col justify-center items-end px-16 py-11 w-full bg-maroon max-md:px-5 max-md:max-w-full">
        <div className="mr-12 max-w-full w-[884px] max-md:mr-2.5">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
            <div className="flex flex-col w-[77%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col mt-6 text-3xl text-white max-md:mt-10 max-md:max-w-full">
                <div className="max-md:max-w-full">
                  Connect with us: info@novelology.com{" "}
                </div>
                <div className="mt-9 max-md:max-w-full">
                  Learn more about us on
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[23%] max-md:ml-0 max-md:w-full">
              <img
                loading="lazy"
                srcSet={require('../assets/novelology_newlogo.png')} style={{ height: '5em', width: '8em' }}
                className="grow max-w-full aspect-[1.01] w-[184px] max-md:mt-10"
              />
            </div>
          </div>
        </div> */}
    </div>         
          
      
  );
}


export default SampleHome;