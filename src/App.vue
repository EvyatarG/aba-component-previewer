<template>
  <v-app id="inspire" style="background-color: #cfd8dc">
    <v-main
      class="mx-0"
      :style="`width: 100%; max-height: ${nav_bar_max_height}px; position: fixed;  z-index: 999`"
    >
      <nav-bar-pane
        :required_frame_height="nav_bar_max_height"
        :component_color="mainColor"
      />
    </v-main>

    <v-navigation-drawer
      v-model="drawer"
      dark
      app
      permanent="false"
      style="
        border-style: hidden groove hidden hidden;
        border-width: 1px;
        border-color: grey;
      "
    >
      <v-container
        fluid
        :style="`padding: 0px; overflow: hidden; height: 38px; background-color: ${mainColor};`"
      >
        <v-list-item-title
          class="text-h6"
          style="
            color: white;
            padding-left: 8px;
            height: inherit;
            display: table-cell;
            vertical-align: middle;
          "
        >
          Component Previewer
        </v-list-item-title>
      </v-container>

      <v-divider />

      <v-list dense nav>
        <v-list-item
          v-for="item in ctrl_menu_items"
          :key="item.title"
          router
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider class="mx-0"></v-divider>

      <v-btn @click="push_route_params_to_dashboard" block elevation="5">
        Push route params
      </v-btn>
    </v-navigation-drawer>

    <!-- margin and paddings spacing class format: {property}{direction}-{size} -- https://vuetifyjs.com/en/styles/spacing/#how-it-works -->
    <v-main
      class="mx-4 mb-4"
      :style="`padding-top: ${nav_bar_max_height + 4}px;`"
    >
      <div style="background-color: white">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import NavBarPane from "./components/NavBarPane.vue";

export default Vue.extend({
  name: "App",

  methods: {
    push_route_params_to_dashboard() {
      const path = "/dashboard"; // `/dashboard/${id}`
      if (this.$route.path !== path) {
        console.log("pushing");
        this.$router.push({ name: "dashboard", params: { id: "Dashboard" } }); //this.$router.push(path)
      }
    },
  },

  data: () => ({
    nav_bar_max_height: 38,
    mainColor: "#5862ff",
    drawer: true,

    ctrl_menu_items: [
      // Icons from: https://materialdesignicons.com/
      { title: "Dashboard", icon: "mdi-view-dashboard", route: "/" },
      { title: "Home", icon: "mdi-home", route: "/home" },
      {
        title: "User Settings",
        icon: "mdi-account-cog",
        route: "/usersettings",
      },
      { title: "V-Slot Demo", icon: "mdi-file-code", route: "/vslotdemo" },
      { title: "Nav Bar Pane", icon: "mdi-file-code", route: "/navbarpane" },
    ],
  }),

  components: {
    NavBarPane,
  },
});
</script>
