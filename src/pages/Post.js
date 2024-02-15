import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {auth} from '../firebase.js'
import { useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Login(){
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const login = async() => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        navigate('/');
      };
     
    return (
        
            <div>
              post
            </div>
        
    )
}