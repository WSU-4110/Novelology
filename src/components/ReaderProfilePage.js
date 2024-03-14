// import * as React from "react";

function ReaderProfilePage(props) {
  return (
    <div className="flex flex-col bg-white">
      <div className="flex flex-col pb-6 w-full max-md:max-w-full">
        <div className="flex justify-center items-center px-16 py-2.5 w-full text-base whitespace-nowrap bg-stone-700 max-md:px-5 max-md:max-w-full">
          <div className="flex gap-5 justify-between w-full max-w-[1140px] max-md:flex-wrap max-md:max-w-full">
            <div className="flex gap-5 justify-between max-md:flex-wrap max-md:max-w-full">
              <img
                loading="lazy"
                srcSet="..."
                className="shrink-0 aspect-[1.08] w-[85px]"
              />
             <div className="flex gap-5 justify-between pr-6 my-auto max-md:flex-wrap max-md:max-w-full">
                <button className="grow justify-center items-center px-16 py-2.5 my-auto rounded-3xl text-black text-opacity-60 w-fit max-md:px-5 max-md:max-w-full">
                  Enter your search title
                </button>
                <button className="justify-center px-4 py-4 font-light text-black rounded-3xl bg-[linear-gradient(0deg,#F4F3EE_0%,#F4F3EE_100%,#89023E)]">
                  Search
                </button>
              </div>
            </div>
            <button className="justify-center px-2.5 py-4 my-auto font-light text-black rounded-3xl bg-[linear-gradient(0deg,#F4F3EE_0%,#F4F3EE_100%,#89023E)]">
              Sign Out
            </button>
          </div>
        </div>
        <div className="self-center w-full max-w-[1245px] max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[84%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow max-md:mt-9 max-md:max-w-full">
                <div className="flex overflow-hidden relative flex-col items-center px-16 pt-20 pb-0.5 w-full min-h-[484px] max-md:px-5 max-md:max-w-full">
                  <img
                    loading="lazy"
                    srcSet="..."
                    className="object-cover absolute inset-0 size-full"
                  />
                  <img
                    loading="lazy"
                    srcSet="..."
                    className="mt-60 max-w-full mix-blend-darken aspect-[1.33] w-[221px] max-md:mt-10"
                  />
                </div>
                <div className="flex flex-col self-end mt-8 max-w-full text-white w-[624px]">
                    <button className="justify-center self-end py-2 text-sm rounded-xl border border-solid shadow-sm bg-stone-700 border-stone-400">
                    Edit Profile
                  </button>
                  <div className="mt-6 text-5xl font-medium text-black max-md:max-w-full max-md:text-4xl">
                    Jane Doe
                  </div>
                  <div className="self-start mt-5 ml-5 text-2xl text-center text-stone-400 max-md:ml-2.5">
                    @jane_doe_2024
                  </div>
                  <div className="justify-center self-start px-5 py-3 mt-6 ml-10 text-3xl text-center whitespace-nowrap rounded-xl shadow-sm bg-stone-400 max-md:pl-5 max-md:ml-2.5">
                    Reader
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[16%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col mt-12 text-2xl font-medium text-center text-black whitespace-nowrap max-md:mt-10">
                <div>Popular Users</div>
                <div className="shrink-0 mt-14 bg-zinc-300 h-[129px] max-md:mt-10" />
                <div className="shrink-0 mt-24 bg-zinc-300 h-[129px] max-md:mt-10" />
                <div className="shrink-0 mt-24 bg-zinc-300 h-[129px] max-md:mt-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex z-10 gap-0 mt-0 max-md:flex-wrap max-md:mt-0">
        <div className="flex flex-col items-center px-4 pt-1.5 pb-20 text-base font-medium text-center text-white whitespace-nowrap basis-0 bg-stone-700 max-md:hidden">
          <div className="text-white">Home</div>
          <button className="self-stretch mt-12 max-md:mt-10">
            Create Feed Post
          </button>
          <button className="mt-12 max-md:mt-10">Profile</button>
          <button className="mt-12 max-md:mt-10">Reader Q & A</button>
          <button className="mt-12 max-md:mt-10">Bookmarks</button>
          <button className="mt-12 max-md:mt-10">Book Lists</button>
          <button className="mt-12 max-md:mt-10">Settings</button>
        </div>
        <div className="flex flex-col grow shrink-0 self-start basis-0 mt-[710px] w-fit max-md:mt-10 max-md:max-w-full">
          <div className="flex flex-col items-center px-16 pt-10 w-full max-md:px-5 max-md:max-w-full">
            <div className="flex z-10 flex-col mb-0 w-full max-w-[992px] max-md:mb-2.5 max-md:max-w-full">
              <div className="flex flex-col px-16 text-3xl text-black max-md:px-5 max-md:max-w-full">
                <div className="self-center text-2xl text-yellow-900 whitespace-nowrap">
                  Romance Fantasy Comedy
                </div>
                <div className="self-center mt-8 text-center max-md:max-w-full">
                  200 Followers 150 Following
                </div>
                <div className="mt-7 max-md:max-w-full">
                  avid reader. 21. michigan. Home to the first Van Gogh in a
                  U.S. museum and Diego Rivera's &quot;Detroit Industry&quot;
                  murals. Free admission for tri-county residents.
                </div>
                <div className="flex gap-5 justify-between self-end mt-24 max-w-full font-medium text-center w-[773px] max-md:flex-wrap max-md:mt-10">
                  <div className="flex-auto">Book Lists</div>
                  <div className="flex gap-5 justify-between whitespace-nowrap">
                    <div className="flex-auto">Activity</div>
                    <div>Posts</div>
                  </div>
                </div>
              </div>
              <div className="mt-20 max-md:mt-10 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                  <div className="flex flex-col w-[54%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow mt-5 text-center max-md:mt-10 max-md:max-w-full">
                      <div className="text-2xl font-medium text-black max-md:max-w-full">
                        To Be Read
                      </div>
                      <div className="flex flex-col py-4 pl-6 mt-1.5 text-base border border-black border-solid mix-blend-color-burn bg-zinc-300 text-stone-400 max-md:pl-5 max-md:max-w-full">
                        <div className="self-end">See All</div>
                        <img
                          loading="lazy"
                          srcSet="..."
                          className="aspect-[0.62] w-[87px]"
                        />
                      </div>
                      <div className="shrink-0 mt-20 border border-black border-solid mix-blend-color-burn bg-zinc-300 h-[182px] max-md:mt-10 max-md:max-w-full" />
                    </div>
                  </div>
                  <div className="flex flex-col ml-5 w-[46%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col max-md:mt-10 max-md:max-w-full">
                      <div className="text-2xl font-medium text-black max-md:max-w-full">
                        You Commented
                      </div>
                      <div className="flex flex-col pt-1 pr-8 pb-3.5 pl-3.5 mt-3.5 text-xl border border-black border-solid max-md:pr-5 max-md:max-w-full">
                        <div className="flex gap-1 font-medium text-neutral-500">
                          <img
                            loading="lazy"
                            srcSet="..."
                            className="shrink-0 mix-blend-darken aspect-[1.22] w-[50px]"
                          />
                          <div className="flex-auto my-auto">
                            John Smith{" "}
                            <span className="text-neutral-500">
                              @john_smith2024
                            </span>
                          </div>
                        </div>
                        <div className="mt-8 text-2xl text-black whitespace-nowrap">
                          Chapter 35 of ATLA Was NOT It
                        </div>
                        <div className="mt-6 text-stone-500">
                          At the end of second book, I thought it was obvious
                          Thalia is the prophesied villain and the story might
                          take make a turn from there. But Rick Riordan
                          surprised me with this one, where a lot of new and
                          awesome characters came in to stage, and I just loved
                          it.
                          <br />
                          <br />
                          Like <br />
                          Comment <br />
                          Share
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center px-16 pt-14 w-full bg-[linear-gradient(0deg,#F4F3EE_0%,#F4F3EE_100%,#89023E)] max-md:px-5 max-md:max-w-full">
            <div className="flex z-10 flex-col mb-0 w-full max-w-[991px] max-md:mb-2.5 max-md:max-w-full">
              <div className="self-center ml-40 text-2xl font-medium text-black">
                You Liked
              </div>
              <div className="mt-3.5 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                  <div className="flex flex-col w-[54%] max-md:ml-0 max-md:w-full">
                    <div className="shrink-0 mx-auto mt-16 max-w-full border border-black border-solid mix-blend-color-burn bg-zinc-300 h-[182px] w-[512px] max-md:mt-10" />
                  </div>
                  <div className="flex flex-col ml-5 w-[46%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow justify-center text-xl border border-black border-solid max-md:mt-10 max-md:max-w-full">
                      <div className="flex flex-col pt-1 pr-8 pb-3.5 pl-3.5 border border-black border-solid max-md:pr-5 max-md:max-w-full">
                        <div className="flex gap-1 font-medium text-neutral-500">
                          <img
                            loading="lazy"
                            srcSet="..."
                            className="shrink-0 mix-blend-darken aspect-[1.22] w-[50px]"
                          />
                          <div className="flex-auto my-auto">
                            John Smith{" "}
                            <span className="text-neutral-500">
                              @john_smith2024
                            </span>
                          </div>
                        </div>
                        <div className="mt-8 text-2xl text-black whitespace-nowrap">
                          Chapter 35 of ATLA Was NOT It
                        </div>
                        <div className="mt-6 text-stone-500">
                          At the end of second book, I thought it was obvious
                          Thalia is the prophesied villain and the story might
                          take make a turn from there. But Rick Riordan
                          surprised me with this one, where a lot of new and
                          awesome characters came in to stage, and I just loved
                          it.
                          <br />
                          <br />
                          Like <br />
                          Comment <br />
                          Share
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col self-end mt-14 max-w-full w-[435px] max-md:mt-10">
                <div className="text-2xl font-medium text-black max-md:max-w-full">
                  You shared
                </div>
                <div className="flex flex-col justify-center mt-3.5 text-xl border border-black border-solid max-md:max-w-full">
                  <div className="flex flex-col pt-1 pr-8 pb-3.5 pl-3.5 border border-black border-solid max-md:pr-5 max-md:max-w-full">
                    <div className="flex gap-1 font-medium text-neutral-500">
                      <img
                        loading="lazy"
                        srcSet="..."
                        className="shrink-0 mix-blend-darken aspect-[1.22] w-[50px]"
                      />
                      <div className="flex-auto my-auto">
                        John Smith{" "}
                        <span className="text-neutral-500">
                          @john_smith2024
                        </span>
                      </div>
                    </div>
                    <div className="mt-8 text-2xl text-black whitespace-nowrap">
                      Chapter 35 of ATLA Was NOT It
                    </div>
                    <div className="mt-6 text-stone-500">
                      At the end of second book, I thought it was obvious Thalia
                      is the prophesied villain and the story might take make a
                      turn from there. But Rick Riordan surprised me with this
                      one, where a lot of new and awesome characters came in to
                      stage, and I just loved it.
                      <br />
                      <br />
                      Like <br />
                      Comment <br />
                      Share
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-end px-16 py-11 w-full bg-stone-700 max-md:px-5 max-md:max-w-full">
        <div className="mr-12 max-w-full w-[884px] max-md:mr-2.5">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[77%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col mt-3 text-3xl text-white max-md:mt-10 max-md:max-w-full">
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
                srcSet="..."
                className="grow shrink-0 max-w-full aspect-[1.01] w-[184px] max-md:mt-10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ReaderProfilePage;