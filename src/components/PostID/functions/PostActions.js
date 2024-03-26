import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../../firebase'; 


  

 export const editPostSave = async (finalPid, postToEdit) => {
    try {

      await updateDoc(doc(db, 'users', finalPid), {
        savedPosts: postToEdit
      });
      console.log('Success')
    } catch (error) {
      console.error('Error updating document: ', error)
    }
  };

export const savePost = (savedPosts, addPost) =>{
  const updatedPostlist = [...savedPosts, addPost]
  return updatedPostlist
}

export const removeSavePost = (savedPosts, removePost) => {
  const indexToRemove = savedPosts.indexOf(removePost)
  if (indexToRemove !== -1) {
    const updatedPostlist = savedPosts.slice(0, indexToRemove).concat(savedPosts.slice(indexToRemove + 1))
    return updatedPostlist
  } else {
    return savedPosts
  }
}




