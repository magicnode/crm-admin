import { users as usersApi } from 'src/api'
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
  user: {},
  auth: null
}

// getters
const getters = {
  getUser: state => state.user,
  getAuth: state => local.token
}

// actions
const actions = {
  async userLogin ({ commit }, {name, pwd}) {
    try {
      const res = await instance.post(usersApi.auth, {
        name,
        pwd
      })
      if (res.status !== 200) {
        return {
          title: '登录结果',
          message: '登录失败',
          type: 'warn'
        }
      }
      const data = res.data
      console.log('data', data)
      commit(types.SET_USER, {user: data.user})
      local.setItem('token', data.token)
      local.setItem('username', data.user.username)
      return {
        title: '登录结果',
        message: '登录成功',
        type: 'success'
      }
    } catch (err) {
      console.log(err)
      return {
        title: '登录结果',
        message: '登录失败',
        type: 'warn'
      } 
    }
  },
  async userRegist ({commit}, {name, username, email, pwd, lab}) {
    try {
      const res = await instance.post(usersApi.register, {
        name,
        username,
        email,
        pwd,
        lab
      })
      if (res.status !== 200) {
        return {
          title: '注册结果',
          message: '注册失败',
          type: 'warn'
        }
      }
      const data = res.data
      commit(types.SET_USER, {user: data})
      local.setItem('token', data.token)
      return {
        title: '注册结果',
        message: '注册成功',
        type: 'success'
      }
    } catch (err) {
      console.log(err)
      return {
        title: '注册结果',
        message: '注册失败',
        type: 'warn'
      }
    }
  },
  async setUser ({ commit } ) {
    try {
      const res = await instance.post(usersApi.authcheck)
      if (res.status !== 200) {
        return {
          title: '登录结果',
          message: '登录失败',
          type: 'warn'
        }
      }
      const data = res.data
      console.log('data', data)
      commit(types.SET_USER, {user: data})
      return {
        title: '登录结果',
        message: '登录成功',
        type: 'success'
      }
    } catch (err) {
      console.log(err)
      return {
        title: '登录结果',
        message: '登录失败',
        type: 'warn'
      } 
    }
  }
}

const mutations = {
  [types.SET_USER] (state, { user }) {
    state.user = user
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
