
import {auth} from '../firebase.js'
import { useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import UploadPFP from '../components/UploadPFP.js';

export default function Profile(){
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
     
    return (
        
            <div>
                {!user ? navigate('/') : //not logged in? navigate to home
                <>Profile 
                <UploadPFP />    
                </>
                }
            </div>
        
    )
}