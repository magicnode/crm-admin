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
                  <th>参考价格(￥)</th>
                  <th>单位</th>
                  <th>描述</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="good in goods" :key="good._id">
                  <td>
                    <input type="text" name="" :value="good.name">
                  </td>
                  <td>
                    <input type="text" name="" :value="good.price">
                  </td>
                  <td>
                    <input type="text" name="" :value="good.unit">
                  </td>
                  <td>
                  <input type="text" name="" :value="good.description">
                  </td>
                  <td>
                    <span @click="edit(good._id, $event)"  class="icon is-small"><i class="fa fa-save"></i></span>
                    <span @click="delGoods({_id: good._id})" class="icon is-small"><i class="fa fa-close"></i></span>
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
    if (this.goods.length <= 0) {
      const res = await this.setGoods()
      this.$magic.toast.show(res)
    }
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
      'setGoods',
      'updateGoods',
      'deleteGoods'
    ]),
    async edit (_id, event) {
      const act = confirm('确定更新这一物品吗?')
      if (!act) return
      const $good = $(event.target).parent().parent().parent()
      const $input = $good.find('input')
      const name = $input.eq(0).prop('value')
      const price = $input.eq(1).prop('value')
      const unit = $input.eq(2).prop('value')
      const description = $input.eq(3).prop('value')
      if (!(name&&price&&unit)) {
        this.$magic.toast.show({
          message: '除描述外不能有空',
          type: 'warning'
        })
        return
      }
      const res = await this.updateGoods({
        _id, name, price, unit, description
      })
      return this.$magic.toast.show(res)
    },
    async delGoods ({_id}) {
      const act = confirm('确定删除这一物品吗?')
      if (!act) return
      const res = await this.deleteGoods({_id})
      this.$magic.toast.show(res)
      return
    }
  }
}
</script>

<style scoped lang="less">
  footer.modal-card-foot {
    display: none;
  }
  table {
    tr {
      td {
        vertical-align: middle;
        input {
          width: 100%;
          padding: 3px;
        }
      }
    }
  }
</style>
