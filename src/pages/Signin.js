import * as React from "react";

function SignIn(props) {
  return (
    <div className="flex justify-center items-center px-16 py-12 text-xl text-white bg-maroon max-md:px-5">
      <div className="flex flex-col mt-6 max-w-full w-[408px]">
        <img
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/d25d790574e3df554b28a714104332c4e0e3f822498eeb0c5217919ad744466d?apiKey=00dd8100ff0f48749da2736e824a4b02&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/d25d790574e3df554b28a714104332c4e0e3f822498eeb0c5217919ad744466d?apiKey=00dd8100ff0f48749da2736e824a4b02&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d25d790574e3df554b28a714104332c4e0e3f822498eeb0c5217919ad744466d?apiKey=00dd8100ff0f48749da2736e824a4b02&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/d25d790574e3df554b28a714104332c4e0e3f822498eeb0c5217919ad744466d?apiKey=00dd8100ff0f48749da2736e824a4b02&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/d25d790574e3df554b28a714104332c4e0e3f822498eeb0c5217919ad744466d?apiKey=00dd8100ff0f48749da2736e824a4b02&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d25d790574e3df554b28a714104332c4e0e3f822498eeb0c5217919ad744466d?apiKey=00dd8100ff0f48749da2736e824a4b02&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/d25d790574e3df554b28a714104332c4e0e3f822498eeb0c5217919ad744466d?apiKey=00dd8100ff0f48749da2736e824a4b02&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/d25d790574e3df554b28a714104332c4e0e3f822498eeb0c5217919ad744466d?apiKey=00dd8100ff0f48749da2736e824a4b02&"
          className="self-center max-w-full aspect-[1.08] w-[184px]"
        />
        <div className="self-center mt-14 text-6xl whitespace-nowrap max-md:mt-10 max-md:text-4xl">
          Sign In{" "}
        </div>
        <div className="justify-center px-7 py-2.5 mt-14 text-center text-black whitespace-nowrap rounded-3xl max-md:px-5 max-md:mt-10">
          <button
            type="button"
            class="text-gray-900 bg-lightcolor border border-gray-300 focus:outline-none 
            hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-lg px-16 py-4 me-2 mb-2 
            dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-lightcolor dark:hover:border-gray-600 
            dark:focus:ring-lightcolor"
          >
            Sign in with Google
          </button>
        </div>
        <div className="self-center mt-10 text-center">
          _________ OR __________
        </div>
        
        <div className="mt-8 text-2xl">Username</div>
        <input
                  type="text"
                  id="username"
                  class="bg-lightcolor border border-gray-300 text-gray-900 text-sm rounded-full 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-lightcolor dark:border-gray-600 
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Username"
                />
        {/* <div className="shrink-0 mt-3.5 h-10 rounded-3xl" /> */}
        <div className="mt-12 text-2xl max-md:mt-10">Password</div>
        <input
                  type="text"
                  id="password"
                  class="bg-lightcolor border border-gray-300 text-gray-900 text-sm rounded-full 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-lightcolor dark:border-gray-600 
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Password"
                />
        {/* <div className="shrink-0 mt-2 h-10 rounded-3xl" /> */}
        <button className="self-center px-12 pt-3 pb-1 mt-12 text-2xl text-center rounded-3xl border border-white border-solid bg-maroon max-md:px-5 max-md:mt-10">
          Log In
        </button>
        <div className="self-center mt-20 w-full text-center max-md:mt-10">
          Don’t have an account?
          <button class="focus:outline-none 
            hover:border-white focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-lg px-16 py-4 me-2 mb-2 mt-4
            dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-lightcolor dark:hover:border-gray-600 
            dark:focus:ring-lightcolor"> Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
