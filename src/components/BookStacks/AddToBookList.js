import react from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import {DisplayBookListsWhileAddingBook} from "./DisplayBookLists";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase.js";
import {GetISBN13} from "../../functions/AddBook.js";
import {BookList} from "./BookList.js"
var book;
export const AddBookToBookList = (bookListData,userAuth) =>{
  console.log("AddBookToBookList ran");
  const ISBN13 = GetISBN13(book);
  console.log(ISBN13);
  console.log(bookListData);
  const addingBookToBookList = new BookList(bookListData.bookListTitle,bookListData.genre, userAuth, bookListData.docID);
  addingBookToBookList.AddBookToBookList(ISBN13);
}

const AddToBookList = ({ show, onClose,uniqueBook }) => {
  const [user] = useAuthState(auth);
  book = uniqueBook;
  if (!show) return null;

  return (
    <>
      <div className="flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-maroon z-10">
        <div className="overlay-inner rounded-lg bg-lightcolor w-700 h-550 p-6 relative box-border overflow-hidden ring-1 ring-inset ring-gray-300 
        placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
        style={{ maxHeight: "90vh", overflowY: "auto" }}>
          <button className="close" onClick={onClose}>
            <FaRegTimesCircle />
          </button>
          <h2 className="text-xl pb-5 text-maroon">Add this book to your book lists</h2>
          <h4 className="text-base pb-2">Select a book list</h4>
          <DisplayBookListsWhileAddingBook user={user} >
                      </DisplayBookListsWhileAddingBook>
          <div className="flex flex-col">
            
            
          </div>
        </div>
      </div>
    </>
  );
};
export default AddToBookList;
