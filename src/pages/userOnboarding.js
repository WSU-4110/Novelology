import * as React from "react";

function userOnboarding(props) {
  return (
    <div className="flex flex-col pb-14 bg-white">
      <div className="flex flex-col justify-center items-start px-16 py-2.5 w-full text-3xl text-white bg-stone-700 max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 justify-between ml-32 max-w-full w-[648px] max-md:flex-wrap">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/90804d6ee9d466025c14df08fa70f00a89bb57ba3311e6facbb8d5175ed0b010?apiKey=00dd8100ff0f48749da2736e824a4b02&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/90804d6ee9d466025c14df08fa70f00a89bb57ba3311e6facbb8d5175ed0b010?apiKey=00dd8100ff0f48749da2736e824a4b02&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/90804d6ee9d466025c14df08fa70f00a89bb57ba3311e6facbb8d5175ed0b010?apiKey=00dd8100ff0f48749da2736e824a4b02&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/90804d6ee9d466025c14df08fa70f00a89bb57ba3311e6facbb8d5175ed0b010?apiKey=00dd8100ff0f48749da2736e824a4b02&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/90804d6ee9d466025c14df08fa70f00a89bb57ba3311e6facbb8d5175ed0b010?apiKey=00dd8100ff0f48749da2736e824a4b02&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/90804d6ee9d466025c14df08fa70f00a89bb57ba3311e6facbb8d5175ed0b010?apiKey=00dd8100ff0f48749da2736e824a4b02&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/90804d6ee9d466025c14df08fa70f00a89bb57ba3311e6facbb8d5175ed0b010?apiKey=00dd8100ff0f48749da2736e824a4b02&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/90804d6ee9d466025c14df08fa70f00a89bb57ba3311e6facbb8d5175ed0b010?apiKey=00dd8100ff0f48749da2736e824a4b02&"
            className="shrink-0 aspect-[1.08] w-[85px]"
          />
          <div className="flex-auto my-auto">User Onboarding</div>
        </div>
      </div>
      <div className="flex flex-col items-center px-16 pt-20 pb-9 w-full bg-[linear-gradient(0deg,#F4F3EE_0%,#F4F3EE_100%,#89023E)] max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col mt-12 max-w-full w-[928px] max-md:mt-10">
          <div className="flex justify-center items-center px-16 py-6 shadow-sm bg-stone-700 bg-opacity-50 max-md:px-5 max-md:max-w-full">
            <div className="flex flex-col max-w-full w-[721px]">
              <div className="self-center text-3xl text-center text-black whitespace-nowrap">
                Upload your profile picture
              </div>
              <div className="max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                  <div className="flex flex-col w-[45%] max-md:ml-0 max-md:w-full">
                    <div className="shrink-0 mx-auto rounded-full aspect-square bg-zinc-300 h-[250px] w-[262px] max-md:mt-10" />
                  </div>
                  <div className="flex flex-col ml-5 w-[55%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow items-center mt-6 text-3xl text-center text-black whitespace-nowrap max-md:mt-10">
                      <div className="justify-center self-stretch px-8 py-3.5 rounded-3xl bg-stone-700 bg-opacity-70 max-md:px-5">
                        View Current Picture
                      </div>
                      <div className="justify-center px-8 py-3.5 mt-6 rounded-3xl bg-stone-700 bg-opacity-70 max-md:px-5">
                        Upload picture
                      </div>
                      <div className="justify-center px-8 py-2.5 mt-5 rounded-3xl bg-stone-700 bg-opacity-70 max-md:px-5">
                        Remove picture
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="items-center px-16 pt-7 pb-56 mt-32 text-3xl text-center text-black whitespace-nowrap shadow-sm bg-stone-700 bg-opacity-50 max-md:px-5 max-md:pb-10 max-md:mt-10 max-md:max-w-full">
            Bio
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center px-16 pt-12 w-full text-3xl text-black bg-[linear-gradient(0deg,#F4F3EE_0%,#F4F3EE_100%,#89023E)] max-md:px-5 max-md:max-w-full">
        <div className="flex z-10 flex-col items-center mb-0 w-full max-w-[1120px] max-md:mb-2.5 max-md:max-w-full">
          <div className="items-start px-16 pt-7 pb-24 max-w-full text-center whitespace-nowrap shadow-sm bg-stone-700 bg-opacity-50 w-[546px] max-md:pr-5 max-md:pl-6">
            Are you a reader or author?
          </div>
          <div className="items-center px-16 pt-7 pb-24 mt-44 max-w-full text-center whitespace-nowrap shadow-sm bg-stone-700 bg-opacity-50 w-[548px] max-md:px-5 max-md:mt-10">
            Your Pronouns *
          </div>
          <div className="mt-16 max-md:mt-10">
            Tell us some of your interests:
          </div>
          <div className="flex flex-col items-start self-stretch px-16 pt-9 pb-20 mt-14 text-center shadow-sm bg-stone-700 bg-opacity-50 max-md:px-5 max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 justify-between mb-24 ml-12 max-w-full w-[806px] max-md:flex-wrap max-md:mb-10">
              <div className="flex-auto">Preferred Genres</div>
              <div className="flex-auto">Choose from </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col pt-20 w-full bg-[linear-gradient(0deg,#F4F3EE_0%,#F4F3EE_100%,#89023E)] max-md:max-w-full">
        <div className="self-center mt-48 max-w-full w-[930px] max-md:mt-10">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[57%] max-md:ml-0 max-md:w-full">
              <div className="grow justify-center items-center px-16 py-6 w-full text-5xl text-center text-black whitespace-nowrap rounded-3xl border-black border-solid shadow-sm bg-stone-700 bg-opacity-80 border-[3px] max-md:px-5 max-md:mt-10 max-md:text-4xl">
                SUBMIT
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[43%] max-md:ml-0 max-md:w-full">
              <div className="grow justify-center items-center px-16 py-6 w-full text-5xl text-center text-black whitespace-nowrap rounded-3xl border-black border-solid shadow-sm bg-stone-700 bg-opacity-80 border-[3px] max-md:px-5 max-md:mt-10 max-md:text-4xl">
                RESET
              </div>
            </div>
          </div>
        </div>
        <div className="flex z-10 justify-center items-center px-16 py-10 mt-44 mb-0 w-full bg-stone-700 max-md:px-5 max-md:mt-10 max-md:mb-2.5 max-md:max-w-full">
          <div className="max-w-full w-[884px]">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
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
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/b9de546299d3772d0d0a43bd90f06e05a170da1f6e243157b4e8b66597d1f1a5?apiKey=00dd8100ff0f48749da2736e824a4b02&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/b9de546299d3772d0d0a43bd90f06e05a170da1f6e243157b4e8b66597d1f1a5?apiKey=00dd8100ff0f48749da2736e824a4b02&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b9de546299d3772d0d0a43bd90f06e05a170da1f6e243157b4e8b66597d1f1a5?apiKey=00dd8100ff0f48749da2736e824a4b02&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/b9de546299d3772d0d0a43bd90f06e05a170da1f6e243157b4e8b66597d1f1a5?apiKey=00dd8100ff0f48749da2736e824a4b02&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/b9de546299d3772d0d0a43bd90f06e05a170da1f6e243157b4e8b66597d1f1a5?apiKey=00dd8100ff0f48749da2736e824a4b02&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b9de546299d3772d0d0a43bd90f06e05a170da1f6e243157b4e8b66597d1f1a5?apiKey=00dd8100ff0f48749da2736e824a4b02&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/b9de546299d3772d0d0a43bd90f06e05a170da1f6e243157b4e8b66597d1f1a5?apiKey=00dd8100ff0f48749da2736e824a4b02&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/b9de546299d3772d0d0a43bd90f06e05a170da1f6e243157b4e8b66597d1f1a5?apiKey=00dd8100ff0f48749da2736e824a4b02&"
                  className="grow shrink-0 max-w-full aspect-[1.01] w-[184px] max-md:mt-10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default userOnboarding;