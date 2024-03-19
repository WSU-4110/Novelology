import React from 'react';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebase'; 


  

 export const savePost = async (finalPid, stringToAppend) => {
    try {

      await updateDoc(doc(db, 'users', finalPid), {
        savedPosts: arrayUnion(stringToAppend)
      });
      console.log('Success');
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };




