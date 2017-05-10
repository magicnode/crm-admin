<template>
  <div>
    <div class="tile is-ancestor">

      <div class="tile is-parent is-10 is-vertical">
        <article class="tile is-child box">
          <h1 class="title">添加新实验室</h1>
          <div class="block">
            <p class="control">
              <input class="input is-primary" v-model="name" type="text" placeholder="实验室名">
            </p>
            <p class="control">
              <input class="input is-info" type="text" v-model="depart" placeholder="院系名">
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
      depart: '',
      description: ''
    }
  },
  methods: {
    ...mapActions([
      'createLab'
    ]),
    async add () {
      if (!(this.name&&this.depart&&this.description)) {
        this.$magic.toast.show({
          type: 'warn',
          message: '不能有空'
        })
        return
      }
      const res = await this.createLab({
        name: this.name,
        depart: this.depart,
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
