import { doc, setDoc, getDoc, collection, addDoc } from "firebase/firestore";
import { db, updateDoc } from "../firebase";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export const AddBookRating = async (rating, isbn, user) => {
  try {
    console.log(rating);
    console.log(isbn);
    const uid = user.uid;
    console.log("uid:", uid);
    DisplayUserBookRating(user, isbn);
    console.log("Existing user rating ended");
    try {
      const subcollectionRef = collection(db, "users", uid, "Ratings");
      const docRef = doc(subcollectionRef, isbn);

      // Set document data to the document reference
      await setDoc(docRef, {
        isbn: isbn,
        rating: rating,
        timestamp: new Date(),
      });
      console.log("Rating added.");
    } catch (error) {
      console.error("Error adding rating to book:", error);
    }
  } catch (error) {
    console.error("Error getting user Data:", error);
  }
};

export const DisplayUserBookRating = async (user, isbn) => {
  try {
    console.log(isbn);
    const uid = user.uid;
    console.log("uid:", uid);
    try {
        const docRef = doc(db, 'users', uid, 'Ratings', isbn);

        // Get the document snapshot
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log('Document data:', docSnap.data());
            console.log('Document snapshot:', docSnap.data().rating);
            return docSnap.data().rating;
            
        } else {
            console.log('No such document!');
        }

      } catch (error) {
        console.error("Error retrieving rating to book:", error);
      }

  } catch (error) {
    console.error("Error getting user Data:", error);
  }
};

export const UserRated = async(user,isbn) =>{
    try {
        console.log(isbn);
        const uid = user.uid;
        console.log("uid:", uid);
        try {
            const docRef = doc(db, 'users', uid, 'Ratings', isbn);
    
            // Get the document snapshot
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                console.log('Document data:', docSnap.data().rating);
                return true;
                
            } else {
                console.log('No such document!');
                return false;
            }
    
          } catch (error) {
            console.error("Error retrieving rating to book:", error);
            return false;
          }
    
      } catch (error) {
        console.error("Error getting user Data:", error);
        return false;
      }
}
// useEffect(()=>{})
//const notificationsRef = collection(db, 'users', toUserId, 'notifications');
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
