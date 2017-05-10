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
          type: 'warning'
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
        type: 'warning'
      }
    }
  },
  async createGoods ({ dispatch, commit}, { name, price, unit, description }) {
    try {
      const res = await instance.post(goodsApi.index, {
        name, price, unit, description
      })
      if (res.status === 200) {
        await dispatch('setGoods')
        return {
          message: 'success',
          type: 'success'
        }
      }
      return {
        message: 'fail',
        type: 'warn'
      }
    } catch (e) {
      console.error(e)
      return {
        message: 'fail',
        type: 'warn'
      }
    }
  },
  async updateGoods ({ dispatch, commit}, { _id, name, price, unit, description }) {
    try {
      console.log(`name is ${name}, price is ${price}, unit is ${unit}, description is ${description}`)
      const res = await instance.patch(goodsApi.show(_id), {
        name, price, unit, description
      })
      if (res.status === 200) {
        await dispatch('setGoods')
        return {
          message: 'success',
          type: 'success'
        }
      }
      return {
        message: 'fail',
        type: 'warn'
      }
    } catch (e) {
      console.error(e)
      return {
        message: 'fail',
        type: 'warn'
      }
    }
  },
  async deleteGoods ({ dispatch, commit}, { _id }) {
    try {
      const res = await instance.delete(goodsApi.show(_id))
      if (res.status === 200) {
        await dispatch('setGoods')
        return {
          message: 'success',
          type: 'success'
        }
      }
      return {
        message: 'fail',
        type: 'warning'
      }
    } catch (e) {
      console.error(e)
      return {
        message: 'fail',
        type: 'warning'
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
