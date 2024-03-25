import FormContext from "../../submit/functions/FormContext"

export class QandaStrat extends Form{
    constructor(formValue, user, messageRef, author, file){
        super(formValue, user, messageRef,author,file)
        this.post = {
            author: author,
        }
       
    }
    async sendMessage(payload){
  
        this.payload = Object.assign({}, this.payload, this.post)
        return await super.sendMessage(this.payload)
    }
}