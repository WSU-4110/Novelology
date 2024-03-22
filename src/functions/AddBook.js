import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const AddBookToFirestore = async (BookData) => {
  console.log("Book data: ",BookData);
  if (BookData){
  const book_title = BookData.volumeInfo.title ?(BookData.volumeInfo.title):('No information');
  const book_author = BookData.volumeInfo.authors? (BookData.volumeInfo.authors):('No information');
  console.log("Title: ", book_title);
  const industryIdentifiers = BookData.volumeInfo.industryIdentifiers;
  console.log("ISBNs: :", industryIdentifiers);

  var index = industryIdentifiers.findIndex(function (o) {
    return o.type === "ISBN_13";
  });
  var isbn, ISBNs;
  if (index !== -1) {
    console.log("Object with type 'ISBN_13' found at index:", index);
    isbn = industryIdentifiers[index].identifier;
    ISBNs = industryIdentifiers;
    console.log("ISBNs from AddBookToFirestore: ", ISBNs);
  } else {
    console.log("Object with type 'ISBN_13' not found.");
    isbn = industryIdentifiers[0].identifier;
    ISBNs = industryIdentifiers;
    console.log("ISBNs from AddBookToFirestore: ", ISBNs);
  }

  const isDuplicateBook = await CheckDuplicateBook(isbn);
  console.log("isDuplicateBook checked: ", isDuplicateBook);
  if (!isDuplicateBook) {
    console.log("Adding book to database.....");
    await setDoc(doc(db, "books", isbn), {
      title: book_title,
      isbn: ISBNs,
      author: book_author,
      rating: 0,
      NumberOfRatings: 0,
    });
    console.log("Book successfully added to database.");
  } else {
    console.log("Book already exists in the database.");
  }
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
