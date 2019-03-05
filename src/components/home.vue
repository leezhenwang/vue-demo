<template>
  <div class="index-container">
    <div class="header-box">网站标题</div>
    <ul class="nav-box">
      <li class="nav-item">随想</li>
      <li class="nav-item">日志</li>
      <li class="nav-item">图片</li>
      <li class="nav-item" @click="goVideoList">视频</li>
      <li class="nav-item">音频</li>
      <li class="nav-item">聊天</li>
    </ul>
  </div>
</template>

<script>
  export default{
    name: 'home',
    data () {
      return {
        
      }
    },
    components:{
      
    },
    computed: {
      
    },
    created () {
      
    },
    mounted(){
      //get请求测试
      // let params = {
      //   cityId: 1,
      //   total: 6,
      // };
      // let config = {
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //   },
      //   resultCodeWhiteList:['7001']
      // }
      // this.$ajaxGet('https://qa.189jk.cn/api/yygh/recommendHospitals',params,config).then(data=>{
      //   console.log(data)
      // })
      //post请求测试
      // let config = {
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //   },
      //   resultCodeWhiteList:['7001']
      // };
      // this.$ajaxPost('https://qa.189jk.cn/api/yygh/recommendHospitals',params,config).then(data=>{
      //   console.log(data)
      // })
      //jsonp请求测试
      this.$jsonp('https://api.map.baidu.com/location/ip',{
        ak:'W9Llj2ckgmVzCETEZhPQ38zAolFIngpt',
        coor:"gcj02",
      }).then(data => {
        console.log(data);
      }).catch(error => {
        console.log(error)
      })
    },
    methods: {
      goVideoList(){
        this.$router.push({
          name: 'videoList',
        })
      },
      /**
       * @description [fnHandleScroll 内容区域滚动]
       * @author   shanshuizinong
       * @param    {Object}   e [事件对象]
       * @returns   {null}    [没有返回]
       */
      fnHandleScroll (e) {
        console.log('scroll触发了：' + this.count++, new Date())
      },
      /**
      * @description [fnThrottle 节流函数]
      * @author shanshuizinong
      * @param {Function} fn 延时调用函数
      * @param {Number} delay 延迟多长时间
      * @param {Number} atleast 至少多长时间触发一次
      * @return {Function} 延迟执行的方法
      */
      fnThrottle (fn, delay, atleast) {
        let timer = null
        let previous = null
        return function () {
          let now = +new Date()
          if (!previous) previous = now
          if (atleast && now - previous > atleast) {
            fn()
            previous = now
            clearTimeout(timer)
          } else {
            clearTimeout(timer)
            timer = setTimeout(function () {
              fn()
              previous = null
            }, delay)
          }
        }
      }
    }
  }
</script>
<style lang='scss'>
  @import '../assets/sass/home/home.scss'; 
</style>
