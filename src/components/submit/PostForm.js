
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {collection, addDoc, serverTimestamp} from 'firebase/firestore';
import {ref, getDownloadURL,uploadBytesResumable } from "firebase/storage";
import { useUploadFile } from 'react-firebase-hooks/storage';
import {db,storage} from '../../firebase';
import {useEffect, useRef, useState} from 'react';
import FileRenderer, {getFileType} from '../../components/submit/FileRenderer';
import { useNavigate } from "react-router-dom";
function PostForm({user}) {
  const navigate = useNavigate()
  const messageRef = collection(db, 'posts')
  const [formValue, setFormValue] = useState('')
  // const [uploadFile, uploading] = useUploadFile()
  // const [file, setFile] = useState(null)
  // const fileInputRef = useRef(null)
 


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
  // const handleChange = (e) => {
  //   setFormValue(e.target.value)
  // }
  // const handleFileChange = (e) =>{
  //    setFile(e.target.files[0])
  // }
  // const handleDelete = () =>{
  //   setFile(null)
  //   fileInputRef.current.value = null
  // }
  
  
  
 
  const sendMessage = async(e) =>{
    e.preventDefault()
    // if (!user || (!formValue && !file)) return
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