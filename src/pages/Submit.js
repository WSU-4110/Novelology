import { useAuthState } from 'react-firebase-hooks/auth';
import {db,auth,storage} from '../firebase';
import PostForm from '../components/submit/PostForm';
import { useNavigate } from "react-router-dom";


function Submit() {
  const [user] = useAuthState(auth)
  const navigate = useNavigate()

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
        
            
            
        
          
       
              {/* {!uploading && file && 
              <div className=''>
                  <FileRenderer file={file}/>
                  <button onClick={handleDelete} className=''><span className=''></span> -</button>
                  
              </div>
							} */}
                <PostForm user={user}
               
                />
            </div>
        
            
              
       
              
             
             

          <div class="col-span-1"></div>
          </div>
        }
      
     
		</>
       
    
  );

}

export default Submit;