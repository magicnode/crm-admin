<template>
  <div class="login">
    <input type="text" v-model="name" placeholder="用户名/邮箱名">
    <input type="password" v-model="pwd" placeholder="密码">
    <div>
      <button class="button is-primary" @click="login">确定</button>
      <button class="button">取消</button>
    </div>
    <div>
      没有账号？前往 <router-link to="/register">注册</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      name: '',
      pwd: ''
    }
  },
  methods: {
    ...mapActions([
      'userLogin'
    ]),
    async login () {
      if (!this.name) {
        this.$magic.toast.show({
          message: '请输入用户名或邮箱',
          type: 'warn'
        })
        return
      }
      if (!this.pwd) {
        this.$magic.toast.show({
          message: '请输入密码',
          type: 'warn'
        })
        return
      }
      const auth = await this.userLogin({
        name: this.name,
        pwd: this.pwd
      })
      this.$magic.toast.show(auth)
      if (auth.type === 'success') {
        this.$router.push({path: '/user'})
      }
      return
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
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
}
</style>
