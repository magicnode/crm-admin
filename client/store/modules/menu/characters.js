import lazyLoading from './lazyLoading'

export default {
  name: '角色',
  meta: {
    icon: 'fa-bar-chart-o',
    expanded: false
  },
  children: [
    {
      name: '查看所有角色',
      path: '/characters/all',
      component: lazyLoading('characters', true),
      meta: {
        link: 'characters/index.vue'
      }
    },
    {
      name: '自身角色',
      path: '/characters/self',
      component: lazyLoading('characters/Check'),
      meta: {
        link: 'characters/Check.vue'
      }
    }
  ]
}
