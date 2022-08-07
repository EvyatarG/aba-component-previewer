<template>
    <!-- A container to allow some padding for the the v-app-bar -->
    <div :style="`margin: 0; padding: 0; height: ${required_frame_height}px; background-color: ${ component_color };`">
      <v-app-bar
        flat
        dark
        dense
        :color="component_color"
        :height="`${required_frame_height - 4}px`"
        style="padding-top: 2px; padding-bottom: 2px;"
      >
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        
        <v-divider inset vertical />
        
        <v-icon right> mdi-shape </v-icon>
        <v-toolbar-title
          class="text-caption font-weight-medium"
          style="min-width: 72px;"
        >
          Paragone.ai
        </v-toolbar-title>
        <!-- <v-list-item-subtitle> subtext </v-list-item-subtitle> -->
          
        <template>
          <v-tabs
            v-model="currentTab"
          >
            <v-tabs-slider slider-size="42" syle="min-height: 10px;" color="#45D8B5"></v-tabs-slider>

            <v-tab
              v-for="tabItem in tabItems"
              :key="tabItem"
              class="text-capitalize white--text"
              style="font-size: 0.6em;"
            >
              <v-icon style="padding-right: 2px" small>
                {{ tabItem.icon_mdi_str }}
              </v-icon >
              {{ tabItem.label }}
            </v-tab>
          </v-tabs>
        </template>

        <v-spacer /> 
        <!-- <v-toolbar-title>Campaign Request List</v-toolbar-title> -->
        <v-icon right size="20">mdi-briefcase-variant</v-icon>
        <v-icon right size="20">mdi-help-circle-outline</v-icon>
        <v-icon right size="20">mdi-beta</v-icon>
        <v-icon right size="20">mdi-magnify</v-icon>
        <v-icon right size="20">mdi-bell-outline</v-icon>
        <v-icon right size="20">mdi-account-cog</v-icon>
      </v-app-bar>
    </div>
    
</template>



<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'NavBarPane',

        props: {
            required_frame_height: { 
                default: 48,
            },
            component_color: {
                type: String,
                default: "#5862ff",
            },
        },

        data: () => ({
            tabItems: [
            { label: 'ABA', icon_mdi_str: 'mdi-account-filter-outline'}, 
            {label: 'Reporting', icon_mdi_str: 'mdi-finance'}
            ],
            
            currentTab: null,
            right: null,

            // mainColor: "#5862ff",
            drawer: true,
        }),

    });

</script>
