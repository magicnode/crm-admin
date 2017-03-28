import lazyLoading from './lazyLoading'

export default {
  name: '清单',
  meta: {
    icon: 'fa-bar-chart-o',
    expanded: false
  },

  children: [
    {
      name: '创建清单',
      path: '/list/create',
      component: lazyLoading('lists/CreateList'),
      meta: {
        link: 'lists/CreateList.vue'
      }
    },
    {
      name: '查看清单',
      path: '/list/check',
      component: lazyLoading('lists/CheckList'),
      meta: {
        link: 'lists/CheckList.vue'
      }
    }
  ]
}
