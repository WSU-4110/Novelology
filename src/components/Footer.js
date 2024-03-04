import React from 'react';

const Footer=()=>{

    return (
        <>
        <div className="flex flex-col bg-lightcolor">
        <div className="flex flex-col items-end px-16 pt-10 pb-2.5 w-full bg-maroon max-md:px-5 max-md:max-w-full">
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
        {/*  */}
      </div>
      </div>
        </>
    );

};

export default Footer;