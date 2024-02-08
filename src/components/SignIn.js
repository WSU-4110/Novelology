import { useRef, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

export function SignIn() {
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSignInWithEmailAndPassword() {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      alert("Error signing in with email: " + error.message);
    }
    setLoading(false);
  }

  return (
    <div>
      <form>
        <input className="mt-1 mb-1 rounded-md p-0.5" ref={emailRef} placeholder="E-Mail Address" />
        <input className="mt-1 mb-1 rounded-md p-0.5" ref={passwordRef} type="password" placeholder="Password" />
        <button type="button" disabled={loading} onClick={handleSignInWithEmailAndPassword}>
          Sign In
        </button>
      </form>
    </div>
  );
}
