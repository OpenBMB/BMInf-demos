import service from "@/until/yuyin.js"

export function getlink(url,data={}){

    return new Promise((resolve,reject)=>{
        service.request({
            url,
            method:"POST",
            data,
        }).then((ok)=>{
            resolve(ok)
        }).catch((err)=>{
            reject(err)
        })
    })
}