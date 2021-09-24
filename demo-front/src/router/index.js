import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    children:[
      {
        // 文本填写
        path: '/text',
        name: 'text',
        component: () => import('../views/secondarylist/text.vue'),
      },
      {
        // 对话
        path: '/dialog',
        name: 'dialog',
        component: () => import('../views/secondarylist/dialog.vue'),
      },
      {
        // 故事
        path: '/story',
        name: 'story',
        component: () => import('../views/secondarylist/story.vue'),
      },
  ]
  }
]

const router = new VueRouter({
  routes
})

export default router
