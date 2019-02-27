const videoList = () => import('../../components/video/videoList.vue');
export default [
  {
    path: '/videoList',
    name: 'videoList',
    components: {
        default: videoList
    },
    meta: {
        title: '视频播放页',
    }
  },
]