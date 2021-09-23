// 公共引入
import Vue from 'vue'

// Element-ui
import './element'
// global prototype
import './prototype'
// global components
import './component'
// global css
import '@/styles/index.scss'
// navbar css
import '@/styles/common/navbar.scss'
// A modern alternative to CSS resets
import 'normalize.css/normalize.css'
// iconfont local
// import '@/icons/iconfont/iconfont.css' //iconfont css
// permission control
import '@/permission'
// bus
import VueBus from 'vue-bus'
// echartswordcloud
import echartswordcloud from 'echarts-wordcloud'

// 全局过滤器
import * as custom from '@/utils/filters'
// 导出的是对象，可以直接通过 key 和 value 来获得过滤器的名和过滤器的方法
Object.keys(custom).forEach(key => Vue.filter(key, custom[key]))

Vue.use(VueBus)
Vue.use(echartswordcloud)

