<template>

  <v-content>

    <v-card
        height="400"
        width="256"
        class="mx-auto"
    >
        <v-navigation-drawer
            v-model="drawer"
            app
        >
        <v-list-item>
            <v-list-item-content>
            <v-list-item-title class="text-h6">
                Application
            </v-list-item-title>
            <v-list-item-subtitle>
                subtext
            </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list
            dense
            nav
        >
            <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            >
            <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
        </v-list>
        </v-navigation-drawer>
    </v-card>

  </v-content>
  
</template>

<script lang="ts">
import Vue from 'vue'

  export default Vue.extend({

    data: () => ({
        drawer: null,
        items: [
            { title: 'Dashboard', icon: 'mdi-view-dashboard' },
            { title: 'Photos', icon: 'mdi-image' },
            { title: 'About', icon: 'mdi-help-box' },
        ],
        right: null,
    }),
  })
</script>