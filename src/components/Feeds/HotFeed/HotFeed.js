import { useCollection } from 'react-firebase-hooks/firestore';
import {collection, orderBy, query, getDocs} from 'firebase/firestore';
import Error from '../../shared/Error.js'
import Post from '../../../pages/Post.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from '../../../firebase.js';
import FeedContext from '../functions/FeedStrat.js';
import HotStrat from './HotStrat.js';
import {db} from '../../../firebase.js';
import React from 'react';
export default function HotFeed(){
    const postRef = collection(db, 'posts')
    const queryRef = query(postRef, orderBy('createdAt','desc'))
    
    const [user] = useAuthState(auth)
    
  
    const hot = new HotStrat()
    const context = new FeedContext(hot)
  
   // if (!data) return <Error />
    return(
        <>  
        
        </>
    )
}