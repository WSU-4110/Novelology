import Form from "../../submit/functions/Form"
import { updateDoc, doc } from "firebase/firestore"
import { db } from "../../../firebase"
export class QandaAuthorStrat extends Form{
    constructor(formValue, user, messageRef, author, file){
        super(formValue, user, messageRef,author,file)
        this.post = {
            replay: formValue,
        }
        this.args = author
       
    }
    async sendMessage(payload){
  
  //      this.payload = Object.assign({}, this.payload, this.post)
    //    return await super.sendMessage(this.payload)
    return await updateDoc(doc(db,'q&a', this.args),this.post)
    }
}