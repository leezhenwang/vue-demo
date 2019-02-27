// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { Button, Select } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store';
import 'lib-flexible/flexible.js'

import {ajaxPost,ajaxGet,jsonp} from './ajax/ajax.js'
//定义全局变量,可以直接使用this.$ajaxPost调用
Vue.prototype.$ajaxPost=ajaxPost;
Vue.prototype.$ajaxGet=ajaxGet;
Vue.prototype.$jsonp=jsonp;

Vue.config.productionTip = false

//饿了么ui组件引入
Vue.use(Button)
Vue.use(Select)

//设置每一个页面的title
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
