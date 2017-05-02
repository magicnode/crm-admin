import lazyLoading from './lazyLoading'

export default {
  name: '用户信息',
  path: '/user',
  meta: {
    icon: 'fa-bar-chart-o',
    expanded: false,
    link: 'user/Info.vue'
  },
  component: lazyLoading('user/Info')
}
