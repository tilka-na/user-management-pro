import{user} from './user.js';
import{storage} from '../services/storage.js';
import {ValidationError,NotFoundError} from '../utils/error.js';
export class userManager {
 #users = [];
 #nextId = 1;
 constructor() { this.#loadFromStorage(); }
 async addUser(data){
   try{
     const user =new User({
        id: this.#nextId++,
        name: data.name,
        email: data.email,
        age: data.age
     });
     this.#users.push(user);
     await this.#save();
     return user;
   }catch(err){
     if(err instanceof ValidationError) throw err;
       throw  new AppError('Failed to add user');
   }
 }//→ returns new User
 getUser(id){
   const user= this.#users.find(us=>us.id===Number(id));
   if(!user) throw new NotFoundError(`User with id:${id} not found `);
   return user;
 } //→ throws NotFoundError if not found
 async updateUser(id, data){
  try{
   const user=this.getUser(id);
   user.update(data);
   await this.#save();
   return user;
 }catch(err){
     if(err instanceof ValidationError) throw err;
       throw  new AppError('Failed to add user');
  }
  }
 async deleteUser(id){
  try{
   const index=this.#users.findIndex(u=>u.id===Number(id));
   if(index===-1) throw new NotFoundError(`User with id:${id} not found `);
   this.#users.splice(index,1);
   await this.#save();
 }catch(err){
     if(err instanceof ValidationError) throw err;
       throw  new AppError('Failed to add user');
 }
 }
 getAll(){
   return [...this.#users];
 }// → returns shallow copy of users array
 #save(){
   await storage.set('users',this.#users.map(u=>u.toJSON()))
 } //→ writes to localStorage
 #loadFromStorage(){
  const data =storage.get('users');
  if (data && Array.isArray(data)){
   this.#users=data.map(obj=>new User(obj));
   this.#nextID=this.#users.length ? Math.max(...this.#users.map(u=>u.id))
    }
  }// → reads from localStorage
 }

