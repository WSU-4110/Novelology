import Form from "../../components/submit/Form";    
export default class PostStrat extends Form{
    constructor(formValue, user, messageRef, selectedGenre, file){
        super(formValue, user, messageRef,selectedGenre,file)
        this.post = {
            genres: selectedGenre,
        }
       
    }
    async sendMessage(payload){
  
        this.payload = Object.assign({}, this.payload, this.post)
        return await super.sendMessage(this.payload)
    }
} 