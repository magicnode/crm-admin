import lazyLoading from './lazyLoading'

export default {
  name: '材料管理科',
  meta: {
    icon: 'fa-bar-chart-o',
    expanded: true
  },
  children: [
    {
      name: '学期任务',
      path: '/term/add',
      component: lazyLoading('term/index'),
      meta: {
        link: 'term/index'
      }
    },
    {
      name: '汇总清单',
      path: '/list/all',
      component: lazyLoading('lists/All'),
      meta: {
        link: 'list/All'
      }
    },
    {
      name: '统购清单',
      path: '/list/public',
      component: lazyLoading('lists/Public'),
      meta: {
        link: 'list/Public'
      }
    }
  ]
}
