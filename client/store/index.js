import Vue from 'vue'
import Vuex from 'vuex'
import pkg from 'package'
import * as actions from './actions'
import * as getters from './getters'

import app from './modules/app'
import menu from './modules/menu'
import character from './modules/character'
import user from './modules/user'
import goods from './modules/goods'
import lists from './modules/lists'
import labs from './modules/labs'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,  // process.env.NODE_ENV !== 'production',
  actions,
  getters,
  modules: {
    app,
    menu,
    user,
    character,
    goods,
    lists,
    labs
  },
  state: {
    pkg
  },
  mutations: {
  }
})

export default store
