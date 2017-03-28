import goods from '../../api/goods'
import * as types from '../mutation-types'

const state = {
  goods: []
}

// getters
const getters = {
  getAllGoods: state => state.goods
}

// actions
const actions = {
  getAllGoods ({ commit }) {
    goods.getAllGoods().then(rs => {
      commit(types.GET_GOODS, { goods: rs.data })
    })
  }
}

const mutations = {
  [types.GET_GOODS] (state, { goods }) {
    state.goods = goods
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
