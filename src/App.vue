<template>
  <div id="app">
    <div class="state-panel" v-if="noNetwork">
      <div class="title">网络不顺畅</div>
      <a class="btn" href="javascript:;" @click="reloadPage()">重新加载</a>
    </div>
    <router-view name="header" ref="header" class="obj-header"></router-view><!-- 头部的router-view -->
    <router-view name="backToTopBtn" ref="backToTopBtn" :show="isShowBackToTop"></router-view><!-- 滚动到头部的router-view -->
    <router-view name="tsBtn" ref="tsBtn"></router-view><!-- 滚动到头部的router-view -->
    <keep-alive :include="keepAliveInclude" :exclude="keepExclude">
      <router-view ref="pageView"></router-view><!-- 默认的router-view -->
    </keep-alive>
    <router-view name="footer" ref="footer" class="obj-footer"></router-view><!-- 底部的router-view -->
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'App',
  data() {
    return {
      keepAliveInclude: '',
      isShowBackToTop: false,
      keepExclude:'',
    }
  },
  computed: {
    ...mapState(['noNetwork','scrollComponent'])
  },
  methods:{
    
  },
  mounted(){
    this.keepAliveInclude = this.scrollComponent;
  }
}
</script>

<style lang="scss">
  @import './assets/sass/common.scss';
</style>
<style lang = "less">
  @import '~vux/src/styles/reset.less';
</style>

