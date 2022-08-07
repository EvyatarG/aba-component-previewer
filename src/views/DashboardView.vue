<template>
  <dash-board />
</template>

<script lang="ts">
  import Vue from 'vue'
  import DashBoard from '../components/DashBoard.vue'

  export default Vue.extend({
    name: 'dashBoard_view',

    components: {
      DashBoard,
    },
  })
</script>
