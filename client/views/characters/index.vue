<template>
	<div>
	  <div class="tile is-ancestor">
	    <div class="tile is-parent is-10">
	      <article class="tile is-child box">
	        <h1 class="title">所有角色</h1>
	        <div class="block is-flex">
	          <collapse accordion is-fullwidth>
	            <collapse-item v-for="item in characters" :key="item._id" :title="item.name">
	              {{ item.name + '所有权限' }}
                <button class="button is-primary  modal-button" @click="openModalCard(item._id, item.name)">添加新权限</button>
	              <collapse>
	                <collapse-item v-for="permission in item.permission" :key="permission._id" :title="permission.name">
	                  {{ permission.resource + '资源' }}<br>
	                  {{ '对此资源的操作:' + permission.method }}<br>
	                  <button @click="rmPermission(permission._id, item._id, item.permission, permission)">删除此权限</button>
	                </collapse-item>
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
import Vue from 'vue'
import CardModal from '../components/modals/PermissionCardModal'
import { mapGetters, mapActions } from 'vuex'
// import characterModule from 'vuex-store/modules/character'
import { Collapse, Item as CollapseItem } from 'vue-bulma-collapse'
import characterApi from '../../api/character'

const CardModalComponent = Vue.extend(CardModal)

const openCardModal = (propsData = {
  visible: true
}) => {
  return new CardModalComponent({
    el: document.createElement('div'),
    propsData
  })
}

export default {
  created () {
    this.getAllCharacter()
  },
  computed: {
    ...mapGetters({
      characters: 'getAllCharacter',
      modalpermission: 'getNoAuthPermission'
    })
  },
  methods: {
    ...mapActions([
      'getAllCharacter'
    ]),
    getNoAuthPermission (id) {
      this.$store.dispatch('getNoAuthPermission', id)
    },
    openModalCard (id, name) {
      this.getNoAuthPermission(id)
      const that = this
      /* eslint-disable no-mixed-spaces-and-tabs */
      /* eslint-disable no-tabs */
      /* eslint-disable indent */
      setTimeout(function () {
	      const cardModal = (this.cardModal = openCardModal({
	        title: '添加新权限',
	        permissions: that.modalpermission,
          name,
          character: id,
          that
	      }))
        cardModal.$children[0].active()
      }, 100)
    },
    rmPermission (permission, character, pers, per) {
      const that = this
      characterApi.rmPermission({ permission, character })
                  .then(rs => {
                    that.getAllCharacter()
                    const index = pers.indexOf(per)
                    pers.splice(index, 1)
                  })
                  .catch(err => {
                    console.error(err)
                  })
    }
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
