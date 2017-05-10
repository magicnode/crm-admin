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
              <span class="select">
                <select v-model="term">
                  <option disabled selected>选择所属学期，不选则默认当前学期</option>
                  <option v-for="item in terms" :key="item._id" :value="item._id">{{item.name}}</option>
                </select>
              </span>
              <p style="padding-bottom: 6px;"><small>清单所属实验室将是当前登录人所属实验室</small></p>
            </p>
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
                    <th>数量</th>
                    <th>点击添加</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(good, index) in goods">
                    <td>
                      {{ good.name }}
                    </td>
                    <td>
                      {{ '￥' + good.price  }}
                    </td>
                    <td>
                      {{ good.unit }}
                    </td>
                    <td>
                      {{ good.description }}
                    </td>
                    <td>
                      <input type="text" name="count" v-model="count[index]">
                    </td>
                    <td>
                      <button class="button is-primary" @click="addGoodsToList(good._id, count[index])">添加</button> 
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button class="button is-success" @click="jumpToSubmit">下一步(查看)</button>
          </div>

          <div class="block" v-if="step3">
            <h1>最終审核</h1>
            <h1>{{ '清单名:' + list.name }}</h1>
            <h1>{{ '描述' + list.description }}</h1>
            <div class="table-responsive">
              <table class="table is-bordered is-striped is-narrow">
                <thead>
                  <tr>
                    <th>物品名</th>
                    <th>价格(￥)</th>
                    <th>个数</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="good in list.listgoods">
                    <td>
                      {{ good.goods.name }}
                    </td>
                    <td>
                      {{ good.goods.price }}
                    </td>
                    <td>
                      {{ good.count }}
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
    if (this.terms.length <= 0) {
      this.setTerms()
    }
    this.setGoods()
  },
  components: {
    ProgressTracker,
    StepItem
  },
  computed: {
    ...mapGetters({
      'goods': 'getGoods',
      'terms': 'getTerms',
      'list': 'getCreateList'
    })
  },
  data () {
    return {
      term: '选择所属学期，不选则默认当前学期',
      name: '',
      description: '',
      step1: true,
      step2: false,
      step3: false,
      count: [],
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
      'setTerms',
      'setGoods',
      'setList',
      'createList',
      'updateList'
    ]),
    async submitInfo () {
      const res = await this.createList({
        name: this.name,
        description: this.description,
        term: (this.term === '选择所属学期，不选则默认当前学期') ? this.terms[0] : this.term
      })
      this.$magic.toast.show(res)
      this.step1 = false
      this.step2 = true
      return
    },
    async addGoodsToList (goods, count) {
      const {_id} = this.list
      if (!_id) {
        this.$magic.toast.show({
          type: 'warning',
          message: 'no id fail'
        })
        return
      }
      const res = await this.updateList({
        _id,
        goods,
        count
      })
      this.$magic.toast.show(res)
      return
    },
    async jumpToSubmit () {
      const res = await this.setList({_id: this.list._id})
      this.$magic.toast.show(res)
      console.log('asd', this.list)
      this.step1 = false
      this.step2 = false
      this.step3 = true
      return
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
