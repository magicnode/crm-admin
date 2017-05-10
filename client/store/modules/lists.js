import { lists as listsApi, listgoods as listgoodsApi } from 'src/api'
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
  async updateList ({ commit }, { _id, name, goods, price, unit, count }) {
    try {
      console.log(`_id is ${_id}, goods is ${goods}, count is ${count}`)
      const res = await instance.patch(listsApi.show(_id), {
        goods, name, price, unit, count
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
  async submitList ({ dispatch, commit }, { _id, status, material_status }) {
    try {
      const res = await instance.patch(listsApi.show(_id), {
        status,
        material_status
      })
      if (res.status === 200) {
        await dispatch('setList', {_id})
        return {
          message: '提交成功， 等待审核',
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
  async updateListGoods ({ dispatch, commit }, { _id, status, material_status }) {
    try {
      const res = await instance.patch(listgoodsApi.show(_id), {
        status,
        material_status
      })
      if (res.status === 200) {
        await dispatch('setLists')
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
