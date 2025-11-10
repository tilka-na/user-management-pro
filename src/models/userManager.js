import{user} from './user.js';
impoer {ValidationError,NotFoundError} from '../utils/error.js';
export class UserManager {
 #users = [];
 #nextId = 1;
 constructor() { this.#loadFromStorage(); }
 }
 async addUser(data){
   try{
     const user =new user({
        id: this.#nextId++,
        name: data.name,
        email: data.email,
        age: data.age
     });
     this.#users.push(user);
     await this.#save();
   }catch(err){
     if(err instanceof ValidationError){
       throw err;
     }
     throw  new ValidationError('Failed to add user');
   }
 }//→ returns new User
 getUser(id){
   const user= this.#users.find(us=>us.id===id);
   if(!user) throw new NotFoundError(`User with id:${id} not found `);
 } //→ throws NotFoundError if not found
 async updateUser(id, data){
   const user=this.getUser(id);
   user.update(data);
   await this.#save();
   return user;
 }
 async deleteUser(id){
   const index=this.#users.findIndex(u=>u.id===id);
   if(index===-1) throw new NotFoundError(`User with id:${id} not found `);
   this.#users.splice(index,1);
   await this.#save();
 }
 getAll(){
   return this.#users;
 }// → returns shallow copy of users array
 #save(){
   return storage.set('users',this.#users.map(u=>u.toJSON()))
 } //→ writes to localStorage
 #loadFromStorage()// → reads from localStorage
