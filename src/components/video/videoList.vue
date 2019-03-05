<template>
  <div class="video-container">
    这里是视频列表页
    <button @click="handleClick">麻烦点我！</button>
    <button-tab>
      <button-tab-item>{{ 1 }}</button-tab-item>
      <button-tab-item selected>{{ 2 }}</button-tab-item>
      <button-tab-item>{{ 3 }}</button-tab-item>
    </button-tab>
    <popup-picker :title="title" :data="list" v-model="value"></popup-picker> 
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import { ButtonTab, ButtonTabItem } from 'vux'
  export default{
    name: 'videoList',
    data () {
      return {
        value: ['iPhone'],
        title: '详细机型',
        list: [['小米', 'iPhone', '华为', '情怀', '三星', '其他', '不告诉你']],
      }
    },
    components:{
      ButtonTab,
      ButtonTabItem
    },
    computed: {
      ...mapState('video', {
        videoId: state => state.videoId,
      })
    },
    created () {
      
    },
    mounted(){
      this.changeVideoId(1)
      this.$vux.toast.show({
        type: 'text',
        text: '欢迎你进入本页面'
      })
    },
    methods: {
      ...mapMutations('video', [
        'changeVideoId',
      ]),
      handleClick(){
        this.$vux.toast.show({
          text: '点我干嘛'
        })
      }
    }
  }
</script>
<style lang='scss'>
  @import '../../assets/sass/video/videoList.scss'
</style>