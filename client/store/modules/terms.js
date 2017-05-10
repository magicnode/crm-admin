import { term as termsApi } from 'src/api'
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
  getTerms: state => state.data
}

// actions
const actions = {
  async setTerms ({ commit }) {
    try {
      const res = await instance.get(termsApi.index)
      if (res.status !==200) {
        return {
          message: 'fail',
          type: 'warn'
        }
      }
      let data = res.data
      commit(types.SET_TERMS, { data })
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
  },
  async createTerm ({ dispatch, commit }, { name }) {
    try {
      const res = await instance.post(termsApi.create, {
        name
      })
      if (res.status !==200) {
        return {
          message: 'fail',
          type: 'warn'
        }
      }
      await dispatch('setTerms')
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
  },
  async delTerm ({ dispatch, commit }, { _id }) {
    try {
      console.log('asd del ter', _id)
      const res = await instance.delete(termsApi.index, {
        data: {_id}
      })
      if (res.status !==200) {
        return {
          message: 'fail',
          type: 'warn'
        }
      }
      await dispatch('setTerms')
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
  [types.SET_TERMS] (state, { data }) {
    state.data = data
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
