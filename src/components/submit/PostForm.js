

import {collection} from 'firebase/firestore';
import {db} from '../../firebase';
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import Form,{FormGUI} from './Form';

function PostForm({user, selectedGenre, setSelectedGenre}) {
  const navigate = useNavigate()
  let messageRef = collection(db, 'posts')
 
  const [formValue, setFormValue] = useState('')
  
  const form = new Form(formValue, user,messageRef)
  
  const sendMessage = async(e) =>{
    e.preventDefault()
    if (!user || (!formValue )) return
		const payload = {
    text: formValue || "", 
    genres: selectedGenre,
    }
    form.setPayLoad(payload)
    const result = form.sendMessage()
    setFormValue('')
    setSelectedGenre('')
    if (result){
      navigate('/')
    }
  }



    return (
  <>
         
      <FormGUI formValue={formValue} setFormValue={setFormValue} sendMessage={sendMessage}/>
      
  </>
    );
  }
  
  export default PostForm;