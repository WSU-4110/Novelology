import Form from "../../components/submit/functions/Form";   

export default class QandaStrat extends Form{
    constructor(formValue, user, messageRef, selectedGenre, file){
        super(formValue, user, messageRef,selectedGenre,file)
        this.post = {
            author: selectedGenre
            
       
    }}
    async sendMessage(payload){
  
        this.payload = Object.assign({}, this.payload, this.post)
        return await super.sendMessage(this.payload)
    }
}
