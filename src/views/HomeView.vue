<template>
  <home-demo/>
</template>

<script lang="ts">
  import Vue from 'vue'
  import HomeDemo from '../components/HomeDemo.vue'

  export default Vue.extend({
    name: 'home_view',

    components: {
      HomeDemo,
    },
  })
</script>
