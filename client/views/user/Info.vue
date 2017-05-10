<template>
  <div class="info">
    <p>用户名： {{user.name}}</p>
    <p>昵称： {{user.username}}</p>
    <p>所属实验室： {{user.lab.name}}</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	created () {
		this.setUser()
	},
	computed: {
		...mapGetters({
			user: 'getUser'
		})
	},
	methods: {
		...mapActions([
			'setUser'
		])
	}
}
</script>

<style lang="less" scoped>
.info {
	p {
		background: white;
		font-size: 1.4rem;
		padding: 1rem;
	}
}

</style>
