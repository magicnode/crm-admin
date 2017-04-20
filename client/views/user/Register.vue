<template>
  <div class="register">
    <input type="text" name="name" placeholder="用户名">
    <input type="text" name="email" placeholder="邮箱">
    <input type="text" name="pwd" placeholder="密码">
    <input type="text" name="pwd" placeholder="重复密码">
    <div>
      <button class="button is-primary">确定</button>
      <button class="button">取消</button>
    </div>
  </div>
</template>

<script>
export default {
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
}
</style>
