<template>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">所有实验室</h4>
          <div class="table-responsive">
            <table class="table is-bordered is-striped is-narrow">
              <thead>
                <tr>
                  <th>学院名</th>
                  <th>实验室名</th>
                  <th>简介</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in labs" :key="item._id">
                  <td>
                    <input type="text" name="" :value="item.depart">
                  </td>
                  <td>
                    <input type="text" name="" :value="item.name">
                  </td>
                  <td>
                    <input type="text" name="" :value="item.description">
                  </td>
                  <td>
                    <span @click="edit(item._id, $event)"  class="icon is-small"><i class="fa fa-save"></i></span>
                    <span @click="delLab({_id: item._id})" class="icon is-small"><i class="fa fa-close"></i></span>
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
    if (this.labs.length <= 0) {
      const res = await this.setLabs()
      this.$magic.toast.show(res)
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      'labs': 'getLabs'
    })
  },
  methods: {
    ...mapActions([
      'setLabs',
      'updateLab',
      'deleteLab'
    ]),
    async edit (_id, event) {
      const act = confirm('确定更新这一实验室吗?')
      if (!act) return
      const $good = $(event.target).parent().parent().parent()
      const $input = $good.find('input')
      const depart = $input.eq(0).prop('value')
      const name = $input.eq(1).prop('value')
      const description = $input.eq(2).prop('value')
      if (!(name&&depart&&description)) {
        this.$magic.toast.show({
          message: '除描述外不能有空',
          type: 'warning'
        })
        return
      }
      const res = await this.updateLab({
        _id, name, depart, description
      })
      return this.$magic.toast.show(res)
    },
    async delLab ({_id}) {
      const act = confirm('确定删除这一实验室吗?')
      if (!act) return
      const res = await this.deleteLab({_id})
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
