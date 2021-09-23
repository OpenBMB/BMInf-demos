import {getslink} from "@/api/getlink" 
export let home={
    state: {
       homelist:[],

      },
      mutations: {
     
          homelist(state,payload){
           state.homelist =payload
          }
          
      },
      actions: {
        homelist(context){
            return new Promise((resolve,reject)=>{
             getslink("/config/menu").then((ok)=>{
                console.log(ok);
                 context.commit("homelist",ok.data.data.subs)
                 
             }).then((ok)=>{
                 resolve(ok)
             }).catch((err)=>{
                 reject(err)
             })
            })
         },
      
       }
    
   }