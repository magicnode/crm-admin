import lazyLoading from './lazyLoading'

export default {
  name: '角色',
  path: '/characters',
  meta: {
    icon: 'fa-bar-chart-o',
    expanded: false,
    link: 'charts/index.vue'
  },
  component: lazyLoading('characters', true)
}
