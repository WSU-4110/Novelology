
import {auth} from '../firebase.js'
import { useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Login(){
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
     
    return (
        
            <div>
                {!user ? <>Profile</> :
                    navigate('/')
                }
            </div>
        
    )
}