import Vue from 'vue'
import App from './App'
import router from './router'

// elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
