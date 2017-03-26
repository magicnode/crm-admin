import axios from 'axios'
import { ApiStore } from 'config'

// token 从localstorage中获取放入headers中

const characterUrl = ApiStore.characters
const _character = axios.get(characterUrl.all)

export default {
  getAllCharacter () {
    // axios.get(characterUrl.all)
    return _character
  }
}
