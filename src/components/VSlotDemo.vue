<template>
    <div>
        {{ hello }}
        <child-component>
            <template v-slot:headerSlot >This is a simple {{ hello }} in the header (slot)</template>
            <template v-slot:[getItFromData] >This is inserted to body (slot)</template>
            <template v-slot:footerSlot="{ childsDynamicProp }" >This {{ childsDynamicProp.firstName }} is a scoped prop in the footer (slot)</template>
        </child-component>
    </div>
</template>


<script lang="ts">
import Vue from 'vue'

import ChildComponent from './VSlotDemoChild.vue'

export default Vue.extend({
    components: { 
        'child-component': ChildComponent,
    },
    data: () => ({
        hello: 'V-Slot demo',
        getItFromData: 'bodySlot'
    }),
});

// const ChildComponent = {
//     data: () => ({
//         name: {firstName: 'Ev', lastName: 'Gal'},
//     }),
//     template: `
            // <div>
            //     {{ hello }}
            //     <child-component>
            //         <template v-slot:headerSlot >This is a simple {{ hello }} in the header (slot)</template>
            //         <template v-slot:[getItFromData] >This is inserted to body (slot)</template>
            //         <template v-slot:footerSlot="{ childsDynamicProp }" >This {{childsDynamicProp.firstName}} is a scoped prop in the footer (slot)</template>
            //     </child-component>
            // </div>
//     `
// }
</script>