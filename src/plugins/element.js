import Vue from 'vue'
// 导入弹框提示组件Message--该组件需要挂载
import { Button, Form, Message, FormItem, Input } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

// 挂载消息框组件在Vue原型上
Vue.prototype.$message = Message;
