import {Link} from "react-router-dom"
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from "@firebase/auth";
import { auth } from "../firebase";

const logout = () => {
    signOut(auth);
};

export default function(){
    const [user] = useAuthState(auth);
    return(
       
    <nav className="flex flex-row gap-10 p-4">
        <Link to="/"> Home</Link>
        {!user ? <Link to="/login">Login</Link>: 
            <>
                <Link to="/profile">Profile</Link>
                <button className='logout-button' onClick={logout}>Sign off</button>
            </>

        }
       
    </nav>
        
    
 
    )
}