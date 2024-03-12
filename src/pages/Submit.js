import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from '../firebase';
import PostForm from '../components/submit/PostForm';
import { useNavigate } from "react-router-dom";
import {useState} from 'react';

function Submit() {
  const [user] = useAuthState(auth)
  const navigate = useNavigate('/')
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
       
              {/* {!uploading && file && 
              <div className=''>
                  <FileRenderer file={file}/>
                  <button onClick={handleDelete} className=''><span className=''></span> -</button>
                  
              </div>
							} */}
                <PostForm user={user} selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre}
               
                />
            </div>
        
            
              
       
              
             
             

          <div class="col-span-1"></div>
          </div>
        }
      
     
		</>
       
    
  );

}

export default Submit;