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
    name: 'videoList',
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
      }
    }
  }
</script>
<style lang='scss'>
  @import '../assets/sass/home/home.scss'; 
</style>
