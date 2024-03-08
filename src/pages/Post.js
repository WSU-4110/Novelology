
import {auth, db} from '../firebase.js'
import PostIDComponent from '../components/PostID/PostIDComponent.js';
import PostIDSubComponent from '../components/PostID/PostIDSubComponent.js';
import {  doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import Error from '../components/shared/Error.js'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate ,  useParams} from "react-router-dom";
import PostActions from '../functions/PostActions.js';
import { Link } from 'react-router-dom';
export default function Post(postid){
    
    const { pid } = useParams()
    const finalPid = pid ?  pid : postid.postdata 
    console.log(finalPid)
    const PA = new PostActions(pid)
    let postData = null
    let loading = true
    let error = null
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
    
    if (error) return <Error  />
    if (!postData) return <Error />

    return (

            <div>
    
             
              {loading && <span>Document: Loading...</span>}
              {postData && <>
                <Link to={`/post/${finalPid}`}>
                <PostIDComponent props= {postData}/>
                <PostIDSubComponent props = {postData}/>
                </Link>
                
              </>
          
              
              }
             
            </div>
        
    )
}
