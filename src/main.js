import {api} from './services/api.js';
import {userManager} from './models/userManager.js';
import {UIManager} from './ui/UIManager.js';
import {Toast} from './ui/Toast.js';
import {NetworkError} from './utils/error.js';
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



