import Vue from 'vue'

//   type new_type_test = (boolean | string)
//   const test_it: new_type_test = 'aba'

enum pcrLabels {
  Campaign_name = 'Campaign Name',
  Type = 'Type',
  Status = 'Status',
  Channel = 'Channel',
  Audience_status = 'Audience Status',
  SDR = 'SDR',
  Created = 'Created',
  Action_options = 'Actions'
} 
enum campaignTypes {
  warmup = 'Warmup',
  similar_leads = 'Similar Leads',
}
enum campaignStatuses {
  draft = 'Draft',
  launched = 'Launched',
  stopped = 'Stopped',
}
enum col_struct {
  col = 12,
  sm = 6,
  md = 4,
}

interface pcr {
    name: string;
    type: campaignTypes;
    status: campaignStatuses;
    channel: string;
    audience_status: number;
    sdr: string;
    created_date: string;
    isLaunched: boolean;
}
let campaignNameNumerator = 0
function initData(options?: Partial<pcr>): pcr {
  const defaultName = `campaign_${campaignNameNumerator}`
  const defaults: pcr = {
    name: defaultName,
    type: campaignTypes.warmup,
    status: campaignStatuses.draft,
    channel: 'linkedin',
    audience_status: 0,
    sdr: '0%',
    created_date: '1.1.11',
    isLaunched: false,
  };
  if (!options?.name) { campaignNameNumerator+=1 }

  return {
    ...defaults,
    ...options,
  };
}

const muckData: pcr[] = [
  initData ({
    name: 'Frozen Yogurt',
    type: campaignTypes.similar_leads,
    // channel: 'linkedin',
    audience_status: 4.0,
    sdr: '1%',
    // created_date: '20.7.22',
  }),
  initData ({
    name: 'Eclair',
    type: campaignTypes.warmup,
    audience_status: 6.0,
    sdr: '7%',
    created_date: '20.7.22',
  }),
  initData ({
    name: 'Cupcake',
    type: campaignTypes.warmup,
    audience_status: 4.3,
    sdr: '8%',
    created_date: '20.7.22',
  }),
  initData ({
    name: 'Gingerbread',
    type: campaignTypes.warmup,
    audience_status: 3.9,
    sdr: '16%',
    created_date: '20.7.22',
  }),
  initData ({
    name: 'Jelly bean',
    type: campaignTypes.warmup,
    audience_status: 0.0,
    sdr: '0%',
    created_date: '20.7.22',
  }),
  initData ({
    name: 'Lollipop',
    type: campaignTypes.warmup,
    audience_status: 0,
    sdr: '2%',
    created_date: '20.7.22',
  }),
  initData ({
    name: 'Honeycomb',
    type: campaignTypes.warmup,
    audience_status: 6.5,
    sdr: '45%',
    created_date: '20.7.22',
  }),
  initData ({
    name: 'Donut',
    type: campaignTypes.similar_leads,
    audience_status: 4.9,
    sdr: '22%',
    created_date: '20.7.22',
  }),
  initData ({
    name: 'KitKat',
    type: campaignTypes.warmup,
    audience_status: 7,
    sdr: '6%',
    created_date: '20.7.22',
  }),
]

export default Vue.extend({
  name: 'DashBoard',

  created () {
    this.initialize()
  },

  computed: {
    getFormTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog (value) {
      value || this.close()
    },
    dialogDelete (value) {
      value || this.closeDelete()
    },
    dialogLaunchCampaign (value) {
      value || this.closeLaunchCampaign()
    },
  },

  methods: {
    initialize () {
      this.campaignData = muckData
    },

    getColor (value: campaignTypes) {
      switch (value) {
        case campaignTypes.warmup:
          return 'green'
          break
        case campaignTypes.similar_leads:
          return 'purple'
          break
        default:
          return 'grey'
      }
    },

    editItem (item: pcr) {
      this.editedIndex = this.campaignData.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogEdit = true
    },
    launchCampaign (item: pcr) {
      this.editedIndex = this.campaignData.indexOf(item)
      this.editedItem = this.campaignData[this.editedIndex]
      this.dialogLaunchCampaign = true
    },
    launchCampaignConfirm () {
      // this.campaignData.splice(this.editedIndex, 1)
      if (this.editedIndex > -1) {
        const isl = this.editedItem.isLaunched
        this.editedItem.isLaunched = !isl
        this.editedItem.status = (isl ? campaignStatuses.stopped : campaignStatuses.launched)
      }
      this.closeLaunchCampaign()
    },
    deleteItem (item: pcr) {
      this.editedIndex = this.campaignData.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm () {
      this.campaignData.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    close () {
      this.dialogEdit = false
      this.resetEditState()
    },
    closeDelete () {
      this.resetEditState()
      this.dialogDelete = false
    },
    closeLaunchCampaign () {
      this.dialogLaunchCampaign = false
      this.resetEditState()
    },
    resetEditState () {
      this.$nextTick(() => {
        this.editedIndex = -1
        this.editedItem = Object.assign({}, this.defaultItem)
      })
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.campaignData[this.editedIndex], this.editedItem)
      } else {
        this.campaignData.push(this.editedItem)
      }
      this.close()
    },
  },

  data: () => ({
    // Pass local Enums:
    pcrLabels, col_struct, campaignTypes, campaignStatuses,

    searchValue: '',

    dialogEdit: false, dialogDelete: false, dialogLaunchCampaign: false,

    headers: [
      { text: pcrLabels.Campaign_name, value: 'name', sortable: true, align: 'start' }, // , filterable: false}
      { text: pcrLabels.Type, value: 'type' },
      { text: pcrLabels.Status, value: 'status' },
      { text: pcrLabels.Channel, value: 'channel' },
      { text: pcrLabels.Audience_status, value: 'audience_status' },
      { text: pcrLabels.SDR, value: 'sdr' },
      { text: pcrLabels.Created, value: 'created_date' },
      { text: pcrLabels.Action_options, value: 'actions', sortable: false },
    ],
    campaignData: [] as pcr[],
    editedIndex: -1,

    editedItem: initData () as pcr,
    defaultItem: initData () as pcr,
  }),
  
})