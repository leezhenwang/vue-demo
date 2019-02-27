import Vue from 'vue';
import store from 'store';

const mutations = {
    showNoNetwork (state) {
        state.noNetwork = true;
    },
}

export default mutations