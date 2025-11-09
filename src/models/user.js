export class user{
    constructor(id,name,email,age){
        this.id=id;
        this.name=name;
        this.email=email;
        this.age=age;
    }
    validate(){
        
            if(this.name.length<2) throw "Your name should be longer than two characteres";
            if(this.email.indexOf('@')==-1 || this.email.indexOf('.')==-1) throw "Your email might not have '@' or '.'";
            if(this.age<1 && this.age>120) throw "Your age should be between 1 and 120";
            if(parseInt(this.id)<0) throw "Your id can't negative";
        
    }
    update(data){
        fetch('data.json')
        
    }
}