<template>
  <card-modal :visible="visible" @close="close" :title="title" transition="zoom">
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">{{ '给' + name + '角色添加新权限' }}</h4>
          <div class="table-responsive">
            <table class="table is-bordered is-striped is-narrow">
              <thead>
                <tr>
                  <th>权限名</th>
                  <th>权限对应路由</th>
                  <th>权限操作</th>
                  <th>添加</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="permission in permissions">
                  <td>
                    {{ permission.name }}
                  </td>
                  <td>
                    {{ permission.url }}
                  </td>
                  <td>
                    {{ permission.method }}
                  </td>
                  <td>
                    <i class="fa fa-instagram" @click="addPermission(permission._id, character, permission)"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>
      </div>
    </div>
  </card-modal>
</template>

<script>
import { CardModal } from 'vue-bulma-modal'
import characterApi from '../../../api/character'

export default {
  components: {
    CardModal
  },
  props: {
    visible: Boolean,
    title: String,
    url: String,
    permissions: null,
    name: String,
    character: String
  },

  data () {
    return {
      src: require('assets/logo.svg')
    }
  },

  methods: {
    open (url) {
      window.open(url)
    },
    close () {
      this.$emit('close')
    },
    addPermission (permission, character, permissionDoc) {
      characterApi.addPermission({ permission, character })
      const index = this.permissions.indexOf(permissionDoc)
      this.permissions.splice(index, 1)
      this.$dispatch('child-change', this.permissions)
    }
  }
}
</script>

<style>
  footer.modal-card-foot {
    display: none;
  }
</style>
