<template>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">所有物品</h4>
          <div class="table-responsive">
            <table class="table is-bordered is-striped is-narrow">
              <thead>
                <tr>
                  <th>物品名</th>
                  <th>参考价格</th>
                  <th>单位</th>
                  <th>描述</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="good in goods">
                  <td>
                    {{ good.name }}
                  </td>
                  <td>
                    {{ good.price }}
                  </td>
                  <td>
                    {{ good.unit }}
                  </td>
                  <td>
                    {{ good.description }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>
      </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  async created () {
    const res = await this.setGoods()
    this.$magic.toast.show(res)
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      'goods': 'getGoods'
    })
  },
  methods: {
    ...mapActions([
      'setGoods'
    ])
  }
}
</script>

<style>
  footer.modal-card-foot {
    display: none;
  }
</style>
