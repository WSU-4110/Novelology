import React, {useState, useEffect} from 'react';
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import DisplayBookLists from '../components/BookStacks/DisplayBookLists';

const RetrieveBookList =({userAuth}) =>{
    const [check, setCheck] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Fetch Data.");
                const querySnapshot = await getDocs(collection(db, "users", userAuth.uid, "BookLists"));
                const numberOfDocuments = querySnapshot.size;
                console.log("Number of documents:", numberOfDocuments);
                setCheck(numberOfDocuments === 0);
            } catch (error) {
                console.error("Error getting documents: ", error);
            } 
        };

        fetchData();

    }, [userAuth]);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div>
            {check ? (<>You have no bookLists</>):(
            <>
               <DisplayBookLists user={userAuth}/>

            </>
            )}
        </div>
    )
}



export default RetrieveBookList;