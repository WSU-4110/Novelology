import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, updateDoc } from "../firebase";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

// useEffect(()=>{})
// const washingtonRef = doc(db, "cities", "DC");

// Set the "capital" field of the city 'DC'
// await updateDoc(washingtonRef, {
//     capital: true
//   });
// export const AddBookRating = async (rating, isbn) => {
//   var tempRating, RatingCount;
//   const [user] = useAuthState(auth);
//   const uid = user ? user.uid : null;
//   // const userBookRatingField = await doesBookRatingsFieldExist(uid, "bookRatings");
  


// //   console.log("AddBookRating called");
//   console.log("rating from AddBookRating: ", rating);
//   console.log("isbn from AddBookRating: ", isbn);

//   const bookRef = doc(db, "books", isbn);
//   const docSnap = await getDoc(bookRef);

//   if (docSnap.exists()) {
//     console.log("Document data:", docSnap.data());
//     const bookData = docSnap.data();
//     console.log("Book Rating FU: ", bookData.rating);
//     console.log("Book Rating count: ", bookData.NumberOfRatings);
//     RatingCount = bookData.NumberOfRatings + 1;
//     tempRating = (bookData.rating + rating) / RatingCount;

//     console.log("After Book Rating FU: ", tempRating);
//     console.log("After Book Rating count: ", RatingCount);

//     // await updateDoc(bookRef,{

//     // });
//   } else {
//     // docSnap.data() will be undefined in this case
//     console.log("No such document!");
//   }
// };

// const doesBookRatingsFieldExist = async (documentId, fieldName) => {
//   try {
//     const docRef = doc(db, "users", documentId);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       const userData = docSnap.data();
//       return fieldName in userData;
//     } else {
//       console.error("User document does not exist");
//     }
//   } catch (error) {
//     console.error("Error checking field in collection:", error);
//   }
// };
