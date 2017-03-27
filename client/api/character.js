import axios from 'axios'
import { ApiStore } from 'config'

// token 从localstorage中获取放入headers中

const characterUrl = ApiStore.characters
const _character = axios.get(characterUrl.all)

export default {
  getAllCharacter () {
    // axios.get(characterUrl.all)
    return _character
  },
  getNoAuthPermission (id) {
    return axios.get(characterUrl.noauthpermission(id))
  },
  /* eslint-disable indent */
  addPermission ({ permission, character }) {
    return axios.post(characterUrl.CPermission(character), {
      permission
    })
  },
  rmPermission ({permission, character}) {
    console.log('permission.js', permission)
    console.log('character.js', character)
    return axios({
      method: 'delete',
      url: characterUrl.CPermission(character),
      data: {
        permission
      }
    })
  }
}
