import {api} form './services/api.js';
import {userManager} form './models/userManager.js';
import {UIManager} form './ui/UIManager.js';
import {Toast} form './ui/Toast.js';
import {NetworkError} form './utils/error.js';
async function initapp(){
  const userManager=new userManager();
  const ui=new UIManager(userManager);
  if(userManager.getAll().length===0){
    try{
      const data =await api.get('../data.json');
      if(data && Array.isArray(data.users)){
        for(const user of data.users){
          await userManager.addUser(user);
        }
        Toast.info('Initial users loaded');
      }
    }catch(err){
      if (err instanceof NetworkError){
        Toast.error('Could not fetch initial data');
      }
    }
  }
  ui.render();
}
initApp();


