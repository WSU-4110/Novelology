import React from 'react';
import { BookList } from './BookList';
// import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom

export const DeleteBookList=(bookListData, user)=>{
    console.log("delete book list called.");
    console.log("Book List Data: ",bookListData);
    console.log("user: ",user);
    const DeleteList = new BookList(bookListData.bookListTitle, bookListData.genre, user,bookListData.docID);
    DeleteList.DeleteBookList();
    // window.location.href = '/readerProfilePage';
    // const history = useHistory(); // Initialize history hook

  // // Use history.push to navigate without full page reload
  // history.push('/readerProfilePage');
  }
   
