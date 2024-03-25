import React from 'react';
import { BookList } from './BookList';

export const DeleteBookList=(bookListData, user)=>{
    console.log("delete book list called.");
    console.log("Book List Data: ",bookListData);
    console.log("user: ",user);
    const DeleteList = new BookList(bookListData.bookListTitle, bookListData.genre, user,bookListData.docID);
    DeleteList.DeleteBookList();
  }

