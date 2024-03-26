 import { useEffect, useState } from "react";
 import { useCollection } from "react-firebase-hooks/firestore";
 import { useDocument } from "react-firebase-hooks/firestore";
 import { orderBy, collection, query, getDocs, onSnapshot, where } from "@firebase/firestore";
 import ErrorPage from "../../shared/Error";
 import { db } from "../../../firebase";
 import React from "react";
 import { useParams } from "react-router-dom";
 import { useAuthState } from 'react-firebase-hooks/auth';
 import PostForm from "../../submit/PostForm";
 import { auth } from "../../../firebase";
 import QandaStrat from "../functions/QandA"
import Qanda from "../../qanda/Qanda";

 
 export default function TalkingTo(){ 
    const [formValue, setFormValue] = useState("")
    const ref=collection(db, "q&a")
    const queryRef=query(ref, orderBy('createdAt','desc'))
    const [data, setdata] = useState([])
    const {aid}=useParams() 
    const authorq=query(collection(db, "users"), where("role", "array-contains", "author"), where("username", "==", aid)

    )
    const [authors, setAuthors] = useState([])
    
    useEffect(() => {
        const subscribe=onSnapshot(ref,(snapshot) => {
            setdata(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            );
        });
        
    }, []);
    useEffect(() => {
        const subscribe=onSnapshot(authorq,(snapshot) => {
            setAuthors(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            );
        });
        
    }, []);
    
    
    const [a , setA] = useState('')
    const [user] = useAuthState(auth)
    const [strat, setStrat] = useState(null)
useEffect(() => {
    if (user) {
        const s = new QandaStrat(formValue, user, "q&a", aid);
        setStrat(s); 
    }
}, [formValue, user, aid]);


    if(!aid || authors.length===0) return <p>error</p>

    return (
        <> 
        <div class='m-auto items-center'>
        {!user ? <><p></p></> :  <PostForm formValue={formValue} setFormValue={setFormValue} setSelected={setA} Strat = {strat}/>
}

        </div>
               {data.map(obj => (
        <Messages key={obj.id} props={obj.data} id={obj.id} t={setA} u={user}/>
      ))}
        </> 
    )
}

function Messages({props,id,t,u}){
    const {author, user, text, replay}=props
    console.log(id)
    return (
        <>
        
          <div class='grid grid-cols-4 mt-10 mb-10'>
            <div class="col-span-1"></div>
                <div class="col-span-2   mt-10 bg-gray max-h-screen rounded-xl">
                      <div class='flex flex-start mb-5'> <span class='text-xs'>{props.useName} &middot; </span> </div>

                            <div class='flex items-center'>
                                                 
                       
                    
                        
                     <div dangerouslySetInnerHTML={{ __html: text }}/>
                        
                    <div dangerouslySetInnerHTML={{ __html: replay }}/>
                        
                                       
                        </div>
                         <div class="mt-4">
                                <Qanda t={t} id={id} u={u}/>
                         </div>
 
                      </div>
     
             <div class="col-span-1"></div>      
                 </div>
        </>
    )
}

