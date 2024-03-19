import { addDoc, serverTimestamp } from 'firebase/firestore';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ]
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];

class Form {
    constructor(formValue, user, messageRef, file) {
        this.messageRef = messageRef;
        this.payload = {
            text: formValue || "",
            createdAt: serverTimestamp(),
            comments: [],
            uid: user.uid,
            userEmail: user.email,
            likes: 0,
            fileName: ''
        };
    }

    async sendMessage(payload) {
        return await addDoc(this.messageRef, payload);
    }
}

export function FormGUI({ formValue, setFormValue, sendMessage }) {
    return (
        <>
            <ReactQuill
                theme='snow'
                modules={modules}
                formats={formats}
                value={formValue}
                onChange={setFormValue}

            />
            {console.log(formValue)}

            <div className='flex justify-end mt-2'>
                <button onClick={sendMessage} className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-full">
                    submit
                </button>
            </div>
        </>
    );
}

export default Form;
