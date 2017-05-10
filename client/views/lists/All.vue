<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-10">
        <article class="tile is-child box">
          <h1 class="title">所有清单</h1>
          <div class="block is-flex">
            <collapse accordion is-fullwidth>
              <collapse-item v-for="item in lists" :key="item._id" :title="item.name">
                <span>{{item.status | liststatus}}</span>
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
                          <th>数量</th>
                          <th>分类</th>
                          <th>购买状态</th>
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
          <p>
            <button class="button is-info">发送校长</button>
            <button class="button is-primary">发送审计部</button>
          </p>
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
  },
  computed: {
    ...mapGetters({
      lists: 'getLists'
    })
  },
  methods: {
    ...mapActions([
      'setLists'
    ])
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
</style>
