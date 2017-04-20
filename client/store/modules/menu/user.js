import lazyLoading from './lazyLoading'

export default {
  name: '用户信息',
  path: '/user',
  meta: {
    icon: 'fa-bar-chart-o',
    expanded: false,
    link: 'charts/index.vue'
  },
  component: lazyLoading('characters', true)
}
