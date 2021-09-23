import Vue from 'vue'

// qs
import qs from 'qs'
Vue.prototype.qs = qs

// common
import common from '@/utils/common'
Vue.prototype.$common = common

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

// 引入全局css变量
import themes_style from '@/styles/themes.scss'
Vue.prototype.$themes_style = themes_style

// 时间格式转换
import moment from 'moment/moment'
Vue.prototype.$moment = moment
