
import {addDoc, serverTimestamp} from 'firebase/firestore';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class Form {
    constructor(formValue, user, messageRef,file){

    this.messageRef = messageRef
    this.payload = {
            text: formValue || "", 
            createdAt: serverTimestamp(),
            comments: [], 
            uid: user.uid,
            userEmail: user.email,
            likes: 0,
            fileName: ''
            }
        }
    
    async sendMessage(payload){
       return await addDoc(this.messageRef,payload)
    }
}

export function FormGUI({formValue,setFormValue, sendMessage}){
    return(
        <>
            <ReactQuill theme='snow' value={formValue} onChange={setFormValue} />

            <div class='flex justify-end mt-2'>  
                <button  onClick={(e) => sendMessage(e)} class="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-full">
                    submit
                </button>
            </div>
        </>
    )
}

export default Form;