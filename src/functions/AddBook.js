import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export const AddBookToFirestore = async (BookData,navigate) => {

  console.log("Book data: ",BookData);
  if (BookData){
  const isbn = GetISBN13(BookData);
  const book_volumeInfo = BookData.volumeInfo;
  const isDuplicateBook = await CheckDuplicateBook(isbn);
  console.log("isDuplicateBook checked: ", isDuplicateBook);
  if (!isDuplicateBook) {
    console.log("Adding book to database.....");
    await setDoc(doc(db, "books", isbn), {
      volumeInfo: book_volumeInfo,
      rating: 0,
      NumberOfRatings: 0,
    });
    console.log("Book successfully added to database.");
  } else {
    console.log("Book already exists in the database.");
    
  }
  navigate(
    "/bookinfo/" + isbn
  );
} else{
  console.log("Book Data is still being retrieved from Google Books.");
}

};

export const CheckDuplicateBook = async (isbn) => {
  try {
    const docRef = doc(db, "books", isbn);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  } catch (error) {
    console.error("Error checking for duplicate book:", error);
  }
};

export const GetISBN13 = (BookData) => {
  console.log("GetISBN13 ran!");
  if (BookData && BookData.volumeInfo && BookData.volumeInfo.industryIdentifiers){
  const industryIdentifiers = BookData.volumeInfo.industryIdentifiers;
  console.log("ISBNs:", industryIdentifiers);

  var index = industryIdentifiers.findIndex(function (o) {
    return o.type === "ISBN_13";
  });

  var isbn;
  if (index !== -1) {
    console.log("Object with type 'ISBN_13' found at index:", index);
    isbn = industryIdentifiers[index].identifier;

  } else {
    if (industryIdentifiers)
    console.log("Object with type 'ISBN_13' not found.");
    isbn = industryIdentifiers[0].identifier;

  }
  console.log("Exiting GetISBN13.")
  return isbn;
}
else {
  console.log("Industry Identifiers not found for the book.");
  return;
}
}
