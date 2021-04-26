export default class ErrorMessage {
    constructor(errObj){
        this.errObj = errObj;
    }
    print_msg(){
        for(var [field, err] of Object.entries(this.errObj)){
            console.log(`${field}:`, err);
        }
    }
}