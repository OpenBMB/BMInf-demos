import service from "@/until/request.js"
import Vue from "vue"
export function uploadLink(url,data={}){
    return new Promise((resolve,reject)=>{
        service.request({
            url,
            method:"POST",
            baseURL:Vue.prototype.url1,
            data,
            headers: {
                STORE_BUCKET_KEY: "zs-a3efde7e"
            }
        }).then((ok)=>{
            resolve(ok)
        }).catch((err)=>{
            reject(err)
        })
    })
}