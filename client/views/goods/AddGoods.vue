<template>
  <div>
    <div class="tile is-ancestor">

      <div class="tile is-parent is-10 is-vertical">
        <article class="tile is-child box">
          <h1 class="title">添加新物品</h1>
          <div class="block">
            <p class="control">
              <input class="input is-primary" v-model="name" type="text" placeholder="物品名字">
            </p>
            <p class="control">
              <input class="input is-info" type="text" v-model="price" placeholder="参考价格">
            </p>
            <p class="control">
              <input class="input is-info" type="text" v-model="unit" placeholder="单位">
            </p>
            <p class="control">
              <input class="input is-success" type="text" v-model="description" placeholder="描述">
            </p>
            <p class="control">
              <button class="button is-primary" @click="addGoods">创建</button>
            </p>
          </div>
        </article>

      </div>

    </div>

  </div>
</template>

<script>
import { ApiStore } from 'config'
import axios from 'axios'

export default {
  data () {
    return {
      name: '',
      price: '',
      description: '',
      unit: ''
    }
  },

  methods: {
    addGoods () {
      const url = ApiStore.goods.post
      axios.post(url, {
        name: this.name,
        price: this.price,
        description: this.description,
        unit: this.unit
      }).then(rs => {
        console.log('rs', rs)
      }).catch(err => {
        console.error(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~bulma/sass/utilities/mixins';

.button {
  margin: 5px 0 0;
}

.control .button {
  margin: inherit;
}

.control.has-addons {
  @include mobile() {
    input {
      width: 100%;
    }

    input.is-expanded {
      flex-shrink: 1;
    }
  }
}
</style>
