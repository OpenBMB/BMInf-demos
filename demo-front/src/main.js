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

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
