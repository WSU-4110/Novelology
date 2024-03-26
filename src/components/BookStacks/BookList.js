import React from "react";
import { doc, setDoc, getDoc,getDocs, collection, addDoc, updateDoc, deleteDoc , increment, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase";

export class BookList {
    
    constructor(listName, genre, user,id) {
        this.listName = listName;
        this.genre = genre;
        this.user = user;
        this.docID = id;
    }

    CreateBookList = async() =>{
        const uid = this.user.uid;
        try {
            const subcollectionRef = collection(db, "users", uid, "BookLists");
            const docRef = doc(subcollectionRef);
      
            await setDoc(docRef, {
              bookListTitle: this.listName,
              genre: this.genre,
              bookCount:0,
              books:[],
              timestamp: new Date(),
              docID: docRef.id,
            });
            this.docID = docRef.id;
            console.log("New Book List created.");
            console.log('Document written with ID: ', this.docID);

          } catch (error) {
            console.error("Error adding book list:", error);
          }
    }

    getBookList= async(docID) => {
      const uid = this.user.uid;
      try {
        const parentDocRef = doc(db, 'users', uid);
        const parentDocSnap = await getDoc(parentDocRef);
    
        if (parentDocSnap.exists()) {
          const subcollectionRef = collection(parentDocRef, 'BookLists');
          const subcollectionQuerySnapshot = await getDocs(subcollectionRef);
    
          subcollectionQuerySnapshot.forEach((doc) => {
            if (doc.id === docID) {
              console.log('Subcollection document data:', doc.data());
              this.listName = doc.data().bookListTitle;
              this.genre = doc.data().genre;
              this.docID = doc.id;
              this.books = doc.data().books;
              this.bookCount = doc.data().bookCount;
              const data= doc.data();
              return data;
            }
          });
        } else {
          console.log('Parent document does not exist');
        }

        } catch (error) {
          console.error("Error fetching subcollection data:", error);
        }
    }
    AddBookToBookList = async(isbn) =>{
      const uid = this.user.uid;
      try {
        const subcollectionRef = collection(db, "users", uid, "BookLists");
        const docRef = doc(subcollectionRef, this.docID);
  
        // Set document data to the document reference
        await updateDoc(docRef, {
          bookCount:increment(1),
          books:arrayUnion(isbn),
        });
        console.log(`New Book added to ${this.listName}.`);

      } catch (error) {
        console.error("Error adding book to book list:", error);
      }

    }

    RemoveBookFromBookList = async(isbn) =>{
      const uid = this.user.uid;
      try {
        const subcollectionRef = collection(db, "users", uid, "BookLists");
        const docRef = doc(subcollectionRef, this.docID);
        
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()){
          console.error("Document does not exist!");
          return;
        }
        const currentBookCount = docSnap.data().bookCount;

        const newCountValue = currentBookCount - 1;
        const currentBooks = docSnap.data().books; 
        const updatedBooks = currentBooks.filter(item => item !== isbn);
        await updateDoc(docRef, {
              books: updatedBooks,
              bookCount:newCountValue,
 
            });
        console.log("Book removed from book list!")
      }
      catch(e){
        console.error("Error removing book",e);
      }
    }

    RenameBookList = async(title) =>{
      const uid = this.user.uid;
      try {
        const subcollectionRef = collection(db, "users", uid, "BookLists");
        const docRef = doc(subcollectionRef, this.docID);
  
        // Set document data to the document reference
        await updateDoc(docRef, {
          bookListTitle: title,
        });
        this.listName = title;

        console.log(`Book List renamed to ${this.listName}.`);
      } catch (error) {
        console.error("Error renaming the book list:", error);
      }
    }
    getBookCount = (props) =>{}
    DisplayBookList = () =>{
        console.log("display book list called");
        console.log(this.listName);
        console.log(this.genre);
        console.log(this.user);
        console.log(this.docID);
    }
    DeleteBookList = async() =>{

      const uid = this.user.uid;
      try {
        const subcollectionRef = collection(db, "users", uid, "BookLists");
        const docRef = doc(subcollectionRef, this.docID);
  
        await deleteDoc(docRef);
        console.log(`Document successfully deleted.`);

      } catch (error) {
        console.error("Error deleting book list", error);
      }

    }
}