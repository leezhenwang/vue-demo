//全局混入
import Vue from 'vue';
import { mapState,mapMutations } from 'vuex';
Vue.mixin({
  computed: {
    ...mapState([
      'globalScroll',
      'scrollComponent'
    ])
  },
  methods: {
    ...mapMutations([
      'recordGlobalScroll',
    ]),
    goback:function(){
      window.history.go(-1);
    },
    getScroll: function(){
      let obj = {};
      obj[this.$options.name] = {};
      obj[this.$options.name].scroll = document.documentElement.scrollTop || document.body.scrollTop || 0;
      this.recordGlobalScroll(obj);
    },
    setScroll: function(){
      let that = this;
      for(var key in this.globalScroll){
        if(key === that.$options.name){
          if (document.documentElement) {
            document.documentElement.scrollTop = this.globalScroll[key].scroll;
          }else if (document.body) {
            document.body.scrollTop = this.globalScroll[key].scroll;
          }
        }
      }
    },
  },
  beforeRouteLeave (to, from, next) {
    let that = this;
    this.scrollComponent.map(function(item){
      if(that.$options.name == item){
        that.getScroll();
      }
    })
    next();
  },
  activated(){
    let that = this;
    this.scrollComponent.map(function(item){
      if(that.$options.name == item){
        setTimeout(function(){
          that.setScroll();
        },10)
      }
    })
  }
});