import axios from 'axios'
import { ApiStore } from 'config'

const goodsUrl = ApiStore.goods

export default {
  getAllGoods () {
    return axios.get(goodsUrl.list)
  },
  addGoods ({name, price, description}) {
    return axios({
      method: 'post',
      url: goodsUrl.post,
      data: {
        name,
        price,
        description
      }
    })
  }
}
