<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h1 class="title">创建清单步骤</h1>
          <div class="block">
            <progress-tracker word>
              <step-item v-for="item in stepItems" :key="item.title" :marker="item.marker" :title="item.title">
              </step-item>
            </progress-tracker>
          </div>
          <div class="block" v-if="step1">
            <p class="control">
              <input class="input is-primary" v-model="name" type="text" placeholder="清单名字">
            </p>
            <p class="control">
              <input class="input is-success" type="text" v-model="description" placeholder="清单描述(可选)">
            </p>
            <p class="control">
              <button class="button is-primary" @click="submitInfo">提交信息</button>
            </p>
          </div>

          <div class="block" v-if="step2">
            <div class="table-responsive">
              <table class="table is-bordered is-striped is-narrow">
                <thead>
                  <tr>
                    <th>物品名</th>
                    <th>参考价格</th>
                    <th>单位</th>
                    <th>描述</th>
                    <th>点击添加</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>物品名</th>
                    <th>参考价格</th>
                    <th>单位</th>
                    <th>描述</th>
                    <th>点击添加</th>
                  </tr>
                </tfoot>
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
                    <td>
                      <button class="button is-primary" @click="addGoodsToList(good._id)">添加</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button class="button is-success" @click="jumpToStep()">完成</button>
          </div>

          <div class="block" v-if="step3">
            <h1>{{ '清单名:' + sendList.name }}</h1>
            <h1>{{ sendList.description }}</h1>
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
                <tfoot>
                  <tr>
                    <th>物品名</th>
                    <th>参考价格</th>
                    <th>单位</th>
                    <th>描述</th>
                  </tr>
                </tfoot>
                <tbody>
                  <tr v-for="good in sendList.goods">
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
            <button class="button is-success" @click="sendListTo">发送主管</button>
          </div>

        </article>
      </div>
    </div>
  </div>
</template>

<script>
import ProgressTracker, { StepItem } from 'vue-bulma-progress-tracker'
import { ApiStore } from 'config'
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'

import Vue from 'vue'
import Message from 'vue-bulma-message'

const MessageComponent = Vue.extend(Message)

const openMessage = (propsData = {
  title: '',
  message: '',
  type: '',
  direction: '',
  duration: 1500,
  container: '.messages'
}) => {
  return new MessageComponent({
    el: document.createElement('div'),
    propsData
  })
}

export default {
  created () {
    this.getAllGoods()
  },
  components: {
    ProgressTracker,
    StepItem
  },
  computed: {
    ...mapGetters({
      'goods': 'getAllGoods'
    })
  },
  data () {
    return {
      name: '',
      description: '',
      step1: true,
      step2: false,
      step3: false,
      list: '',
      sendList: {},
      stepItems: [
        {
          title: '提交信息'
        },
        {
          title: '添加物品'
        },
        {
          title: '发送主管审核'
        }
      ]
    }
  },
  methods: {
    ...mapActions([
      'getAllGoods'
    ]),
    submitInfo () {
      const url = ApiStore.lists.post
      axios.post(url, {
        name: this.name,
        description: this.description
      }).then(rs => {
        console.log('rs', rs)
        this.list = rs.data
        openMessage({
          message: '清单初步创建成功，请添加审核物品',
          type: 'success',
          duration: 1500
        })
        this.step1 = false
        this.step2 = true
      }).catch(err => {
        console.error(err)
        openMessage({
          message: '清单创建失败，请审核信息',
          type: 'fail',
          duration: 2000
        })
      })
    },
    addGoodsToList (goods) {
      const list = this.list._id || 'asodsaio'
      const url = ApiStore.lists.update(list)
      axios.put(url, {
        goods
      }).then(rs => {
        console.log('rs', rs)
        openMessage({
          message: '清单初步创建成功，请添加审核物品',
          type: 'success',
          duration: 1500
        })
      }).catch(err => {
        console.error(err)
        openMessage({
          message: '添加物品失败',
          type: 'fail',
          duration: 2000
        })
      })
    },
    jumpToStep (step) {
      this.step2 = false
      this.step3 = true
      const list = this.list._id || 'asodsaio'
      const url = ApiStore.lists.show(list)
      axios.get(url).then(rs => {
        console.log('rs', rs)
        openMessage({
          message: '清单创建成功，准备发送审核',
          type: 'success',
          duration: 1500
        })
        this.sendList = rs.data
      }).catch(err => {
        console.error(err)
        openMessage({
          message: '添加物品失败',
          type: 'fail',
          duration: 2000
        })
      })
    },
    sendListTo () {
      this.$router.push({path: '/'})
    }
  }

}
</script>

<style lang="scss" scoped>
.button {
  margin: 5px 0 0;
}
</style>
