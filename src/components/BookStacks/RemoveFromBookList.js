import React from 'react';
import { BookList } from './BookList';
export const RemoveBookFromBookList = (bookListData, userAuth,bookID) =>{
    console.log("Remove book from book list called.");
    console.log("Book list data: ",bookListData);
    console.log("userAuth: ",userAuth);
    console.log("isbn: ",bookID);
    const RemoveBook = new BookList(bookListData.bookListTitle, bookListData.genre, userAuth,bookListData.docID);
    RemoveBook.RemoveBookFromBookList(bookID);
}

const RemoveFromBookList = ()=>{
    return (
        <>
         <div className="flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-maroon z-10">
        <div className="overlay-inner rounded-lg bg-lightcolor w-700 h-550 p-6 relative box-border overflow-hidden ring-1 ring-inset ring-gray-300 
        placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
        style={{ maxHeight: "90vh", overflowY: "auto" }}>
        Book Successfully removed!

        </div>
        </div>
        </>
    )
}
export default RemoveFromBookList;