import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'//引用vuex实例

// 富文本
import tinymce from 'tinymce'
import VueTinymce from '@packy-tang/vue-tinymce'
Vue.prototype.$tinymce = tinymce // 将全局tinymce对象指向给Vue作用域下
Vue.use(VueTinymce)     

import Header from '@/components/head/header.vue'
Vue.component("Header",Header)


// elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 复制剪贴板
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

Vue.use(ElementUI);
Vue.config.productionTip = false

// new Vue({
//     el: '#app',
//     router,
//     store,
//     render: h => h(App)
// })

import axios from 'axios'
let startApp = function () {
  // 打包用上面，写代码用下面
  // axios.get('../dist/static/config.json').then((res) => {
  axios.get('/static/config.json').then((res) => {
    // 基础地址
    Vue.prototype.url1 = res.data.UPLOAD_URL
    axios.defaults.baseURL =res.data.BASE_URL
    // axios.defaults.baseURL ="/proxy"
    new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App)
    })
  })
}

startApp()