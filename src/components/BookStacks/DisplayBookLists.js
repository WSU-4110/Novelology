import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import React, { useState, useEffect } from "react";

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
            <DisplayBookListItems key={index} bookData={BookLists[index]} />
          ))}
        </>
      )}
    </div>
  );
};

export const DisplayBookListItems = ({ bookData }) => {
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
          <button className="hover:text-bold">
          Add Book
          </button>
        </div>
        <div>
          <button className="hover:text-bold">
          Edit
          </button>
        </div>
        
      </div>
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
            <DisplayBookListItemsWhileAddingBooks key={index} bookData={BookLists[index]} />
          ))}
        </>
      )}
    </div>
  );
};

export const DisplayBookListItemsWhileAddingBooks = ({ bookData }) => {
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
          <button className="hover:text-bold">
          Add Book
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default DisplayBookLists;
