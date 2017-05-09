import { goods as goodsApi } from 'src/api'
import axios from 'axios'
import window from 'window'

import * as types from '../mutation-types'

const state = {
  data: []
}

let local = window.localStorage

let instance = axios.create({
  timeout: 2000,
  headers: {
    Authorization: local.token
  }
})

// getters
const getters = {
  getGoods: state => state.data
}

// actions
const actions = {
  async setGoods ({ commit }) {
    try {
      const res = await instance.get(goodsApi.index)
      if (res.status !==200) {
        return {
          message: 'fail',
          type: 'warn'
        }
      }
      let data = res.data
      commit(types.SET_GOODS, { data })
      return {
        message: 'success',
        type: 'success'
      }
    } catch (err) {
      console.log(err)
      return {
        message: 'fail',
        type: 'warn'
      }
    }
  }
}

const mutations = {
  [types.SET_GOODS] (state, { data }) {
    state.data = data
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
