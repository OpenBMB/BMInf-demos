import Vue from 'vue'

import emptyStatus from '@/components/emptyStatus'
import ellipsisTooltip from '@/components/ellipsisTooltip'

// 暂无数据
Vue.component('empty-status', emptyStatus)
// Tooltip 二次封装 (超出显示，不超出不显示)
Vue.component('ellipsis-tooltip', ellipsisTooltip)
