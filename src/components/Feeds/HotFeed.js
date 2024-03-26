import { useCollection } from 'react-firebase-hooks/firestore';
import {collection, orderBy, query} from 'firebase/firestore';
import Error from '../shared/Error.js'
import Post from '../../pages/Post';

import {db} from '../../firebase.js';
export default function HotFeed(){
    const postRef = collection(db, 'posts')
    const queryRef = query(postRef, orderBy('createdAt','desc'))
    let posts = null
    let loading = true
    let error = null
    try{
        const [postsData,isLoading,err] = useCollection(queryRef)
        posts = postsData
        loading = isLoading
        error = err
    } catch(err){
        error = err
    }
    
    if (error) return <Error  />
    if (!posts) return <Error />
    return(
        <>  
            {loading && <p>Fetching posts...</p>}
            {posts && posts.docs.map(post=><Post key={post.id} postdata={post.id}/>)}
        </>
    )
}