import { labs as labsApi } from 'src/api'
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
  getLabs: state => state.data
}

// actions
const actions = {
  async setLabs ({ commit }) {
    try {
      const res = await instance.get(labsApi.index)
      if (res.status !==200) {
        return {
          message: 'fail',
          type: 'warning'
        }
      }
      let data = res.data
      commit(types.SET_LABS, { data })
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
  async createLab ({ dispatch, commit}, { name, depart, description }) {
    try {
      const res = await instance.post(labsApi.index, {
        name, depart, description
      })
      if (res.status === 200) {
        await dispatch('setLabs')
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
  async updateLab ({ dispatch, commit}, { _id, name, depart, description }) {
    try {
      const res = await instance.patch(labsApi.show(_id), {
        name, name, depart, description
      })
      if (res.status === 200) {
        await dispatch('setLabs')
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
  async deleteLab ({ dispatch, commit}, { _id }) {
    try {
      const res = await instance.delete(labsApi.show(_id))
      if (res.status === 200) {
        await dispatch('setLabs')
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
  [types.SET_LABS] (state, { data }) {
    state.data = data
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
