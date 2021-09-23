import service from "@/until/request.js"

export function getslink(url){
    return new Promise((resolve,reject)=>{
        service.request({
            url,
            method:"GET"
        }).then((ok)=>{
            resolve(ok)
        }).catch((err)=>{
            reject(err)
        })
    })
}