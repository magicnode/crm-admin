<template>
  <div class="register">
    <input type="text" name="name" placeholder="用户名">
    <input type="text" name="email" placeholder="邮箱">
    <input type="text" name="pwd" placeholder="密码">
    <input type="text" name="pwd" placeholder="重复密码">
    <p class="control">
      <span class="select">
        <select>
          <option v-show="false">选择院系</option>
          <option>空</option>
          <option>物理实验室</option>
          <option>化学实验室</option>
          <option>航空实验室</option>
        </select>
      </span>
    </p>
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
