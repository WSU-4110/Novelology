import React from 'react';
import NavigationBar from '../components/NavigationBar';
import BookRating from '../components/BookRating';
export default function BookInfo({showNavBar}){
    return (
      <>
        {showNavBar && <NavigationBar />}
        <div className="flex flex-col bg-white">
          <div className="flex flex-col items-center px-5 pt-16 pb-10 w-full bg-[linear-gradient(0deg,#F4F3EE_0%,#F4F3EE_100%,#89023E)] max-md:max-w-full">
            <div className="self-center bg-maroon text-white">Book Cover</div>
            <div id="book-name" className="pt-8"> 
            <div className="font-semibold">Book Name </div>
            </div>
            <div id="author-name" className="pt-8"> 
            <div className="font-semibold"> Author Name</div> </div>
            <div id="star-rating" className="pt-8"> 
            <div className="font-semibold">Star rating</div> </div>
            <div id="description" className="pt-8"> 
                <div className="text-center font-semibold">Description </div><br/>
                <div id="description-content" className="text-center w-[60em]">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to 
            make a type specimen book. It has survived not only five centuries, but also the leap into electronic 
            typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset 
            sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like 
            Aldus PageMaker including versions of Lorem Ipsum.
            </div>
            </div>
            <div id="genres" className="pt-8"> 
            <div className="font-semibold">Genres</div> </div>
            <div id="publisher" className="pt-8"> 
            <div className="font-semibold">Publisher</div></div>
            <div id="published-date" className="pt-8">
            <div className="font-semibold">Published Date</div></div>
            <div id="isbn" className="pt-8"> 
            <div className="font-semibold">ISBN</div></div>
            <div id="user-rating" className="pt-8"> 
            <div className="font-semibold">Your Rating</div>
            <BookRating />
            </div>
            <div>
            <div className="flex flex-row justify-center border-y-2 border-black mt-10 py-2 w-[58em]">
                <button className="border-r-2 w-[17em] border-black">Reviews</button>
                <button className="border-l-2 w-[17em] text-center border-black">Posts</button>
            </div>
            <hr className='h-[0.12em] mt-2 bg-black'/>
            </div>
            

          </div>
        </div>
        
      </>
    );
}