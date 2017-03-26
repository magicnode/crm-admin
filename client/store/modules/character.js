import character from '../../api/character'
import * as types from '../mutation-types'

const state = {
  characters: []
}

// getters
const getters = {
  getAllCharacter: state => state.characters
}

// actions
const actions = {
  getAllCharacter ({ commit }) {
    character.getAllCharacter().then(rs => {
      commit(types.GET_CHARACTER, { characters: rs.data })
    })
  }
}

const mutations = {
  [types.GET_CHARACTER] (state, { characters }) {
    state.characters = characters
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
