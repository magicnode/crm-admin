<template>
  <div class="info">
    <p>用户名： {{user.name}}</p>
    <p>昵称： {{user.username}}</p>
    <p>所属院系： {{user.lab.name}}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	created () {
		console.log('sad', this.user)
	},
	computed: {
		...mapGetters({
			user: 'getUser'
		})
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
