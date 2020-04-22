import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import Login from '../views/login/login.vue'
import cookie from 'js-cookie'
Vue.use(VueRouter)

const routes = [
  { path: '/home', name: 'home', component: Home,meta:{requireAuth: true,}},
  { path: '/login', name: 'login', component: Login },
  { path: '/', redirect: 'home'},
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.VUE_APP_BASE_API,
  routes
})
/*路由跳转之前判断*/
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    const token = cookie.get(process.env.VUE_APP_SESSION_KEY)
    if (typeof token !== 'string' || !token) {
      return next('login')
    }
  }
  next()
})

export default router
