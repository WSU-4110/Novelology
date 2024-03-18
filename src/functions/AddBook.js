import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import axios from 'axios';

export const AddBookToFirestore = async (isbn) => {
  try {
    console.log("isbn called from addBook function: ", isbn);
    console.log("before");
    var bookData;
    try {
      const response = await axios.get('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn);
      const num = response.data.totalItems;
      console.log("number of items: ", num);
      if (num > 0){
      const book = response.data.items;

      console.log("book: ",book);
      bookData = book;}
      else {
        console.log("No results found.");
      }
    } catch (error) {
      console.error("Error occurred during API request:", error);
    }

    if (bookData && bookData.length >0) {
    console.log("bookData after try loop: ",bookData);
    const book_title = bookData[0].volumeInfo.title;
    console.log("book_title: ",book_title);
    const ISBNs = bookData[0].volumeInfo.industryIdentifiers.map(identifier=>identifier.identifier);
  
    console.log("ISBNs: ",ISBNs);

    await setDoc(doc(db, "books", book_title), {
      title: book_title,
      isbn: ISBNs,
      rating: 0,
    });
  }
    console.log("Book added successfully.");
  } catch (error) {
    console.error("Error adding book:", error);
  }
};

