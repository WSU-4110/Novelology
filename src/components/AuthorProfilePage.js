import * as React from "react";

function AuthorProfilePage(props) {
  return (
    <div className="flex flex-col bg-white">
      <div className="flex flex-col pb-6 w-full max-md:max-w-full">
        <div className="flex justify-center items-center px-16 py-2.5 w-full text-base whitespace-nowrap bg-stone-700 max-md:px-5 max-md:max-w-full">
          <div className="flex gap-5 justify-between items-center w-full max-w-[1080px] max-md:flex-wrap max-md:max-w-full">
            <img
              loading="lazy"
              srcSet="..."
              className="shrink-0 self-stretch aspect-[1.08] w-[85px]"
            />
            <div className="flex gap-5 justify-between self-stretch pr-6 my-auto max-md:flex-wrap max-md:max-w-full">
              <div className="grow justify-center items-center px-16 py-2.5 my-auto rounded-3xl text-black text-opacity-60 w-fit max-md:px-5 max-md:max-w-full">
                Enter your search title
              </div>
              <div className="justify-center px-4 py-4 font-light text-black rounded-3xl bg-[linear-gradient(0deg,#F4F3EE_0%,#F4F3EE_100%,#89023E)]">
                Search
              </div>
            </div>
            <div className="justify-center self-stretch px-2.5 py-4 my-auto font-light text-black rounded-3xl bg-[linear-gradient(0deg,#F4F3EE_0%,#F4F3EE_100%,#89023E)]">
              Sign Out
            </div>
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
                <div className="flex flex-col items-start self-end mt-8 max-w-full text-white w-[698px]">
                  <div className="justify-center self-end py-2 text-sm rounded-xl border border-solid shadow-sm bg-stone-700 border-stone-400">
                    Edit Profile
                  </div>
                  <div className="flex gap-3 mt-5 text-5xl font-medium text-black whitespace-nowrap max-md:text-4xl">
                    <div className="flex-auto max-md:text-4xl">
                      Marissa Smith
                    </div>
                    <img
                      loading="lazy"
                      srcSet="..."
                      className="shrink-0 self-start mt-2 rounded-full aspect-square bg-zinc-300 h-[29px] w-[29px]"
                    />
                  </div>
                  <div className="mt-5 ml-24 text-2xl text-center text-stone-400 max-md:ml-2.5">
                    @marissa_smith
                  </div>
                  <div className="px-4 pt-2.5 pb-4 mt-6 ml-28 text-3xl text-center whitespace-nowrap rounded-xl shadow-sm bg-stone-400 max-md:pr-5 max-md:ml-2.5">
                    Author
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
        <div className="flex flex-col items-center px-5 pt-1-.5 pb-20 text-base font-medium text-center text-white whitespace-nowrap basis-0 bg-stone-700 max-md:hidden">
          <div className="text-white">Home</div>
          <div className="self-stretch mt-12 max-md:mt-10">
            Create Feed Post
          </div>
          <div className="mt-12 max-md:mt-10">Profile</div>
          <div className="mt-12 max-md:mt-10">Reader Q & A</div>
          <div className="mt-12 max-md:mt-10">Bookmarks</div>
          <div className="mt-12 max-md:mt-10">Book Lists</div>
          <div className="mt-12 max-md:mt-10">Settings</div>
        </div>
        <div className="flex flex-col grow shrink-0 self-start basis-0 mt-[710px] w-fit max-md:mt-10 max-md:max-w-full">
          <div className="flex flex-col items-center px-16 pt-10 w-full max-md:px-5 max-md:max-w-full">
            <div className="flex flex-col items-center max-w-full w-[950px]">
              <div className="text-2xl text-yellow-900 whitespace-nowrap">
                Romance Fantasy Comedy
              </div>
              <div className="mt-8 text-3xl text-center text-black max-md:max-w-full">
                200 Followers 150 Following
              </div>
              <div className="self-stretch mt-7 text-3xl text-black max-md:max-w-full">
                avid reader. 21. michigan. Home to the first Van Gogh in a U.S.
                museum and Diego Rivera's &quot;Detroit Industry&quot; murals.
                Free admission for tri-county residents.
              </div>
              <div className="flex gap-5 justify-between mt-24 max-w-full text-3xl font-medium text-center text-black w-[810px] max-md:flex-wrap max-md:mt-10">
                <div className="flex-auto my-auto">Book Published</div>
                <div className="flex gap-5 justify-between whitespace-nowrap">
                  <div className="flex-auto">Activity</div>
                  <div>Posts</div>
                </div>
              </div>
              <div className="self-stretch mt-20 max-md:mt-10 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                  <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow mt-5 text-2xl font-medium text-center text-black max-md:mt-10">
                      <div className="flex gap-4">
                        <img
                          loading="lazy"
                          srcSet="..."
                          className="shrink-0 max-w-full aspect-[0.64] w-[115px]"
                        />
                        <div className="my-auto">
                          Normal People <br />
                          <span className="text-xl">by Marissa Smith</span>
                        </div>
                      </div>
                      <div className="flex gap-5 justify-between mt-11 max-md:mt-10">
                        <img
                          loading="lazy"
                          srcSet="..."
                          className="shrink-0 max-w-full aspect-[0.64] w-[115px]"
                        />
                        <div className="my-auto">
                          The Iliad <br />
                          <span className="text-xl">by Marissa Smith</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">
                      <div className=" mt-14 text-black max-md:mt-10 max-md:max-w-full">
                      {/* <div className="text-2xl font-medium text-black max-md:max-w-full"> */}
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
                          t the end of second book, I thought it was obvious
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
          <div className="flex flex-col items-end px-16 pt-14 w-full text-2xl font-medium bg-[linear-gradient(0deg,#F4F3EE_0%,#F4F3EE_100%,#89023E)] max-md:px-5 max-md:max-w-full">
            <div className="flex z-10 flex-col mr-48 mb-0 max-w-full w-[435px] max-md:mr-2.5 max-md:mb-2.5">
              <div className="text-black max-md:max-w-full">You Liked</div>
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
                      <span className="text-neutral-500">@john_smith2024</span>
                    </div>
                  </div>
                  <div className="mt-8 text-2xl text-black whitespace-nowrap">
                    Chapter 35 of ATLA Was NOT It
                  </div>
                  <div className="mt-6 text-stone-500">
                    t the end of second book, I thought it was obvious Thalia is
                    the prophesied villain and the story might take make a turn
                    from there. But Rick Riordan surprised me with this one,
                    where a lot of new and awesome characters came in to stage,
                    and I just loved it.
                    <br />
                    <br />
                    Like <br />
                    Comment <br />
                    Share
                  </div>
                </div>
              </div>
              <div className="mt-14 text-black max-md:mt-10 max-md:max-w-full">
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
                      <span className="text-neutral-500">@john_smith2024</span>
                    </div>
                  </div>
                  <div className="mt-8 text-2xl text-black whitespace-nowrap">
                    Chapter 35 of ATLA Was NOT It
                  </div>
                  <div className="mt-6 text-stone-500">
                    t the end of second book, I thought it was obvious Thalia is
                    the prophesied villain and the story might take make a turn
                    from there. But Rick Riordan surprised me with this one,
                    where a lot of new and awesome characters came in to stage,
                    and I just loved it.
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

export default AuthorProfilePage;