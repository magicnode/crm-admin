import lazyLoading from './lazyLoading'

export default {
  name: '物品管理',
  path: '/charts',
  meta: {
    icon: 'fa-bar-chart-o',
    expanded: false,
    link: 'charts/index.vue'
  },
  component: lazyLoading('charts', true),

  children: [
    {
      name: '分类查看',
      path: 'chartist',
      component: lazyLoading('charts/Chartist'),
      meta: {
        link: 'charts/Chartist.vue'
      }
    },
    {
      name: '物品查看',
      path: 'chartjs',
      component: lazyLoading('charts/Chartjs'),
      meta: {
        link: 'charts/Chartjs.vue'
      }
    }
  ]
}
