import react from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import {BookList} from "./BookList.js";

const NewBookListModal = ({ show, onClose, user }) => {
  if (!show) return null;

  const CreateNewBookList=(event)=>{
    event.preventDefault();
    console.log("Creating new book list");
    const bookListName = document.getElementById("bookListName").value;
    const bookListGenre = document.getElementById("genres").value;
    const userDetails = user;
    console.log("bookListName: " + bookListName);
    console.log("bookListGenre: " + bookListGenre);
    console.log("userDetails: " + userDetails);
    const NewList = new BookList(bookListName, bookListGenre, userDetails,null);
    NewList.CreateBookList();
    NewList.DisplayBookList();
    
  }
  return (
    <>
      <div className="flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-maroon z-10">
        <div className="overlay-inner rounded-lg bg-lightcolor w-700 h-550 p-6 relative box-border overflow-hidden ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600">
          <button className="close" onClick={onClose}>
            <FaRegTimesCircle />
          </button>
          <h2 className="text-xl pb-5 text-maroon">+ New Book List</h2>
          <form onSubmit={CreateNewBookList}>
          <h4 className="text-base pb-2">Name of the Book List</h4>

          <div className="flex flex-col">
            <div>
              <input
                type="text"
                id="bookListName"
                placeholder="New Book List name"
                className="text-sm p-2"
              />
            </div>
            <h4 className="text-base mt-4 pb-2">Genres:</h4>
            <div>
              <input
                type="text"
                id="genres"
                placeholder="Enter a genre"
                className="text-sm p-2"
              />
            </div>
            <div className="flex justify-center mt-3">
              <button
                type="submit"
                className="bg-maroon text-white p-2 rounded-full text-sm "
              >
                Create
              </button>
            </div>
          </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default NewBookListModal;
