import { useEffect } from 'react';
import {useState} from 'react';
import { QandaAuthorStrat } from './functions/QandaStart';
import PostForm from '../submit/PostForm';
export default function Qanda(t,id,u){
    const [formValue, setFormValue] = useState('')
  const [showReply, setShowReply] = useState(false)
    const [strat, setStrat] = useState(null)
  useEffect(() => {
    if (u) {
        const s = new QandaAuthorStrat(formValue, u, "q&a", id);
        setStrat(s); 
    }
}, [formValue, u]);
console.log('')

  const toggleDropdown = () => {
    setShowReply(!showReply);
};
    return (
        <>
            <div>
                
                <button onClick={toggleDropdown}>reply:</button>
                {showReply && (
              <div class=" " >
                <PostForm formValue={formValue} setFormValue={setFormValue} setSelected={t} Strat={strat}/>
            </div>
            )}
                
            </div>
        </>
    )
}

