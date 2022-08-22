<template>
  <div class="dashboard">
    <h1 class="subheading blue--text ml-3">{{ this.sdr_route_data }}</h1>

    <!-- height="600px" -->
    <v-data-table
      :headers="headers"
      :items="campaignData"
      :search="searchValue"
      :items-per-page="-1"
      sort-by="type"
      fixed-header
      class="elevation-4"
    >
      <!-- below the [..] dynamically creates such prop inside the component and extracting 'item' from this (v-data-table) child -->
      <template v-slot:[`item.type`]="{ item }">
        <v-chip :color="getColor(item.type)" dark small>
          {{ item.type }}
        </v-chip>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <!-- <v-toolbar-title>Overview</v-toolbar-title> -->
          <v-dialog v-model="dialogEdit" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Campagin
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="text-h5">{{ getFormTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="col_struct.col"
                      sm="col_struct.sm"
                      md="col_struct.md"
                    >
                      <v-text-field
                        v-model="editedItem.name"
                        :label="pcrLabels.Campaign_name"
                      ></v-text-field>
                      <v-container class="mx-0 px-0" v-if="editedIndex === -1">
                        <v-select
                          v-model="editedItem.type"
                          :label="pcrLabels.Type"
                          :items="Object.values(campaignTypes)"
                          :menu-props="{ top: false, offsetY: true }"
                          filled
                          dense
                        ></v-select>
                        <v-select
                          v-model="editedItem.status"
                          :label="pcrLabels.Status"
                          :items="Object.values(campaignStatuses)"
                          :menu-props="{ top: false, offsetY: true }"
                          filled
                          dense
                        ></v-select>
                        <v-text-field
                          readonly
                          disabled
                          v-model="editedItem.channel"
                          :label="pcrLabels.Channel"
                        ></v-text-field>
                      </v-container>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-divider class="mx-4" inset vertical />
          <v-spacer></v-spacer>

          <v-text-field
            v-model="searchValue"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            outlined
            dense
            style="max-width: 300px"
          ></v-text-field>

          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title
                class="text-h5"
                style="text-align: center; word-break: break-word"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="red darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog
            v-model="dialogLaunchCampaign"
            max-width="300px"
            class="text-h5"
          >
            <v-card>
              <v-card-title style="word-break: break-word; text-align: center">
                {{
                  (editedItem.isLaunched ? "Stop" : "Launch") +
                  " this campagin?"
                }}
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeLaunchCampaign"
                  >Cancel</v-btn
                >
                <v-btn
                  color="green darken-1"
                  text
                  @click="launchCampaignConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon class="mr-2" small @click="launchCampaign(item)">
          {{ "mdi-play-circle" + (item.isLaunched ? "" : "-outline") }}
        </v-icon>
        <v-icon class="mr-2" small @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>

    <!-- <v-container class="ma-0">
      <v-layout row wrap>
        <v-flex md12 >
        </v-flex>
      </v-layout>
    </v-container> -->
  </div>
</template>


<script lang="ts" src="./DashBoard.ts"></script>