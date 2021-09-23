import {getslink} from "@/api/getlink" 
import {getlink} from "@/api/postlink" 
import {getMyDate,time} from '@/plugins/data.js'
export let text={
 state: {
    fillblankData:"",
    marklist:[]
   },
   mutations: {
    getFillblankData(state,payload){
        state.fillblankData= payload
    }  
   },
   actions: {
    fillblank(context,payload){
         return new Promise((resolve,reject)=>{
            getlink("/fillblank",payload).then((ok)=>{
                debugger
            //  console.log(ok.data.data);
              context.commit("getFillblankData",ok.data.data)
              
          }).then((ok)=>{
              debugger
              resolve(ok)
          }).catch((err)=>{
              reject(err)
          })
         })
      },
    
    }
 
}