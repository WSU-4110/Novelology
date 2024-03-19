

import {collection} from 'firebase/firestore';
import {db} from '../../firebase';
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import {FormGUI} from './Form';
import FormContext from './FormContext';
import PostStrat from './PostStrats';

function PostForm({user, selectedGenre, setSelectedGenre}) {
  const navigate = useNavigate()
  let messageRef = collection(db, 'posts')
 
  const [formValue, setFormValue] = useState('')
  const [showSavedMessage, setShowSavedMessage] = useState(false)
  const postStrat = new PostStrat(formValue, user,messageRef, selectedGenre)
  const formContext = new FormContext(postStrat)
  
  const sendMessage = async(e) =>{
    e.preventDefault()
    if (!user || (!formValue )) return

    const result = formContext.sendMessage()
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