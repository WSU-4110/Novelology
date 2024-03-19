

export default class FormContext{
   
    constructor(form){
        this.form = form
    }
    setFormContext(form){
        this.form = form
    }
    sendMessage(payload){
       return this.form.sendMessage(payload)
    }
}