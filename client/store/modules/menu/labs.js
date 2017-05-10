import lazyLoading from './lazyLoading'

export default {
  name: '实验室管理',
  meta: {
    icon: 'fa-bar-chart-o',
    expanded: false,
    link: 'labs/index.vue'
  },
  children: [
    {
      name: '添加新实验室',
      path: '/labs/add',
      component: lazyLoading('labs/AddLabs'),
      meta: {
        link: 'labs/AddLabs.vue'
      }
    },
    {
      name: '实验室查看',
      path: '/labs/check',
      component: lazyLoading('labs', true),
      meta: {
        link: 'labs/index.vue'
      }
    }
  ]
}