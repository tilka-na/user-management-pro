export class AppError extends Error {
  constructor(message, type = 'GENERAL'){
    super(message);
    this.type=type;
  }
}
export class ValidationError extends AppError {
  constructor(message){
    super(message,"Validation");
  }
}
export class NotFoundError extends AppError { 
  constructor(message){
    super(message,"Not_Found");
  }
}
export class NetworkError extends AppError { 
    constructor(message){
    super(message,"Network_Error");  
    }
}
