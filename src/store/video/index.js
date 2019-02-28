import Vue from 'vue'
const video = {
    namespaced: true,
    state: {
      videoId: 0,
    },
    mutations: {
      changeVideoId(state,id){
        state.videoId = id;
      },
    },
    actions: {

    },
    getters: {
      doneTodos: state => {
        return state.todos.filter(todo => todo.done)
      }
    }
}
export default video