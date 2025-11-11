import {ValidationError} from '../utils/error.js'
export class User{
    #id;
    #name;
    #email;
    #age;
    constructor({ id, name, email, age }){
        this.#id=id;
        this.#name=name;
        this.#email=email;
        this.#age=age;
        this.validate();
    }
    validate() {
        if(this.#name.length<2){throw new ValidationError("Your name should be longer than two characteres");}
        if(!this.#email.includes('@') || !this.#email.includes('.')){ throw new ValidationError("Your email might not have '@' or '.'");}
        if(this.#age<1 || this.#age>120){ throw new ValidationError("Your age should be between 1 and 120");}
        if(parseInt(this.#id)<0){ throw new ValidationError("Your id can't negative");}
 }
    update(data){
        if(data.name!==undefined){this.#name=data.name};
        if(data.email!==undefined){this.#email=data.email};
        if(data.age!==undefined){this.#age=data.age};
        this.validate();
    }
    toJSON() {
        return{
            id: this.#id,
            name: this.#name,
            email:this.#email,
            age: this.#age
        };
    }
    get id() { return this.#id;}
    get name() { return this.#name;}
    get email() { return this.#email;}
    get age() { return this.#age;}
}
