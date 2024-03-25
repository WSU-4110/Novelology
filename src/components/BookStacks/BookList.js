import React from "react";
import { doc, setDoc, getDoc, collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

export class BookList {
    constructor(listName, genre, user) {
        this.listName = listName;
        this.genre = genre;
        this.user = user;
        this.docID = null;
        this.CreateBookList();
    }
    CreateBookList = async() =>{
        const uid = this.user.uid;
        try {
            const subcollectionRef = collection(db, "users", uid, "BookLists");
            const docRef = doc(subcollectionRef);
      
            // Set document data to the document reference
            await setDoc(docRef, {
              bookListTitle: this.listName,
              genre: this.genre,
              bookCount:0,
              books:[],
              timestamp: new Date(),
            });
            this.docID = docRef.id;
            console.log("New Book List created.");
            console.log('Document written with ID: ', this.docID);

          } catch (error) {
            console.error("Error adding book list:", error);
          }
    }
    AddBookToBookList = () =>{

    }
    RemoveBookFromBookList = (props) =>{}
    RenameBookList = () =>{

    }
    getBookCount = (props) =>{}
    DisplayBookList = () =>{
        console.log("display book list called");
        console.log(this.listName);
        console.log(this.genre);
        console.log(this.user);
        console.log(this.docID);
    }
    DeleteBookList = (props) =>{}
}