import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'

// 导入axios
import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

// axios的请求拦截器
axios.interceptors.request.use(config => {
  // console.log(config);
  // 给每次发出的get请求头中添加Authorization属性，值为token，判断是否拥有获取数据的权限
  config.headers.Authorization = sessionStorage.getItem('token');
  return config;
});

Vue.prototype.$http = axios;

// 关闭Vue的生产提示
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
