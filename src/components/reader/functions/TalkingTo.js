 import { useEffect, useState } from "react";
 import { useCollection } from "react-firebase-hooks/firestore";
 import { orderBy, collection, query, getDocs, onSnapshot, where } from "@firebase/firestore";
 import ErrorPage from "../../shared/Error";
 import { db } from "../../../firebase";
 import React from "react";
 import { useParams } from "react-router-dom";
 import { useAuthState } from 'react-firebase-hooks/auth';
 import PostForm from "../../submit/PostForm";
 import { auth } from "../../../firebase";
 import QandaStrat from "../functions/QandA"
 


 
 export default function TalkingTo(){ 
    const [formValue, setFormValue] = useState("")
    const ref=collection(db, "q&a")
    const queryRef=query(ref, orderBy('createdAt','desc'))
    const [data, setdata] = useState([])
    const {aid}=useParams() 
    const author=query(collection(db, "users"),where("role", "==", "author")
    )
    console.log(aid)

    
    useEffect(() => {
        const subscribe=onSnapshot(queryRef,(snapshot) => {
            setdata(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            );
        });
    
    }, []);
    
    const [a , setA] = useState('')
    const [user] = useAuthState(auth)
    const strat= new QandaStrat(formValue, user, "q&a", aid)
    

    console.log(data)
    if(!aid) return <>error</>

    return (
        <> 
        <PostForm formValue={formValue} setFormValue={setFormValue} setSelected={setA} Strat = {strat}/>

        </> 
    )
}

function Messages(props){
    const {author, reader}=props

    return (
        <>
        {author}
        </>
    )
}

