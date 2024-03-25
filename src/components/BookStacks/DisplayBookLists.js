import { collection, getDocs } from 'firebase/firestore';
import { db } from "../../firebase"; 
import React,{useState, useEffect} from 'react'


const checkBookListCollectionEmpty = async (user) => {
    try {
      const querySnapshot = await getDocs(collection(db, "users", user.uid, "BookLists"));
      const numberOfDocuments = querySnapshot.size;
      
      if (numberOfDocuments === 0) {
        console.log('Collection is empty');
      } else {
        console.log(`Collection has ${numberOfDocuments} document(s)`);
        // You can also access the documents using querySnapshot.docs
      }
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
  };

const getBookLists = async (user) =>{
    try {
        const querySnapshot = await getDocs(collection(db, "users", user.uid, "BookLists"));
        const numberOfDocuments = querySnapshot.size;
        
        return numberOfDocuments;
      } catch (error) {
        console.error('Error getting documents: ', error);
      }
};

  const DisplayBookLists = ({ user }) => {
    const [isCollectionEmpty, setIsCollectionEmpty] = useState(null);
    const [BookListCount,setBookListCount] = useState(null);

    useEffect(() => {
      const fetchCollectionEmpty = async () => {
        const isEmpty = await checkBookListCollectionEmpty(user);
        setIsCollectionEmpty(isEmpty);
      };
  
      fetchCollectionEmpty();
    }, [user]);

    useEffect(() => {
        const fetchBookCount = async () => {
          const count = await getBookLists(user);
          console.log("Count: ",count);
          setBookListCount(count);
        };
    
        fetchBookCount();
      }, [isCollectionEmpty]);
  
    if (isCollectionEmpty === null|| BookListCount === null) {
      // Asynchronous operation is still in progress
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        Book Lists
        {isCollectionEmpty ? (<p>Collection is empty</p>) : (
        
        <>
          <p>Collection has {BookListCount} document(s)</p>
          {Array.from({ length: BookListCount }, (_, index) => (
            <DisplayBookListItems key={index} />
          ))}
        </>
        )}
    </div>
    );
  };
  
  export const DisplayBookListItems = ()=>{
    return (
      <div>
        Book List Items
      </div>
    );
  }


export default DisplayBookLists;
