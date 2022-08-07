<template>
  <v-slot-demo/>
</template>

<script lang="ts">
  import Vue from 'vue'
  import vSlotDemo from '../components/VSlotDemo.vue'

  export default Vue.extend({
    name: 'VSlotDemo',

    components: {
      'v-slot-demo': vSlotDemo,
    },
  })
</script>