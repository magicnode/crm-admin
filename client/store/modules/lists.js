import { lists as listsApi } from 'src/api'
import axios from 'axios'
import window from 'window'
import * as types from '../mutation-types'

let local = window.localStorage

let instance = axios.create({
  timeout: 2000,
  headers: {
    Authorization: local.token
  }
})

const state = {
  data: [],
  createlist: {
    name: '',
    description: '',
    listgoods: [],
    lab: {},
    term: ''
  }
}

// getters
const getters = {
  getLists: state => state.data,
  getCreateList: state => state.createlist
}

// actions
const actions = {
  async setLists ({ commit }) {
    try {
      const res = await instance.get(listsApi.index)
      if (res.status !==200) {
        return {
          message: 'fail',
          type: 'warning'
        }
      }
      let data = res.data
      commit(types.SET_LISTS, { data })
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
  async setList ({ commit }, {_id}) {
    try {
      const res = await instance.get(listsApi.show(_id))
      if (res.status !==200) {
        return {
          message: 'fail',
          type: 'warning'
        }
      }
      let data = res.data
      commit(types.SET_CREATE_LIST, { createlist: data })
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
  async createList ({ commit}, { name, lab, term, description }) {
    try {
      const res = await instance.post(listsApi.index, {
        name, lab, term, description
      })
      if (res.status === 200) {
        commit(types.SET_CREATE_LIST, { createlist: res.data })
        return {
          message: 'success',
          type: 'success',
          list: res.data
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
  async updateList ({ commit }, { _id, goods, count }) {
    try {
      console.log(`_id is ${_id}, goods is ${goods}, count is ${count}`)
      const res = await instance.patch(listsApi.show(_id), {
        goods, count
      })
      console.log('qwe123', res.data)
      if (res.status === 200) {
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
  async submitList ({ commit }, { _id }) {
    try {
      const res = await instance.patch(listsApi.show(_id), {
        status: 1
      })
      if (res.status === 200) {
        commit(types.SET_CREATE_LIST, { createlist: res.data })
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
  }
}

const mutations = {
  [types.SET_LISTS] (state, { data }) {
    state.data = data
  },
  [types.SET_CREATE_LIST] (state, { createlist }) {
    state.createlist = createlist
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
