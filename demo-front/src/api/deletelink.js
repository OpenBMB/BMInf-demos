import service from "@/until/request.js"

export function deletelink(url){
    return new Promise((resolve,reject)=>{
        service.request({
            url,
            method:"DELETE"
        }).then((ok)=>{
            resolve(ok)
        }).catch((err)=>{
            reject(err)
        })
    })
}