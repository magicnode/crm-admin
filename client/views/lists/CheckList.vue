<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-10">
        <article class="tile is-child box">
          <h1 class="title">所有待审核清单</h1>
          <div class="block is-flex">
            <collapse accordion is-fullwidth>
              <collapse-item v-for="item in lists" :key="item._id" :title="item.name" v-show="item.status !== 3">
                <p>{{ item.lab ? item.lab.name : '' }}</p>
                <p>{{ item.term ? item.term.name : '' }}</p>
                <collapse>
                  <div class="table-responsive">
                    <table class="table is-bordered is-striped is-narrow">
                      <thead>
                        <tr>
                          <th>物品名</th>
                          <th>价格(￥)</th>
                          <th>单位</th>
                          <th>个数</th>
                          <th>分类</th>
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
                            {{ good.status | goodsstatus }}
                          </td>
                          <td>
                            <button class="button is-info" @click="changeListGoods(good._id, 3, item._id)">统购</button>
                            <button class="button is-primary" @click="changeListGoods(good._id, 4, item._id)">自购</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <button class="button" @click="sendBack(item._id)">审批结束，返回实验室</button>
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
          <h1 class="title">审核结束清单</h1>
          <div class="block is-flex">
            <collapse accordion is-fullwidth>
              <collapse-item v-for="item in lists" :key="item._id" :title="item.name" v-show="item.status === 3">
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
                          <th>分类</th>
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
                            {{ good.status | goodsstatus }}
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
    async changeListGoods (_id, status, list_id) {
      const lists = await this.submitList({_id: list_id, status: 2})
      const res = await this.updateListGoods({_id, status})
      this.$magic.toast.show(res)
      return
    },
    async sendBack(_id) {
      const res = await this.submitList({_id, status: 3})
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
