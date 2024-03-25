import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AddBookToBookList } from "./AddToBookList";
import {RemoveBookFromBookList} from "./RemoveFromBookList.js";
import { DeleteBookList } from "./DeleteBookList.js";
import RenameBookListModal from "./RenameBookListModal.js";

const checkBookListCollectionEmpty = async (user) => {
  try {
    const querySnapshot = await getDocs(
      collection(db, "users", user.uid, "BookLists")
    );
    const numberOfDocuments = querySnapshot.size;

    if (numberOfDocuments === 0) {
      console.log("Collection is empty");
    } else {
      console.log(`Collection has ${numberOfDocuments} document(s)`);
      // You can also access the documents using querySnapshot.docs
    }
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
};

const getBookListsCount = async (user) => {
  try {
    const querySnapshot = await getDocs(
      collection(db, "users", user.uid, "BookLists")
    );
    const numberOfDocuments = querySnapshot.size;

    return numberOfDocuments;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
};

const getBookLists = async (user) => {
  try {
    const querySnapshot = await getDocs(
      collection(db, "users", user.uid, "BookLists")
    );
    const bookLists = querySnapshot.docs.map((doc) => doc.data());

    return bookLists;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
};

const DisplayBookLists = ({ user }) => {
  const [isCollectionEmpty, setIsCollectionEmpty] = useState(null);
  const [BookListCount, setBookListCount] = useState(null);
  const [BookLists, setBookLists] = useState(null);

  useEffect(() => {
    const fetchCollectionEmpty = async () => {
      const isEmpty = await checkBookListCollectionEmpty(user);
      setIsCollectionEmpty(isEmpty);
    };

    fetchCollectionEmpty();
  }, [user]);

  useEffect(() => {
    const fetchBookCount = async () => {
      const count = await getBookListsCount(user);
      console.log("Count: ", count);
      setBookListCount(count);
    };

    fetchBookCount();
  }, [isCollectionEmpty]);

  useEffect(() => {
    const fetchBookLists = async () => {
      const lists = await getBookLists(user);
      console.log("Lists: ", lists);
      setBookLists(lists);
    };

    fetchBookLists();
  }, [BookListCount]);

  if (isCollectionEmpty === null || BookListCount === null) {
    // Asynchronous operation is still in progress
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isCollectionEmpty ? (
        <p>Collection is empty</p>
      ) : (
        <>
          <p>
            <b>You have {BookListCount} book list(s)</b>
          </p>
          {Array.from({ length: BookListCount }, (_, index) => (
            <DisplayBookListItems key={index} bookData={BookLists[index] } userAuth={user}/>
          ))}
        </>
      )}
    </div>
  );
};

export const DisplayBookListItems = ({ bookData, userAuth }) => {
  const [show, setShow] = useState(false);
  const noShow = () => setShow(false);

  return (
    <div>
      <div className="flex flex-row gap-5 border-b border-gray-500">
        <div className="flex flex-row gap-2 border-r border-gray-500">
          <div>Title:</div>
          <div className="pr-4">{bookData.bookListTitle}</div>
        </div>
        <div className="flex flex-row gap-2">
          <div>Number of Books:</div>
          <div>{bookData.bookCount}</div>
        </div>
        <div>
          <Link to="/search/''" data-tip="Settings" data-for="settings-tooltip">
            <button className="hover:text-bold">Add Book</button>
          </Link>
        </div>
        <div>
          <button onClick={() =>DeleteBookList(bookData, userAuth)} className="hover:text-bold">Delete Book List</button>
        </div>
        <div>
          <button onClick={() =>setShow(true)} className="hover:text-bold">Rename Book List</button>
        </div>
      </div>
      {show && <RenameBookListModal show={show} onClose={noShow} user={userAuth} bookListData={bookData} />}

    </div>

  );
};

export const DisplayBookListsWhileAddingBook = ({ user }) => {
  const [isCollectionEmpty, setIsCollectionEmpty] = useState(null);
  const [BookListCount, setBookListCount] = useState(null);
  const [BookLists, setBookLists] = useState(null);

  useEffect(() => {
    const fetchCollectionEmpty = async () => {
      const isEmpty = await checkBookListCollectionEmpty(user);
      setIsCollectionEmpty(isEmpty);
    };

    fetchCollectionEmpty();
  }, [user]);

  useEffect(() => {
    const fetchBookCount = async () => {
      const count = await getBookListsCount(user);
      console.log("Count: ", count);
      setBookListCount(count);
    };

    fetchBookCount();
  }, [isCollectionEmpty]);

  useEffect(() => {
    const fetchBookLists = async () => {
      const lists = await getBookLists(user);
      console.log("Lists: ", lists);
      setBookLists(lists);
    };

    fetchBookLists();
  }, [BookListCount]);

  if (isCollectionEmpty === null || BookListCount === null) {
    // Asynchronous operation is still in progress
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isCollectionEmpty ? (
        <p>Collection is empty</p>
      ) : (
        <>
          <p>
            <b>You have {BookListCount} book list(s)</b>
          </p>
          {Array.from({ length: BookListCount }, (_, index) => (
            <DisplayBookListItemsWhileAddingBooks
              key={index}
              bookListData={BookLists[index]}
              userAuth={user}
            />
          ))}
        </>
      )}
    </div>
  );
};

export const DisplayBookListItemsWhileAddingBooks = ({
  bookListData,
  userAuth,
}) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const fetchedBooks = await Promise.all(
          bookListData.books.map(async (isbn) => {
            try {
              const bookRef = doc(db, "books", isbn);
              const docSnap = await getDoc(bookRef);

              if (docSnap.exists()) {
                return docSnap.data();
              } else {
                console.log("No such document for ISBN:", isbn);
                return null;
              }
            } catch (error) {
              console.error("Error fetching book data for ISBN:", isbn, error);
              return null;
            }
          })
        );

        setBooks(fetchedBooks.filter((book) => book !== null));
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [bookListData.books]);

  return (
    <div className="mb-10">
      <div className="flex flex-row gap-5 border-b border-gray-500">
        <div className="flex flex-row gap-2 border-r border-gray-500">
          <div>Title:</div>
          <div className="pr-4">{bookListData.bookListTitle}</div>
        </div>
        <div className="flex flex-row gap-2">
          <div>Number of Books:</div>
          <div>{bookListData.bookCount}</div>
        </div>
        <div>
          <button
            onClick={() => AddBookToBookList(bookListData, userAuth)}
            className="hover:text-bold"
          >
            Add Book
          </button>
        </div>
      </div>
      <div>
        <div className="mt-5">
          {bookListData.bookCount > 0 && (
            <>
              {books.map((book, index) => (
                  <div className="flex flex-row mb-5" key={index}>
                    {book ? (
                      <div key={index}>
                        <img
                          src={
                            book.volumeInfo &&
                            book.volumeInfo.imageLinks &&
                            book.volumeInfo.imageLinks.smallThumbnail
                          }
                          alt=""
                        />
                      </div>
                    ) : (
                      <>Error</>
                    )}

                    <div className="flex flex-col ml-5 mt-3">
                      <b>Book title:</b>
                      {book ? (
                        <div key={index}>
                          {book.volumeInfo && book.volumeInfo.title}
                        </div>
                      ) : (
                        <>Error</>
                      )}
                      <b>Author:</b>
                      {book ? (
                        <div key={index}>
                          {book.volumeInfo && book.volumeInfo.authors}
                        </div>
                      ) : (
                        <>Error</>
                      )}
                      <div>
                      <button onClick={() => RemoveBookFromBookList(bookListData, userAuth)}>Remove Book from book list</button>
                    </div>
                    </div>
                    
                  </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayBookLists;
