
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {collection, addDoc, serverTimestamp} from 'firebase/firestore';
import {db} from '../../firebase';
import {useState} from 'react';

import { useNavigate } from "react-router-dom";
function PostForm({user, selectedGenre, setSelectedGenre}) {
  const navigate = useNavigate()
  const messageRef = collection(db, 'posts')
  const [formValue, setFormValue] = useState('')

  
  
 
  const sendMessage = async(e) =>{
    e.preventDefault()
    if (!user || (!formValue )) return
		const payload = {
    text: formValue || "", 
    createdAt: serverTimestamp(),
    genres: selectedGenre,
    comments: [], 
    uid:user.uid,
    userEmail: user.email,
    likes: 0,
    fileName: ''
  
    }
    
    const result = await addDoc(messageRef,payload)

    setFormValue('')
    setSelectedGenre('')
    if (result){
      navigate('/')
    }
  }



    return (
    <>
         
    <ReactQuill theme='snow' value={formValue} onChange={setFormValue} />

   

    <div class='flex justify-end mt-2'>  
          <button  onClick={(e) => sendMessage(e)} class="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-full">
            submit
        </button>
    </div>
      
      
    

  </>
    );
  }
  
  export default PostForm;