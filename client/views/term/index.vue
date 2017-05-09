<template>
  <div class="info">
    <input class="input is-primary" v-model="name" type="text" placeholder="学期名">
    <div style="padding:1rem;">
	    <button style="padding-right: 1rem;" class="button is-primary" @click="addTerm">创建</button>
	    <button class="button is-primary" @click="name = ''">取消</button>
    </div>
    <div>
      <p>已创建的学期任务</p>
      <p v-for="item in terms" :key="item._id">{{item.name}} 
        <span @click="deleteTerm(item._id)" style="padding-left: 2rem" class="icon is-small"><i class="fa fa-close"></i></span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	created () {
		this.setTerms()
		console.log('asd', this.terms)
	},
	computed: {
		...mapGetters({
			terms: 'getTerms'
		})
	},
	data () {
		return {
			name: ''
		}
	},
	methods: {
		...mapActions([
			'setTerms',
			'createTerm',
			'delTerm'
		]),
		async addTerm () {
			if (!this.name) {
				this.$magic.toast.show({
					type: 'warn',
					message: '学期名不能为空'
				})
				return
			}
			const res = await this.createTerm({name: this.name})
			this.$magic.toast.show(res)
			return
		},
		async deleteTerm (_id) {
			console.log('asd', _id)
			if (!_id) {
				this.$magic.toast.show({
					type: 'warn',
					message: '_id不能为空'
				})
				return
			}
			const res = await this.delTerm({_id})
			this.$magic.toast.show(res)
			return
		}
	}
}
</script>

<style lang="less" scoped>

</style>
