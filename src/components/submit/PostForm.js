
import { useNavigate } from "react-router-dom";
import {FormGUI} from './functions/Form';
import FormContext from './functions/FormContext';
//import PostStrat from '../../pages/Submit/PostStart';

function PostForm({formValue, setFormValue, setSelected, Strat}) {
  const navigate = useNavigate()
  // const postStrat = new PostStrat(formValue, user,'posts', selected)
  const formContext = new FormContext(Strat)
  
  const sendMessage = async(e) =>{
    
    e.preventDefault()
    const result = formContext.sendMessage()
    setFormValue('')
    setSelected('')
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