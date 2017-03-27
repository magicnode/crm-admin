import character from '../../api/character'
import * as types from '../mutation-types'

const state = {
  characters: [],
  noauthpermission: {},
  modalpermission: []
}

// getters
const getters = {
  getAllCharacter: state => state.characters,
  getNoAuthPermission: (state) => state.modalpermission
}

// actions
const actions = {
  getAllCharacter ({ commit }) {
    character.getAllCharacter().then(rs => {
      console.log('change characters')
      commit(types.GET_CHARACTER, { characters: rs.data })
    })
  },
  getNoAuthPermission ({ commit }, id) {
    character.getNoAuthPermission(id).then(rs => {
      commit(types.GET_NOAUTHPERMISSION, { permission: rs.data, id })
    })
  }
}

const mutations = {
  [types.GET_CHARACTER] (state, { characters }) {
    state.characters = characters
  },
  [types.GET_NOAUTHPERMISSION] (state, { permission, id }) {
    state.noauthpermission[id] = permission
    state.modalpermission = permission
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
