import { useAuthState } from 'react-firebase-hooks/auth';
import {collection, addDoc, serverTimestamp} from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import {ref, getDownloadURL,uploadBytesResumable } from "firebase/storage";
import { useUploadFile } from 'react-firebase-hooks/storage';
import {db,auth,storage} from '../firebase';
import {useEffect, useRef, useState} from 'react';
import FileRenderer, {getFileType} from '../components/FileRenderer';
import Form from '../components/Form';
import { useNavigate } from "react-router-dom";
function Post() {
  const [user] = useAuthState(auth)
  const messageRef = collection(db, 'posts')
  const [uploadFile, uploading] = useUploadFile()
  const [formValue, setFormValue] = useState('')
  const [file, setFile] = useState(null)
  const fileInputRef = useRef(null)
  const textAreaRef = useRef(null)
  const navigate = useNavigate()


  const handleChange = (e) => {
    setFormValue(e.target.value);
  }
  const handleFileChange = (e) =>{
     setFile(e.target.files[0])
  }
  const handleDelete = () =>{
    setFile(null)
    fileInputRef.current.value = null
  }
  
  
  
 
  const sendMessage = async(e) =>{
    e.preventDefault()
    if (!user || (!formValue && !file)) return
		const payload = {
    text: formValue || "", 
    createdAt: serverTimestamp(),
    comments: [], 
    uid:user.uid,
    userEmail: user.email,
    fileName: file ? file.name : null }
    if (file){
    
      const storageRef = ref(storage, `files/${file.name}`)
      const uploadRef = await uploadBytesResumable(storageRef, file)
      const downloadURL = await getDownloadURL(uploadRef.ref)
      const fileType = getFileType(file)
      if (fileType === 'image'){
        payload.image = downloadURL
      } 
      else if (fileType === 'video'){
        payload.video = downloadURL
      } 
      else if (fileType === 'audio'){
        payload.audio = downloadURL
      } 
      else {
        payload.other = downloadURL
      }
    }
    fileInputRef.current.value = null
    setFile(null)
    await addDoc(messageRef,payload)
    
    setFormValue('')
 
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 
      sendMessage(e);
    }
  }
	
  return (
    <>
        {!user ? navigate('/'):
          <div>
  
              {!uploading && file && 
              <div className=''>
                  <FileRenderer file={file}/>
                  <button onClick={handleDelete} className=''><span className=''></span> -</button>
                  
              </div>
							}
            </div>

        }
      
      <div className=''>
        <Form
        sendMessage={sendMessage}
        handleFileChange={handleFileChange}
        handleChange={handleChange}
        handleKeyDown={handleKeyDown}
        formValue={formValue}
        file={file}
        textAreaRef={textAreaRef}
        fileInputRef={fileInputRef}
        />
      </div> 
		</>
       
    
  );

}

export default Post;