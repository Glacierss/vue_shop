import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'

Vue.use(VueRouter)

const routes = [
  // 路由重定向：检测到'/'地址后，通过redirect属性重定向到'/login'地址
  { path: '/', redirect: '/login' },
  // 配置登陆组件的路由
  { path: '/login', component: Login },
  // 配置Home组件的路由
  {
    path: '/home',
    component: Home,
    redirect: '/home/welcome',
    children: [
      { path: '/home/welcome', component: Welcome },
      { path: '/users', component: Users }
    ]
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 如果用户访问登录页，则不需要做权限控制，直接放行
  if (to.path === '/login') return next();
  // 如果不是登录页，那么就要进行权限控制(仅仅根据有无判断，真正使用还需将token发送回后端进行token值对比校验)
  // 1.如果sessionStorage中不存在token，跳转至登录页
  if (!sessionStorage.getItem('token')) return next('/login');
  // 2.直接放行 
  next();

})

export default router
