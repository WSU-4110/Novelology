import { doc, setDoc, getDoc, collection, addDoc, deleteDoc } from "firebase/firestore";
import { db, updateDoc } from "../firebase";
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
    // DisplayUserBookRating(user, isbn);
    // console.log("Existing user rating ended");
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
                console.log('User did not rate!');
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

export const RemoveRating = async(user,isbn) =>{
  const uid = user.uid;
      try {
        const subcollectionRef = collection(db, "users", uid, "Ratings");
        const docRef = doc(subcollectionRef, isbn);
  
        await deleteDoc(docRef);
        console.log(`Document successfully deleted.`);

      } catch (error) {
        console.error("Error deleting book rating", error);
      }

}



//Book side of Rating

// export const AddBookRatingToBook = async (isbn, rating) => {
//   console.log("AddBookRatingToBook");
//     console.log("ISBN: ",isbn);
//     console.log("user: ",rating);
// }