import React from 'react';
import { FaRegTimesCircle } from "react-icons/fa";
import { BookList } from './BookList';




const RenameBookListModal = ({ show, onClose, bookListData, user }) =>{
    if (!show) return null;
    const RenameBookList = (event) =>{
      event.preventDefault();
      console.log("Rename book list called!");
      const newTitle = document.getElementById("bookListName").value;

      console.log("Book List Data: ",bookListData);
      console.log("user: ",user);

      console.log("Book title: ", newTitle);
      const RenameList = new BookList(bookListData.bookListTitle, bookListData.genre, user,bookListData.docID);
      RenameList.RenameBookList(newTitle);
    }
    return(
<>
      <div className="flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-maroon z-10">
        <div className="overlay-inner rounded-lg bg-lightcolor w-700 h-550 p-6 relative box-border overflow-hidden ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600">
          <button className="close" onClick={onClose}>
            <FaRegTimesCircle />
          </button>
          <h2 className="text-xl pb-5 text-maroon">+ Rename Book List</h2>
          <form onSubmit={RenameBookList}>
          <h4 className="text-base pb-2">New name</h4>
          <div>
              <input
                type="text"
                id="bookListName"
                placeholder="New Book List name"
                className="text-sm p-2"
              />
          </div>

          <div className="flex justify-center mt-3">
              <button
                type="submit"
                className="bg-maroon text-white p-2 rounded-full text-sm "
              >
                Rename
              </button>
            </div>
          
          </form>
        </div>
      </div>
    </>
    );
}
export default RenameBookListModal;