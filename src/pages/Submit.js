import { useAuthState } from 'react-firebase-hooks/auth';
import {collection, addDoc, serverTimestamp} from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import {ref, getDownloadURL,uploadBytesResumable } from "firebase/storage";
import { useUploadFile } from 'react-firebase-hooks/storage';
import {db,auth,storage} from '../firebase';
import {useEffect, useRef, useState} from 'react';
import FileRenderer, {getFileType} from '../components/submit/FileRenderer';
import PostForm from '../components/submit/PostForm';
import { useNavigate } from "react-router-dom";

function Submit() {
  const [user] = useAuthState(auth)
  const messageRef = collection(db, 'posts')
  const [uploadFile, uploading] = useUploadFile()
  const [formValue, setFormValue] = useState('')
  const [file, setFile] = useState(null)
  const fileInputRef = useRef(null)
  const textAreaRef = useRef(null)
  const navigate = useNavigate()

  const genres = ['Fantasy', 'Science Fiction', 'Mystery', 'Romance', 'Thriller', 'Horror'];
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('');

  const toggleDropdown = () => {
      setShowDropdown(!showDropdown);
  };

  const handleGenreSelect = (event, genre) => {
    setSelectedGenre(genre);
    setShowDropdown(!showDropdown)
};

  const removeGenre = () => {
      setSelectedGenre('');
  };
  const handleChange = (e) => {
    setFormValue(e.target.value)
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
    genres: selectedGenre,
    comments: [], 
    uid:user.uid,
    userEmail: user.email,
    likes: 0,
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
    const result = await addDoc(messageRef,payload)

    setFormValue('')
    setSelectedGenre('')
    if (result){
      navigate('/')
    }
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
         
         <div class='grid grid-cols-4 '>
          <div class="col-span-1"></div>
          <div class="col-span-2  ">
           <h1 class="text-xl mt-10">Create a Post</h1>
           <div class="border boder-gray-300 mt-2 mb-2"></div>
           <div>
            <p class="text-xs border boder-gray-300 p-2 rounded-lg"> Before sharing any content, please refer to the rule page: Read Rules.Ensure to include the source in the title of your post. 
  Avoid sharing untagged spoilers, especially in the post title. Refrain from requesting or sharing illegal links or videos. 
  Note that fanart has strict limitations!</p>
           </div>
              <div class="flex ">
            <button class="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-full mt-2 mb-2"onClick={toggleDropdown}>Genre</button>
            {selectedGenre && (
                
                    <button class="bg-gray-300 hover:bg-gray-400 text-black  py-2 px-4 rounded-full mt-2 mb-2 ml-2"onClick={removeGenre}>X {selectedGenre} </button>
                   
                
            )}
             </div>
            
            
            {showDropdown && (
              <div class=" border border-gray-200 rounded-lg mb-2 w-25 p-3" >
                <button onClick={toggleDropdown}>X</button>
                {genres.map((genre, index) => (
                    <div class="" key={index} onClick={(event) => handleGenreSelect(event, genre)}>
                        {genre}
                    </div>
                ))}
            </div>
            )}
          
       
              {!uploading && file && 
              <div className=''>
                  <FileRenderer file={file}/>
                  <button onClick={handleDelete} className=''><span className=''></span> -</button>
                  
              </div>
							}
                <PostForm
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
        
            
              
       
              
             
             

          <div class="col-span-1"></div>
          </div>
        }
      
     
		</>
       
    
  );

}

export default Submit;