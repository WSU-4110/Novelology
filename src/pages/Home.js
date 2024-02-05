
import { useAuthState } from 'react-firebase-hooks/auth';
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import {db,auth,storage} from '../firebase.js'

export default function Home(){
    const [user] = useAuthState(auth);
    const login = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider);
    };
    const logout = () => {
      signOut(auth);
    };

    return (
        <main>
        {!user ? <button className='login-button'onClick={login}>google</button> :
          <>
              <h1 className='text-3xl font-bold underline'>
                  Hello World!
              </h1>
              <button className='logout-button'onClick={logout}>signoff</button>
          </>
         
        }
        
      </main>
    )
       
}
