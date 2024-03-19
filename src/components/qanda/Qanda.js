import {db} from '../../firebase';
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import {FormGUI} from './Form';
import FormContext from './FormContext';
import {QandaStrat }from './PostStrats';

export default function Qanda(){
  const navigate = useNavigate()
  let messageRef = collection(db, 'q&a')
 
  const [formValue, setFormValue] = useState('')
  const [showReply, setShowReply] = useState(false)

  const postStrat = new QandaStrat(formValue, user,messageRef, selectedGenre)
  const formContext = new FormContext(postStrat)

  const sendMessage = async(e) =>{
    e.preventDefault()
    if (!user || (!formValue )) return

    const result = formContext.sendMessage()
    setFormValue('')
    if (result){
      navigate('/')
    }
  }

  const toggleDropdown = () => {
    setShowReply(!showReply);
};
    return (
        <>
            <div>
                question
                <button onClick={toggleDropdown}>reply:</button>
                {showReply && (
              <div class=" " >
                <button onClick={toggleDropdown}>X</button>
                <FormGUI formValue={formValue} setFormValue={setFormValue} sendMessage={sendMessage}/>
            </div>
            )}
                
            </div>
        </>
    )
}
