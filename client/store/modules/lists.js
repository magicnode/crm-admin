import { ApiStore } from 'config'
import axios from 'axios'
import * as types from '../mutation-types'

const state = {
  lists: []
}

// getters
const getters = {
  getAllLists: state => state.lists
}

// actions
const actions = {
  getAllLists ({ commit }) {
    axios.get(ApiStore.lists.list).then(rs => {
      commit(types.GET_LISTS, { lists: rs.data })
    })
  }
}

const mutations = {
  [types.GET_LISTS] (state, { lists }) {
    state.lists = lists
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
