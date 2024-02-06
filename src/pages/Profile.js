
import {auth} from '../firebase.js'
import { useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Profile(){
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
     
    return (
        
            <div>
                {!user ? navigate('/') :
                <>Profile</> 
                    
                }
            </div>
        
    )
}