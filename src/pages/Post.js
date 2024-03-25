
import {db} from '../firebase.js'
import PostIDComponent from '../components/PostID/PostIDComponent.js';
import PostIDSubComponent from '../components/PostID/PostIDSubComponent.js';
import PostIDSave from '../components/PostID/PostIDSave.js';
import {  doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import Error from '../components/shared/Error.js'
import { useParams} from "react-router-dom";
import PostActions from '../functions/PostActions.js';
import { Link } from 'react-router-dom';
import { auth } from '../firebase.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import { editPostSave,savePost,removeSavePost } from '../components/PostID/functions/PostActions.js';
import { useState } from 'react';
export default function Post(postid){
    const [user] = useAuthState(auth)
    const { pid } = useParams()
    const finalPid = pid ?  pid : postid.postdata 
    console.log(finalPid)
    const PA = new PostActions(pid)
    let postData = null
    let loading = true
    let error = null
  
    const [usertag,loadin,er] = useDocument(doc(db, 'users', user.uid), {
      snapshotListenOptions: { includeMetadataChanges: true },
  });
    try {
        const [value, isLoading, err] = useDocument(doc(db, 'posts', finalPid), {
            snapshotListenOptions: { includeMetadataChanges: true },
        });
        
        postData = value?.data()
        loading = isLoading
        error = err
    } catch (err) {
        error = err
    }
    const savedPosts = usertag.data().savedPosts
    const newPost = pid
    const [isToggled, setIsToggled] = useState(false);
    
  const handleClick = () => {
    if (isToggled) {
      editPostSave(user.uid,removeSavePost(savedPosts,pid))
    } else {
      editPostSave(user.uid,savePost(savedPosts,pid))
    }
    setIsToggled(!isToggled);
  };
  
    if (error) return <Error  />
    if (!postData) return <Error />

    return (

            <div class='grid grid-cols-4 '>
               <div class="col-span-1"></div>
                <div class="col-span-2   mt-10 bg-gray max-h-screen rounded-xl">
                 
                      {loading && <span>Document: Loading...</span>}
                      {postData && <>
                        <div class='flex items-center'>
                          <div> <span class='text-xs'>{postData.userEmail} &middot; </span> </div>
                          <div class='text-xl '>{!user ? <p></p> : 
                          <button onClick={handleClick}>
                              <PostIDSave/>
                          </button>
                        
                          }
                          </div>
                        </div>
                       
                        <div class='flex flex-col justify-center items-center mb-10 mt-10'>

                     
                        <Link to={`/post/${finalPid}`}>
                        <PostIDComponent props= {postData}/>
                        
                        </Link>
                        </div>
                        
                      </>
                  
                        
                      }
                        <PostIDSubComponent props = {postData}/>
                  </div>
                  
              <div class="col-span-1"></div>
            </div>
        
    )
}
