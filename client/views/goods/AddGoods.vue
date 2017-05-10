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
              <button class="button is-primary" @click="add">创建</button>
            </p>
          </div>
        </article>

      </div>

    </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex'

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
    ...mapActions([
      'createGoods'
    ]),
    async add () {
      if (!(this.name&&this.price&&this.unit)) {
        this.$magic.toast.show({
          type: 'warn',
          message: '不能有空'
        })
        return
      }
      const res = await this.createGoods({
        name: this.name,
        price: this.price,
        unit: this.unit,
        description: this.description
      })
      this.$magic.toast.show(res)
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
