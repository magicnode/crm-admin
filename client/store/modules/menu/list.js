import lazyLoading from './lazyLoading'

export default {
  name: '清单',
  path: '/charts',
  meta: {
    icon: 'fa-bar-chart-o',
    expanded: false,
    link: 'charts/index.vue'
  },
  component: lazyLoading('charts', true),

  children: [
    {
      name: '创建清单',
      path: 'chartist',
      component: lazyLoading('charts/Chartist'),
      meta: {
        link: 'charts/Chartist.vue'
      }
    },
    {
      name: '查看清单',
      path: 'chartjs',
      component: lazyLoading('charts/Chartjs'),
      meta: {
        link: 'charts/Chartjs.vue'
      }
    }
  ]
}
