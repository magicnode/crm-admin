import lazyLoading from './lazyLoading'

export default {
  name: '库房',
  meta: {
    icon: 'fa-bar-chart-o',
    expanded: false
  },
  children: [
    {
      name: '添加新物品',
      path: '/goods/add',
      component: lazyLoading('goods/AddGoods'),
      meta: {
        link: 'goods/AddGoods.vue'
      }
    },
    {
      name: '物品查看',
      path: '/goods/list',
      component: lazyLoading('goods/GoodsList'),
      meta: {
        link: 'goods/GoodsList.vue'
      }
    }
  ]
}
