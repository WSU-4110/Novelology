import React, { useState, useEffect } from "react";
import NavigationBar from "../components/NavigationBar";
import BookRating from "../components/BookRating";
import { useParams } from "react-router-dom";
import { SearchISBN } from "../components/shared/SearchISBN";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import {AddBookToFirestore,CheckDuplicateBook} from "../functions/AddBook.js";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AddBookRating, DisplayUserBookRating, UserRated, RemoveRating } from '../functions/AddRatingToBook';
import AddToBookList from '../components/BookStacks/AddToBookList';

export default function BookInfo() {
  const [user] = useAuthState(auth);
  const { isbn } = useParams();
  const [check, setCheck] = useState(null);
  const [rating, setRating] = useState(null);
  const [existingRating, setExistingRating] = useState(null);
  const [BookData, setBookData] = useState([]);
  const [bookListShow, setBookListShow] = useState(false);
  const noBookListShow = () => setBookListShow(false);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const isADuplicateBook = await CheckDuplicateBook(isbn);
        if (isADuplicateBook) {
          const bookRef = doc(db, "books", isbn);
          const docSnap = await getDoc(bookRef);

          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setBookData(docSnap.data());
          } else {
            console.log("No such document!");
          }
        }
      };
      fetchData();
    } catch (e) {
      console.log("Error found in BookInfo useEffect: ", e);
    }
  }, [isbn]);

  useEffect(() => {
    console.log("Book data updated:", BookData);
  }, [BookData]); 

  const handleChangeInRating = (currentRating) => {
    setRating(currentRating);
    AddBookRating(currentRating,isbn,user);
  };
  
  useEffect(() => {
    console.log("rating from bookinfo: " + rating);
    const fetchData = async () => {
      const oldRating = await DisplayUserBookRating(user,isbn);
      console.log("Existing Rating-1: " + oldRating);
      setExistingRating(oldRating);
      console.log("Existing Rating-2: " + existingRating);
      // console.log("Type of:", typeof existingRating);

    }
    if (check) {
      fetchData();
  }
  }, [user,check]);

  useEffect(() => {
    console.log("Existing Rating-3: " + existingRating); 
    console.log("Type: ", typeof existingRating);
}, [existingRating]);

  useEffect(() => {
    const fetchData = async () => {
    const isRated = await UserRated(user,isbn);
    setCheck(isRated);
    console.log("check: ",check);
    }
    fetchData();
  },[rating,user]);

  useEffect(() => {
    const fetchData = async () => {
      const isRated = await UserRated(user,isbn);
      setCheck(isRated);
      console.log("check: ",check);
    }
    fetchData();
  });


  return (
    <>
      <div className="flex flex-col bg-white">
        <div className="flex flex-col items-center px-5 pt-16 pb-10 w-full bg-[linear-gradient(0deg,#F4F3EE_0%,#F4F3EE_100%,#89023E)] max-md:max-w-full">
          <div className="flex self-center bg-maroon text-white">
            {/* Book Cover */}
            {BookData? (
              <>
                <img
                  src={
                    BookData.volumeInfo &&
                    BookData.volumeInfo.imageLinks &&
                    BookData.volumeInfo.imageLinks.smallThumbnail
                  }
                  alt=""
                />
              </>
            ) : (
              <>
                <div className="flex justify-center items-center w-40 h-56 border-black border-2 bg-gray-200 text-black align-center">
                  <span>No Image Available</span>
                </div>
              </>
            )}
          </div>
          <div id="book-name" className="pt-8">
            <div className="font-semibold">
              {BookData && BookData.volumeInfo &&
              BookData.volumeInfo.title ? (
                <>{BookData.volumeInfo.title}</>
              ) : (
                <>No Information</>
              )}
            </div>
          </div>
          <div id="author-name" className="pt-8">
            <div className="font-semibold">
              {BookData && BookData.volumeInfo &&
              BookData.volumeInfo.authors ? (
                <>{BookData.volumeInfo.authors}</>
              ) : (
                <>No Information</>
              )}
            </div>
          </div>
          <div id="star-rating" className="pt-8">
            <div className="font-semibold">Star rating</div>
          </div>
          {user?(
            <div id="add-to-book-list" className="pt-8">
            <button onClick={()=>setBookListShow(true)} className="font-semibold bg-maroon p-3 rounded-2xl text-white hover:opacity-70">Add to Book List</button>
            </div>
          ):(<></>)}
          
          <div id="description" className="pt-8">
            <div className="text-center font-semibold">Description</div>
            <br />
            <div id="description-content" className="text-center w-[60em]">
              {BookData && BookData.volumeInfo &&
              BookData.volumeInfo.description ? (
                <>{BookData.volumeInfo.description}</>
              ) : (
                <>No Information</>
              )}
            </div>
          </div>
          <div id="genres" className="flex flex-row pt-8">
            <p className="font-semibold">Genres:&nbsp;&nbsp;</p>

            <div className="font-normal">
              {BookData && BookData.volumeInfo &&
              BookData.volumeInfo.categories ? (
                <>{BookData.volumeInfo.categories}</>
              ) : (
                <>No Information</>
              )}
            </div>
          </div>
          <div id="publisher" className="flex flex-row pt-8">
            <p className="font-semibold">Publisher:&nbsp;&nbsp;</p>
            <div className="font-normal">
              {BookData && BookData.volumeInfo &&
              BookData.volumeInfo.publisher ? (
                <>{BookData.volumeInfo.publisher}</>
              ) : (
                <>No Information</>
              )}
            </div>
          </div>
          <div id="published-date" className="flex flex-row pt-8">
            <p className="font-semibold">Published Date:&nbsp;&nbsp;</p>
            <div className="font-normal">
              {BookData && BookData.volumeInfo &&
              BookData.volumeInfo.publishedDate ? (
                <>{BookData.volumeInfo.publishedDate}</>
              ) : (
                <>No Information</>
              )}
            </div>
          </div>

          <div id="isbn" className="flex flex-row pt-8">
            <p className="font-semibold">ISBN:&nbsp;&nbsp;</p>
            <div className="font-normal">
              {BookData && BookData.volumeInfo? (
                <>
                  {BookData.volumeInfo.industryIdentifiers
                    .map((identifier) => identifier.identifier)
                    .join(", ")}
                </>
              ) : (
                <>No Information</>
              )}
            </div>
          </div>
          {user ? (

            <div id="user-rating" className="pt-8">
              <p className="font-semibold text-center">Your Rating</p>
              {/* {check ? (<div>User Rating:{check}</div>):(<></>)} */}
              {existingRating !== null ?(
                <>
                <button onClick={()=>RemoveRating(user,isbn)}>Remove Rating</button>

              <BookRating RatingChange={handleChangeInRating} initialRating={existingRating}/>
                </>
              )
                :(<>
                <BookRating RatingChange={handleChangeInRating} initialRating={0}/>

                </>)}

            </div>
          ) : (
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
        {bookListShow && <AddToBookList show={bookListShow} onClose={noBookListShow} uniqueBook={BookData}/>}

      </div>
    </>
  );
}