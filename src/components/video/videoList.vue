<template>
  <div>
    这里是视频列表页
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default{
    name: 'videoList',
    data () {
      return {
        
      }
    },
    components:{
      
    },
    computed: {
      ...mapState('video', {
        videoId: state => state.videoId,
      })
    },
    created () {
      
    },
    mounted(){
      console.log(this.videoId);
      this.changeVideoId(1)
      console.log(this.videoId);
    },
    methods: {
      ...mapMutations('video', [
        'changeVideoId', // -> this.foo()
      ])
    }
  }
</script>
<style lang='scss'>
   
</style>