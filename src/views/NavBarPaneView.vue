<template>
  <nav-bar-pane />
</template>

<script lang="ts">
  import Vue from 'vue'
  import NavBarPane from '../components/NavBarPane.vue'

  export default Vue.extend({
    name: 'NavBarPane_view',

    components: {
      NavBarPane,
    },
  })
</script>
