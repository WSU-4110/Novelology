import { useAuthState } from 'react-firebase-hooks/auth';
import {collection, addDoc, serverTimestamp} from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import {ref, getDownloadURL,uploadBytesResumable } from "firebase/storage";
import { useUploadFile } from 'react-firebase-hooks/storage';
import {db,auth,storage} from '../firebase';
import {useEffect, useRef, useState} from 'react';
import FileRenderer, {getFileType} from '../components/FileRenderer';
import PostForm from '../components/PostForm';
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

  let genres = []
    const [selectedGenres, setSelectedGenres] = useState([])
    const [genreOptions] = useState([
      'Fantasy',
      'Science Fiction',
      'Mystery',
      'Romance',
      'Thriller',
      'Horror',
      
    ])
  
    const handleGenreChange = (e) => {
      const selectedGenre = e.target.value
      if (!selectedGenres.includes(selectedGenre)) {
        setSelectedGenres([...selectedGenres, selectedGenre])
      }
    }
  
    const handleRemoveGenre = (genre) => {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre))
    }
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
    genres: selectedGenres,
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
    setSelectedGenres([])
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
      <div>
      <h2>Select Book Genres</h2>
      <label htmlFor="genres">Choose Genres:</label>
      <select id="genres" onChange={handleGenreChange} multiple>
        {genreOptions.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      <div>
        <h3>Selected Genres:</h3>
        <ul>
          {selectedGenres.map((genre) => (
            <li key={genre}>
              {genre}
              <button onClick={() => handleRemoveGenre(genre)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
      {console.log(selectedGenres)}
    </div>
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
		</>
       
    
  );

}

export default Submit;