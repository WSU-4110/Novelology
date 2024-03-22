import React, {useState,useEffect} from 'react';
import NavigationBar from '../components/NavigationBar';
import BookRating from '../components/BookRating';
import {useParams} from 'react-router-dom';
import { SearchISBN } from '../components/shared/SearchISBN';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { AddBookToFirestore,CheckDuplicateBook } from '../functions/AddBook.js'
// import { AddBookRating } from '../functions/AddRatingToBook';

export default function BookInfo({showNavBar}){
  const [user] = useAuthState(auth);
  const { isbn } = useParams(); 
  const [rating, setRating] = useState(null);
  const bookData = SearchISBN(isbn);
  if (bookData.length == 0){
    console.log("Error: Book Not Available from Google API (BookLength=0)")
  }
  console.log(bookData);
  useEffect(() => {
    const fetchData = async()=>{
    const isADuplicateBook = await CheckDuplicateBook(isbn);
    if (!isADuplicateBook){
      AddBookToFirestore(bookData[0]);
    }
    }
    fetchData();
    console.log("Book Data from BookInfo inside useEffect: ", bookData[0]);
  },[bookData])

  const handleChangeInRating = (currentRating) => {
    setRating(currentRating);
  }
  useEffect(() => {
    console.log("rating from bookinfo: " + rating);
    // AddBookRating(rating,isbn);
  },[rating])


  // let thumbnail = bookData[0].volumeInfo.imageLinks && bookData[0].volumeInfo.imageLinks.smallThumbnail;

    return (
      <>
        {showNavBar && <NavigationBar />}
        <div className="flex flex-col bg-white">
          <div className="flex flex-col items-center px-5 pt-16 pb-10 w-full bg-[linear-gradient(0deg,#F4F3EE_0%,#F4F3EE_100%,#89023E)] max-md:max-w-full">
            <div className="self-center bg-maroon text-white">
              {/* Book Cover */}
              {bookData.length > 0 ? (
                  <><img src={bookData[0].volumeInfo.imageLinks && bookData[0].volumeInfo.imageLinks.smallThumbnail} alt='' /></>
                ) : (
                  <>No Information</>
                )}

              </div>
            <div id="book-name" className="pt-8">
              <div className="font-semibold">
                {bookData && bookData.length > 0 && bookData[0].volumeInfo.title ? (
                  <>{bookData[0].volumeInfo.title}</>
                ) : (
                  <>No Information</>
                )}
              </div>
            </div>
            <div id="author-name" className="pt-8">
              <div className="font-semibold"> 
              {bookData && bookData.length > 0 && bookData[0].volumeInfo.authors ? (
                  <>{bookData[0].volumeInfo.authors}</>
                ) : (
                  <>No Information</>
                )}
              </div>
            </div>
            <div id="star-rating" className="pt-8">
              <div className="font-semibold">Star rating</div>
            </div>
            <div id="description" className="pt-8">
              <div className="text-center font-semibold">
                Description 
                </div>
              <br />
              <div id="description-content" className="text-center w-[60em]">
              {bookData && bookData.length > 0 && bookData[0].volumeInfo.description ? (
                  <>{bookData[0].volumeInfo.description}</>
                ) : (
                  <>No Information</>
                )}
              </div>
            </div>
            <div id="genres" className="flex flex-row pt-8">
              <p className="font-semibold">Genres:&nbsp;&nbsp;
              </p>

              <div className="font-normal">
              {bookData && bookData.length > 0 && bookData[0].volumeInfo.categories ? (
                  <>{bookData[0].volumeInfo.categories}</>
                ) : (
                  <>No Information</>
                )}
                </div>
            </div>
            <div id="publisher" className="flex flex-row pt-8">
              <p className="font-semibold">Publisher:&nbsp;&nbsp;
              </p>
              <div className="font-normal">
              {bookData && bookData.length > 0 && bookData[0].volumeInfo.publisher ? (
                  <>{bookData[0].volumeInfo.publisher}</>
                ) : (
                  <>No Information</>
                )}
                </div>
            </div>
            <div id="published-date" className="flex flex-row pt-8">
              <p className="font-semibold">Published Date:&nbsp;&nbsp;
              </p>
              <div className="font-normal">
              {bookData && bookData.length > 0 && bookData[0].volumeInfo.publishedDate ? (
                  <>{bookData[0].volumeInfo.publishedDate}</>
                ) : (
                  <>No Information</>
                )}
                </div>
            </div>

            <div id="isbn" className="flex flex-row pt-8">
              <p className="font-semibold">ISBN:&nbsp;&nbsp;</p>
              <div className="font-normal">
              {bookData && bookData.length > 0 ? (
                  <>{bookData[0].volumeInfo.industryIdentifiers.map(identifier=>identifier.identifier).join(', ')}</>
                ) : (
                  <>No Information</>
                )}
                </div>
            </div>
            {user?(<div id="user-rating" className="pt-8">
              <p className="font-semibold text-center">Your Rating</p>
              <BookRating RatingChange={handleChangeInRating}/>
            </div>):(
              <div></div>
            )}
            
            <div>
              <div className="flex flex-row justify-center border-y-2 border-black mt-10 py-2 w-[58em]">
                <button className="border-r-2 w-[17em] border-black">
                  Reviews
                </button>
                <button className="border-l-2 w-[17em] text-center border-black">
                  Posts
                </button>
              </div>
              <hr className="h-[0.12em] mt-2 bg-black" />
            </div>
          </div>
        </div>
      </>
    );
}