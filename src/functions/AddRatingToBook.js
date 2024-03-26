import {
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  deleteDoc,
  increment,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

//User side of Rating
export const AddBookRating = async (rating, isbn, user) => {
  try {
    console.log(rating);
    console.log(isbn);
    const uid = user.uid;
    console.log("uid:", uid);

    try {
      const subcollectionRef = collection(db, "users", uid, "Ratings");
      const docRef = doc(subcollectionRef, isbn);

      await setDoc(docRef, {
        changes: false,
        isbn: isbn,
        rating: rating,
        timestamp: new Date(),
      });
      console.log("Rating added.");
      try {
        const bookRef = doc(db, "books", isbn);
        const docSnap = await getDoc(bookRef);

        if (docSnap.exists()) {
          if (CheckUserRatedBasedOnChanges(user, isbn)) {
            console.log("User first rating adding to books data....");
            const finalRating = docSnap.data().rating;
            const ratingCount = docSnap.data().NumberOfRatings;
            const RatingSumDisplay = docSnap.data().RatingSum;

            console.log("Rating: ", finalRating);
            console.log("Number of Ratings: ", ratingCount);
            console.log("Ratings Sum: ", RatingSumDisplay);
            const SumOfRatings = RatingSumDisplay + rating;
            const tempRating = (finalRating + rating+5) / (ratingCount + 1);

            await updateDoc(bookRef, {
              NumberOfRatings: increment(1),
              RatingSum: SumOfRatings,
              rating: tempRating,
            });
            await incrementChanges(user, isbn);

            console.log("Rating successfully added.");
          } else {
            console.log("User has already rated this book!");
            const finalRating = docSnap.data().rating;
            const ratingCount = docSnap.data().NumberOfRatings;
            const RatingSumDisplay = docSnap.data().RatingSum;

            console.log("Rating: ", finalRating);
            console.log("Number of Ratings: ", ratingCount);
            console.log("Ratings Sum: ", RatingSumDisplay);

            const currentRating = DisplayUserBookRating(user, isbn);
            const RemovedRating = RatingSumDisplay - currentRating;

            const FinalSumOfRating = RemovedRating + rating;

            const tempRating = FinalSumOfRating / ratingCount;

            await updateDoc(bookRef, {
              RatingSum: FinalSumOfRating,
              rating: tempRating,
            });

            await incrementChanges(user, isbn);
            console.log("New Rating successfully added.");
          }
        } else {
          console.log("Book document doesn't exist!");
        }
      } catch (e) {
        console.error("Error adding rating to book in books: ", e);
      }
    } catch (error) {
      console.error("Error adding rating to book in users:", error);
    }
  } catch (error) {
    console.error("Error getting user Data:", error);
  }
};

const CheckUserRatedBasedOnChanges = async (user, isbn) => {
  try {
    console.log(isbn);
    const uid = user.uid;
    console.log("uid:", uid);
    try {
      const docRef = doc(db, "users", uid, "Ratings", isbn);

      // Get the document snapshot
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document changes:", docSnap.data().changes);
        return docSnap.data().changes;
      } else {
        console.log("User did not rate!");
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
};

const incrementChanges = async (user, isbn) => {
  const uid = user.uid;
  try {
    const docRef = doc(db, "users", uid, "Ratings", isbn);

    await updateDoc(docRef, {
      changes: true,
    });
    console.log("Change incremented.");
  } catch (error) {
    console.error("Error incrementing changes in user Ratings", error);
  }
};

export const DisplayUserBookRating = async (user, isbn) => {
  try {
    console.log(isbn);
    const uid = user.uid;
    console.log("uid:", uid);
    try {
      const docRef = doc(db, "users", uid, "Ratings", isbn);

      // Get the document snapshot
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        console.log("Document snapshot:", docSnap.data().rating);
        return docSnap.data().rating;
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error retrieving rating to book:", error);
    }
  } catch (error) {
    console.error("Error getting user Data:", error);
  }
};

export const UserRated = async (user, isbn) => {
  try {
    console.log(isbn);
    const uid = user.uid;
    console.log("uid:", uid);
    try {
      const docRef = doc(db, "users", uid, "Ratings", isbn);

      // Get the document snapshot
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data().rating);
        return true;
      } else {
        console.log("User did not rate!");
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
};

export const RemoveRating = async (user, isbn) => {
  const uid = user.uid;
  try {
    const subcollectionRef = collection(db, "users", uid, "Ratings");
    const docRef = doc(subcollectionRef, isbn);

    await deleteDoc(docRef);
    console.log(`Document successfully deleted.`);
  } catch (error) {
    console.error("Error deleting book rating", error);
  }
};

//Book side of Rating

// export const AddBookRatingToBook = async (isbn, rating,user) => {
//   console.log("AddBookRatingToBook");
//     console.log("ISBN: ",isbn);
//     console.log("rating: ",rating);
//     try {
//       const docRef = collection(db, "books", isbn);
//       const docSnap = await getDoc(docRef);
//       if (UserRated(user,isbn)){
//         console.log("User already rated this book");
//         return;
//       }else{
//         if (docSnap.exists()) {
//           console.log('Document data:', docSnap.data());
//           console.log('Document snapshot:', docSnap.data().rating);
//           return;
//         } else {
//           console.log('No such document!');
//           return;
//         }
//       }

//     }
//     catch (error) {
//       console.error("Error adding rating to book:", error);
//     }
// }
