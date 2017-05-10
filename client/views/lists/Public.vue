<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-10">
        <article class="tile is-child box">
          <h1 class="title">待购买物品</h1>
          <div class="block is-flex">
            <collapse accordion is-fullwidth>
              <collapse-item v-for="item in lists" :key="item._id" :title="item.name" v-show="item.material_status === 1">
                <span style="padding:10px;">{{ item.lab ? item.lab.name : '' }} {{ item.term ? item.term.name : '' }}</span>
                <collapse>
                  <div class="table-responsive">
                    <table class="table is-bordered is-striped is-narrow">
                      <thead>
                        <tr>
                          <th>物品名</th>
                          <th>价格(￥)</th>
                          <th>单位</th>
                          <th>个数</th>
                          <th>状态</th>
                          <th>操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="good in item.listgoods">
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
                            {{ good.count }}
                          </td>
                          <td>
                            {{ good.material_status | materialstatus }}
                          </td>
                          <td>
                            <button class="button is-info" @click="changeListGoods(good._id, 2)">购买</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <button class="button" @click="sendBack(item._id)">购买完毕</button>
                  </div>
                </collapse>
              </collapse-item>
            </collapse>
          </div>
        </article>
      </div>
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-parent is-10">
        <article class="tile is-child box">
          <h1 class="title">已经购买物品</h1>
          <div class="block is-flex">
            <collapse accordion is-fullwidth>
              <collapse-item v-for="item in lists" :key="item._id" :title="item.name" v-show="item.material_status === 2">
                <p>{{ item.lab ? item.lab.name : '' }}</p>
                <p>{{ item.term ? item.term.name : '' }}</p>
                <collapse>
                  <div class="table-responsive">
                    <table class="table is-bordered is-striped is-narrow">
                      <thead>
                        <tr>
                          <th>物品名</th>
                          <th>价格(￥)</th>
                          <th>个数</th>
                          <th>单位</th>
                          <th>状态</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="good in item.listgoods">
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
                            {{ good.count }}
                          </td>
                          <td>
                            {{ good.material_status | materialstatus }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </collapse>
              </collapse-item>
            </collapse>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Collapse, Item as CollapseItem } from 'vue-bulma-collapse'

export default {
  created () {
    this.setLists()
    console.log('asd', this.lists)
  },
  computed: {
    ...mapGetters({
      lists: 'getLists'
    })
  },
  methods: {
    ...mapActions([
      'setLists',
      'updateListGoods',
      'submitList'
    ]),
    async changeListGoods (_id, material_status) {
      const res = await this.updateListGoods({_id, material_status})
      this.$magic.toast.show(res)
      return
    },
    async sendBack(_id) {
      const res = await this.submitList({_id, material_status: 2})
      this.$magic.toast.show(res)
      this.$router.go(0)
      return
    }
  },
  components: {
    Collapse,
    CollapseItem
  }
}
</script>

<style lang="scss" scoped>
.tile.is-child {
  width: 100%;
}

.checklist {
  color: #333;
}

.btn {
}
</style>
