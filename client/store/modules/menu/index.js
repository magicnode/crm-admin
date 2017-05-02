import * as types from '../../mutation-types'
import lazyLoading from './lazyLoading'
import characters from './characters'
import goods from './goods'
import user from './user'
import list from './list'
import college from './college'
import material from './material'
// show: meta.label -> name
// name: component name
// meta.label: display label

const state = {
  items: [
    {
      name: '主页',
      path: '/main',
      meta: {
        icon: 'fa-tachometer',
        link: 'dashboard/index.vue'
      },
      component: lazyLoading('dashboard', true)
    },
    user,
    characters,
    college,
    material,
    goods,
    list,
    {
      name: '库房',
      path: '/storeroom',
      meta: {
        icon: 'fa-tachometer',
        link: 'storeroom/index.vue'
      },
      component: lazyLoading('storeroom', true)
    }
    // {
    //   name: 'Dashboard',
    //   path: '/dashboard',
    //   meta: {
    //     icon: 'fa-tachometer',
    //     link: 'dashboard/index.vue'
    //   },
    //   component: lazyLoading('dashboard', true)
    // }
  ]
}

const mutations = {
  [types.EXPAND_MENU] (state, menuItem) {
    if (menuItem.index > -1) {
      if (state.items[menuItem.index] && state.items[menuItem.index].meta) {
        state.items[menuItem.index].meta.expanded = menuItem.expanded
      }
    } else if (menuItem.item && 'expanded' in menuItem.item.meta) {
      menuItem.item.meta.expanded = menuItem.expanded
    }
  }
}

export default {
  state,
  mutations
}
