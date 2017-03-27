import axios from 'axios'
import { ApiStore } from 'config'

// token 从localstorage中获取放入headers中

const permissionUrl = ApiStore.permission
const _permission = axios.get(permissionUrl.all)

export default {
  getAllPermission () {
    // axios.get(characterUrl.all)
    return _permission
  }
}
