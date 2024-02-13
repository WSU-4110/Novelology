import {Link} from "react-router-dom"
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from "@firebase/auth";
import { auth } from "../firebase";
import Modal from "./Modal";
import { handleLogout } from "../functions/Auth";

export default function(){
    const [user] = useAuthState(auth);
    return(
       
    <nav className="flex flex-row gap-10 p-4">
        <Link to="/"> Home</Link>
        {!user ? <Modal/>: 

            <>
                <Link to="/profile">Profile</Link>
                <button className='logout-button' onClick={handleLogout}>Sign off</button>
                <Link to="/submit">Post</Link>
            </>

        }
       
    </nav>
        
    
 
    )
}