<template>
  <div class="register">
    <input type="text" name="name" placeholder="用户名" v-model="name">
    <input type="text" name="name" placeholder="昵称" v-model="username">
    <input type="email" name="email" placeholder="邮箱" v-model="email">
    <input type="password" name="pwd" placeholder="密码" v-model="pwd">
    <input type="password" name="doubblepwd" placeholder="重复密码" v-model="doubblepwd">
    <p class="control">
      <span class="select">
        <select v-model="lab">
          <option disabled selected>选择实验室(不选则为空)</option>
          <option :value="null">空</option>
          <option v-for="item in labs" :key="item._id" :value="item._id">{{item.name}}</option>
        </select>
      </span>
    </p>
    <p>实验室员工、主管注册时需要选择所属实验室</p>
    <div>
      <button class="button is-primary" @click="regist">确定</button>
      <button class="button">取消</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Message from 'vue-bulma-message'
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      name: '',
      username: '',
      email: '',
      pwd: '',
      doubblepwd: '',
      lab: '选择实验室(不选则为空)'
    }
  },
  created () {
    this.initLabs()
  },
  components: {
    Message
  },
  computed: {
    ...mapGetters({
      labs: 'getLabs'
    })
  },
  methods: {
    ...mapActions([
      'setLabs',
      'userRegist'
    ]),
    async initLabs () {
      if (this.labs.length <= 0) {
        const info = await this.setLabs()
        this.$magic.toast.show(info)
      }
    },
    async regist () {
      if (!this.name) {
        this.$magic.toast.show({
          message: '用户名不能为空',
          type: 'warn'
        })
        return
      }
      if (!this.username) {
        this.$magic.toast.show({
          message: '昵称不能为空',
          type: 'warn'
        })
        return
      }
      if (!this.email) {
        this.$magic.toast.show({
          message: '邮箱不能为空',
          type: 'warn'
        })
        return
      }
      if (this.pwd !== this.doubblepwd) {
        this.$magic.toast.show({
          message: '密码不同',
          type: 'warn'
        })
        return
      }
      if (this.lab === '选择实验室(不选则为空)') {
        this.lab = null
      }
      const user = await this.userRegist({
        name: this.name,
        username: this.username,
        email: this.email,
        pwd: this.pwd,
        lab: this.lab
      })
      this.$magic.toast.show(user)
      if (user.type === 'success') {
        this.$router.push({path: '/user'})
      }
      return
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
  display: flex;
  align-items: center;
  flex-direction: column;
  input {
    width: 50%;
    padding: .5rem;
    margin: .5rem;
  }
  div {
    padding: .5rem;
    margin: 1rem;
  }
  .control {
    width: 50%;
    span {
      width: 100%;
      select {
        width: 100%;
      }
    }
  }
}
</style>
