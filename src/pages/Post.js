
import {auth,db} from '../firebase.js'
import { useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getFirestore, doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';

export default function Post(){
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const docRef = doc(db, 'posts', 'hhacGRM6jCc3qaF6pcgJ')
    const [value, loading, error] = useDocument(docRef)

   
  

     
    return (
        
            <div>
                    <p>
                            {error && <strong>Error: {JSON.stringify(error)}</strong>}
                            {loading && <span>Document: Loading...</span>}
                            {console.log(JSON.stringify(value.data()))}
                            
                            {value && <span>Document: {JSON.stringify(value.data())}</span>}
                    </p>

            </div>
        
    )
}