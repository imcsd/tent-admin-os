<template>
  <li class="nav-item has-treeview" :class="{'menu-open' : treeOpen}" @click="treeToggle()">
    <a href="javascript:;" :data-id="data.id" class="nav-link" :class="{'active' : data.id == menuConf.activeTree}">
      <i class="nav-icon fa" v-bind:class="'fa-' + data.icon"></i>
      <p>
        {{data.label}}
        <i class="fa fa-angle-left right"></i>
      </p>
    </a>
    <ul class="nav nav-treeview" v-if="data.children">
        <menu-item v-for="item in data.children" v-if="item.type == 'link'" :data="item" v-bind:key="item.id"></menu-item>
    </ul>
  </li>
</template>
<script>
import MenuItem from "@/components/framework/menu-tree/menu-item.vue";

export default {
  components: {
    "menu-item": MenuItem
  },
  name: 'treeview',
  componentName: 'treeview',
  props: {
    data: Object
  },
  methods: {
      treeToggle() {
        this.$store.commit('setActiveTree', this.data.id);
        this.$store.commit('toggleMenu', this.data.id);
      }
  },
  computed: {
    menuConf () {
        return this.$store.state.uiConfig.sidebar
    },
    treeOpen() {
        return this.$store.state.uiConfig.sidebar.openedTree.includes(this.data.id)
    }
  }
};
</script>
