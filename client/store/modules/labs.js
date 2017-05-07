import { labs as labsApi } from 'src/api'
import axios from 'axios'
import * as types from '../mutation-types'

const state = {
  labs: []
}
let instance = axios.create({
  timeout: 2000
})

// getters
const getters = {
  getLabs: state => state.labs
}

// actions
const actions = {
  async setLabs ({ commit }) {
    try {
      const res = await instance.get(labsApi.index)
      if (res.status !==200) {
        return {
          message: '获取实验室信息失败',
          type: 'warn'
        }
      }
      commit(types.SET_LABS, { labs: res.data })
      return {
        message: '获取实验室信息成功',
        type: 'success'
      }
    } catch (err) {
      console.log(err)
      return {
        message: '获取实验室信息失败',
        type: 'warn'
      }
    }
  }
}

const mutations = {
  [types.SET_LABS] (state, { labs }) {
    state.labs = labs
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
