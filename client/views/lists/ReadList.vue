<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-10">
        <article class="tile is-child box">
          <h1 class="title">所有清单</h1>
          <div class="block is-flex">
            <collapse accordion is-fullwidth>
              <collapse-item v-for="item in lists" :key="item._id" :title="item.name">
                <collapse>
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
                        <tr v-for="good in item.goods">
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
    this.getAllLists()
  },
  computed: {
    ...mapGetters({
      lists: 'getAllLists'
    })
  },
  methods: {
    ...mapActions([
      'getAllLists'
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
