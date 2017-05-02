import lazyLoading from './lazyLoading'

export default {
  name: '学院管理',
  path: '/college',
  meta: {
    icon: 'fa-bar-chart-o',
    expanded: false,
    link: 'college/index.vue'
  },
  component: lazyLoading('college', true)
}
