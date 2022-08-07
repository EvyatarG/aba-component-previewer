<template>
    <div>
        <header>
            <h1>Header</h1>
            <slot name="headerSlot"></slot>
        </header>
        <div>
            <h1>Body</h1>
            <slot name="bodySlot"></slot>
        </div>
        <footer>
            <h1>Footer</h1>
            <slot name="footerSlot" :childsDynamicProp="nfo"></slot>
        </footer>
    </div>
</template>


<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    data: () => ({
        nfo: {firstName: 'vSlot-child', lastName: 'Demo'},
    }),
});

</script>