import lazyLoading from './lazyLoading'

export default {
  name: '用户信息',
  path: '/user',
  meta: {
    icon: 'fa-tachometer',
    expanded: false,
    link: 'user/Info.vue'
  },
  component: lazyLoading('user/Info')
}
