 export class Toast {
  static #create(message,type){
    const toast=document.createElement('div');
    toast.className=`toast ${type}`;
    toast.textContent=message;
    document.body.appendChild(toast);
    setTimeout(()=>toast.remove(),3000);
  
  }
  static success(message){
    this.#create(message,'success');
  }
  static error(message){
    this.#create(message,'error');
  }
  static info(message){
    this.#create(message,'info');
  }
// Auto-remove after 3 seconds
 // Stackable and styled
 }

