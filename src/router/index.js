import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '@/views/Main.vue'
Vue.use(VueRouter)

// 1. 创建路由组件
// 2. 将组件和路由进行映射
// 3. 创建VueRouter实例

const routes = [
  {
    path: '/',
    component: Main,
    redirect: '/home',
    children: [
      {path: 'home', name: 'home', component: () => import('@/views/Home.vue')},
      {path: 'user', name: 'user', component: () => import('@/views/User.vue')},
      {path: 'consumer', name: 'consumer', component: () => import('@/views/Consumer.vue')},
      {path: 'operation', name: 'operation', component: () => import('@/views/Operation.vue')},
    ]
  }

]

const router = new VueRouter({
  routes //(缩写, 相当于 routes : routes)
})

export default router





