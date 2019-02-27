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
