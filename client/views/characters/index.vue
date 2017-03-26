<template>
	<div>
	  <div class="tile is-ancestor">
	    <div class="tile is-parent is-10">
	      <article class="tile is-child box">
	        <h1 class="title">所有角色</h1>
	        <div class="block is-flex">
	          <collapse accordion is-fullwidth>
	            <collapse-item v-for="item in characters" :title="item.name">
	              {{ item._id }}
	            </collapse-item>
	            <collapse-item title="Nests" selected>
	              <collapse>
	                <collapse-item title="Nest Child" selected>
	                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. @bulmaio. #css #responsive
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
import { mapGetters, mapActions } from 'vuex'
import { Collapse, Item as CollapseItem } from 'vue-bulma-collapse'

export default {
  created () {
    this.getAllCharacter()
  },
  computed: {
    ...mapGetters({
      characters: 'getAllCharacter'
    })
  },
  methods: {
    ...mapActions([
      'getAllCharacter'
    ])
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
