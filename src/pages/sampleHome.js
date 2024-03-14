import * as React from "react";
import LoggedOutNavBar from "../components/NavigationBar.js";
import Footer from "../components/Footer.js";
import { useNavigate } from 'react-router-dom';

function SampleHome(props) {

  return (
    <>
    <LoggedOutNavBar />
    <div className="flex flex-col mt-0 bg-lightcolor">
      <div className="flex z-10 flex-col pb-7 w-full max-md:max-w-full">

        <div className="overflow-hidden relative flex-col justify-center items-center px-16 pt-52 pb-52 mt-0 w-full text-6xl text-black min-h-[705px] max-md:px-5 max-md:py-10 max-md:max-w-full max-md:text-4xl">
          <img
            loading="lazy"
            srcSet={require("../assets/home_page.jpg")}
            style={{ height: "10em", width: "25em" }}
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
        <div className="flex flex-col mb-40  max-w-[1086px] max-md:mb-10 max-md:max-w-full">
          <div className="justify-center items-center self-center px-1 py-5 max-w-full text-5xl text-white whitespace-nowrap rounded-xl shadow-sm bg-maroon w-[512px] max-md:px-2 max-md:text-4xl">
            What we offer?
          </div>

          <div className="flex gap-20 justify-between items-start mt-44 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
            <img
              loading="lazy"
              srcSet={require("../assets/best-seller.png")}
              style={{ height: "19em", width: "24.9em" }}
              className="flex-1 w-full mr-2 rounded-xl shadow-sm"
            />
            <div className="self-stretch w-3 rounded-3xl shadow-sm bg-maroon h-[282px] max-md:hidden" />
            <div className="flex flex-col flex-1 px-11 pt-5 pb-12 mt-5 rounded-xl shadow-sm bg-maroon bg-opacity-40 max-md:px-5">
              <div className="text-2xl text-black">
                Waiting to read the next <br />
                bestseller?
              </div>
              <div className="mt-4 text-base text-black text-opacity-60">
                Give us your favorite genres <br />
                while registering <br />
                and we will provide you
                <br /> great recommendations.
              </div>
            </div>
          </div>
          {/*  */}

          <div className="flex gap-20 justify-between items-start mt-44 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
            <div className="flex flex-col flex-1 px-2 pt-5 pb-6 mt-0 mr-2.5 rounded-xl shadow-sm bg-maroon bg-opacity-40 max-md:px-5">
              <div className="text-2xl text-black">
                Engage in spurring <br />
                conversations
              </div>
              <div className="mt-6 text-base text-black text-opacity-60">
                Want to discuss a plot twist with
                <br /> other readers?
                <br />
                Start a conversation or jump <br />
                into existing 
                discussions. <br />
                Share your gasp-worthy <br />
                moments with other!
              </div>
            </div>
            <div className="self-stretch w-3 rounded-3xl shadow-sm bg-maroon h-[282px] max-md:hidden" />
            <img
              loading="lazy"
              srcSet={require("../assets/spurring-conversations.jpg")}
              style={{ height: "17em", width: "14em" }}
              className="flex-1 w-full rounded-xl shadow-sm"
            />
          </div>

          {/*  */}

          <div className="flex gap-20 justify-between items-start mt-44 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
            <img
              loading="lazy"
              srcSet={require("../assets/reader-profile.png")}
              style={{ height: "19em", width: "25.3em"}}
              className="flex-1 w-full rounded-xl shadow-sm"
            />
            <div className="self-stretch w-3 rounded-3xl shadow-sm bg-maroon h-[282px] max-md:hidden" />
            <div className="flex flex-col flex-1 px-11 pt-5 pb-8 mt-0 rounded-xl shadow-sm bg-maroon bg-opacity-40 max-md:px-5">
              <div className="text-2xl text-black">
                Create your reader <br />
                profile
              </div>
              <div className="mt-6 text-base text-black text-opacity-60">
                Sign up for our free reader profile <br />
                and learn what everyone’s current <br />
                favorite is.
                <br />
                <br />
                Connect with your friends and learn
                <br /> their <br />
                current interests.
                <br />
              </div>
            </div>
          </div>

          {/*  */}

          <div className="flex gap-20 justify-between items-start mt-44 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
            <div className="flex flex-col flex-1 px-3 pt-5 pb-3 mt-0 rounded-xl shadow-sm bg-maroon bg-opacity-40 max-md:px-5">
              <div className="text-2xl text-black">
                Share your favorite <br />
                memories
              </div>
              <div className="mt-2 text-base text-black text-opacity-60">
                Want to share some of <br />
                your favorite book memories or<br />
                 events with your fellow readers?<br />
                <br />
                We got that covered with
                <br /> our feed post feature
                <br /> where you can share it with others.
              </div>
            </div>
            <div className="self-stretch w-3 rounded-3xl shadow-sm bg-maroon h-[282px] max-md:hidden" />
            <img
              loading="lazy"
              srcSet={require("../assets/share-memories.png")}
              style={{ height: "17em", width: "14em" }}
              className="flex-1 w-full rounded-xl shadow-sm"
            />
          </div>

          {/*  */}

          <div className="flex gap-20 justify-between items-start mt-44 max-md:flex-wrap max-md:mt-10 max-md:max-w-ful">
            <img
              loading="lazy"
              srcSet={require("../assets/reviewer-artist.jpg")}
              style={{ height: "19em", width: "32em" }}
              className="flex-1 w-full mr-8 rounded-xl shadow-sm"
            />
            <div className="self-stretch w-3 rounded-3xl shadow-sm bg-maroon h-[282px] max-md:hidden" />
            <div className="flex flex-col flex-1 w-3 px-1 pt-5 pb-0 mt-0 rounded-xl shadow-sm bg-maroon bg-opacity-40 max-md:px-5">
              <div className="text-2xl text-black">
                Become a Novelology <br />
                Reviewer ot Artist
              </div>
              <div className="mt-1.5 text-base text-black text-opacity-60">
                Do you love writing reviews <br />
                for books or sketching fan art <br />
                or making specialized book covers?
                <br />
                <br />
                You came to right place <br />
                where you can rise your creativity <br />
                by sharing your work with others.
                <br /> Maybe with our authors!
                <br />
                <br />
              </div>
            </div>
          </div>

          {/*  */}

          <div className="flex gap-20 justify-between items-start mt-44 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
            <div className="flex flex-col flex-1 px-3 pt-5 pb-6 mt-0 rounded-xl shadow-sm bg-maroon bg-opacity-40 max-md:px-5">
              <div className="text-2xl text-black">
                Are you an author?
              </div>
              <div className="mt-1 text-base text-black text-opacity-60">
              <br />
                Sign up with our new <br />
                author account <br />
                and engage with your <br />
                audience through <br />
                author Q&A board and <br />
                collaborate with artists to <br />
                draw fan-arts for your books.
              </div>
            </div>
            <div className="self-stretch w-3 rounded-3xl shadow-sm bg-maroon h-[282px] max-md:hidden" />
            <img
              loading="lazy"
              srcSet={require("../assets/author-intro-feature.png")}
              style={{ height: "17em", width: "14em" }}
              className="flex-1 w-full rounded-xl shadow-sm"
            />
          </div>
        </div>
        
      </div>
      {/* <Footer /> */}
      {/* <div className="flex flex-col items-end px-16 pt-10 pb-2.5 w-full bg-maroon max-md:px-5 max-md:max-w-full">
        <div className="mr-32 max-w-full w-[795px] max-md:mr-2.5">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
            <div className="flex flex-col w-[82%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow items-center text-2xl font-semibold text-white max-md:mt-10 max-md:max-w-full">
                <div className="self-stretch max-md:max-w-full">
                  Need help? Email:info@novelology.com{" "}
                </div>
                <div className="mt-7 whitespace-nowrap">
                  Learn more about us here
                </div>
                <div className="mt-16 whitespace-nowrap max-md:mt-10">
                  HELPFUL LINKS
                </div>
                <div className="mt-3 whitespace-nowrap">Home | Feed</div>
                <div className="mt-5 text-xl font-light whitespace-nowrap">
                  Copyright © 2024
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 mt-28 w-[18%] max-md:ml-0 max-md:w-full">
              <img
                loading="lazy"
                srcSet={require('../assets/novelology_newlogo.png')} style={{ height: '5em', width: '5em' }}
                className="self-stretch my-auto max-w-full aspect-[1.02] w-[131px] max-md:mt-10"
              />
            </div>
          </div>
        </div>
        {/*  
      </div> */}
    </div>
    <Footer />
    </>
  );
}

export default SampleHome;
