// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';
import 'lib-flexible/flexible.js'

import {ajaxPost,ajaxGet,jsonp} from './ajax/ajax.js'
//定义全局变量,可以直接使用this.$ajaxPost调用
Vue.prototype.$ajaxPost=ajaxPost;
Vue.prototype.$ajaxGet=ajaxGet;
Vue.prototype.$jsonp=jsonp;

Vue.config.productionTip = false

//引入vconsole调试工具
var VConsole = require('vconsole');
var vConsole = new VConsole();

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
  preLoad: 1.1,
  loading:'./assets/images/loading.gif'
});
//设置每一个页面的title
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

//设置移动端点击延迟问题
const FastClick = require('fastclick')
FastClick.attach(document.body)
//引入vux组件
//使用插件将指向this原型
import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin,{type: 'text',position: 'middle'})
//不使用插件时，全局注册
import { PopupPicker } from 'vux'
Vue.component('popup-picker', PopupPicker)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
