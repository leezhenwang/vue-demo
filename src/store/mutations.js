import Vue from 'vue';
import store from 'store';

const mutations = {
  showNoNetwork (state) {
    state.noNetwork = true;
  },
  recordGlobalScroll (state,scrollObj) {//记录全局的滚动
    Object.assign(state.globalScroll,scrollObj) 
    console.log(state.globalScroll);
  }
}

export default mutations