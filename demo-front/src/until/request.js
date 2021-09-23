import Vue from 'vue'
import axios from 'axios'
import { Notification, Message } from 'element-ui';


const service = axios.create({
  //  在public/static/config.js中配置baseUrl
  
    withCredentials: false, // send cookies when cross-domain requests
    timeout: 60000 // request timeout
})



// response interceptor
service.interceptors.request.use(function (config) {
    // 发送请求之前做写什么
    return config;
  }, function (error) {
    // 请求错误的时候做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
      //上传下载接口拦截处理
      if(response.data.status == '1001'){
        return response;
      }else{
        alert(response.data.msg)
      }
    return response;
  }, function (error) {
    Notification.closeAll()
    Notification({
        title: "提示",
        message: "网络请求超时！",
        customClass: "hats-ui-message",
        type: "error",
        duration: 2000
    });

    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default service