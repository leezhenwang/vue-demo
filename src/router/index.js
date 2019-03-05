import Vue from 'vue'
import Router from 'vue-router'
// 首页模块
import home from './module/home';
// 视频模块
import video from './module/video'

Vue.use(Router)

export default new Router({
  routes: [
    ...home,
    ...video,
  ]
})
