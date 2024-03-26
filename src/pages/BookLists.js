import React from 'react';
import  RetrieveBookList  from '../functions/RetrieveBookList';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const BookList = () =>{
    const [user] = useAuthState(auth);

    return(
        <div className="bg-lightcolor">
            <div className="ml-24">
        <div className="flex justify-center text-xl pt-3 font-bold">Your Book Lists</div>
        <RetrieveBookList userAuth={user}/>
        </div>
        </div>
    )
}

export default BookList;