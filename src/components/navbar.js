import {Link} from "react-router-dom"
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from '../firebase.js'
export default function(){
    const [user] = useAuthState(auth);
    return(
       
    <navbar>
        <Link to="/"> Home</Link>
        {!user ? <Link to="/login">Login</Link>: 
            <>
                Posts
                <Link to="/profile">Profile</Link>
            </>

        }
       
    </navbar>
        
    
 
    )
}