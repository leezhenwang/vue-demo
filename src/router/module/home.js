const home = () => import('../../components/home.vue');
export default [
  {
      path: '/home',
      name: 'home',
      components: {
          default: home
      },
      meta: {
          title: '首页',
      }
  },
  {
    path: '/',
    name: 'home',
    components: {
        default: home
    },
    meta: {
        title: '首页',
    }
},
]