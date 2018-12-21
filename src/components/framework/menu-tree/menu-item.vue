<template>
    <li class="nav-item" @click.stop="clickLink()">
      <a class="nav-link" href="javascript:;" :class="{'active' : data.id == menuConf.avtiveLink}">
        <i class="nav-icon fa" v-bind:class="'fa-' + data.icon"></i>
        <p>
          {{data.label}}
        </p>
      </a>
    </li>
</template>
<script>
export default {
  name: 'menu-item',
  componentName: 'menu-item',
  data() {
    return {
      isOnComposition: false
    };
  },
  props: {
    data: Object
  },
  methods: {
      clickLink() {
          this.$store.commit('setAvtiveLink', this.data.id);
          this.$router.push({
            path: this.data.path
          })
      }
  },
  computed: {
    menuConf () {
        return this.$store.state.uiConfig.sidebar
    }
  }
};
</script>
