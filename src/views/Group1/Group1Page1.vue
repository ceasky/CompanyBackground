<template>
  <div>
    <div class="mainContent">
      <b-card
        class="mb-3"
        :class="backgroundColor == 'dark' ? 'bg-secondary' : 'bg-light'"
      >
        <b-row class="mb-3">
          <!-- input sample -->
          <b-col md="6">
            <b-row>
              <b-col xl="3" md="4" class="col-2 titleCSS">
                <label class="fontCSS" :for="$route.name + '1'"
                  >Company：
                </label>
              </b-col>
              <b-col>
                <b-form-input
                  :id="$route.name + '1'"
                  :name="$route.name + '1'"
                  placeholder="Enter the keywords"
                  v-model="companyName"
                  :class="
                    backgroundColor == 'dark' ? 'text-light bg-secondary' : ''
                  "
                  trim
                />
              </b-col>
            </b-row>
          </b-col>
          <b-col class="col-12">
            <b-button class="mr-2" @click="searchAction(1)" variant="primary"
              >search</b-button
            >
            <b-button @click="createModal()" variant="outline-primary"
              >Create company</b-button
            >
          </b-col>
        </b-row>
      </b-card>

      <BaseTable
        v-show="table.items.length !== 0"
        :fields="table.fields"
        :items="table.items"
        :currentPage="table.currentPage"
        :totalItems="table.totalItems"
        :perPage="table.perPage"
        :editAction="editModal"
        :deleteAction="deleteCompany"
        :clickPage="clickPage"
      />
    </div>
    <!-- modal -->
    <b-modal
      :id="$route.name"
      :title="
        modalData.modalType == 'create' ? 'Create company' : 'Edit company'
      "
      hide-header-close
      :headerBgVariant="backgroundColor"
      :headerTextVariant="backgroundColor == 'dark' ? 'light' : 'dark'"
      :bodyBgVariant="backgroundColor"
      :bodyTextVariant="backgroundColor == 'dark' ? 'light' : 'dark'"
      :footerBgVariant="backgroundColor"
      :footerTextVariant="backgroundColor == 'dark' ? 'light' : 'dark'"
      centered
      size="lg"
    >
      <div>
        <b-row class="align-items-center">
          <b-col lg="2" class="modalTitleCSS col-3">
            <label style="font-size: 20px" :for="$route.name + '4'">
              Company：
            </label>
          </b-col>
          <b-col>
            <b-form-input
              :id="$route.name + '4'"
              :name="$route.name + '4'"
              placeholder="Enter the new company name"
              v-model="modalData.companyName"
              type="text"
              :class="
                backgroundColor == 'dark' ? 'text-light bg-secondary' : ''
              "
              trim
            />
          </b-col>
        </b-row>
      </div>

      <template #modal-footer="{ cancel }">
        <b-row>
          <b-button @click="saveNewCompany()" class="mr-2" variant="primary"
            >confirm</b-button
          >
          <b-button variant="outline-secondary" @click="cancel">
            return
          </b-button>
        </b-row>
      </template>
    </b-modal>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { Toast } from './../../utils/helper'
import BaseTable from "./../../components/BaseTable";
export default {
  components: {
    BaseTable,
  },
  data() {
    return {
      companyName: "",
      // table
      searchData: null,
      table: {
        currentPage: 1,
        perPage: 5,
        totalItems: 0,
        fields: [
          {
            key: "COL0",
            label: "",
            type: "default_btn",
          },
          { key: "COL1", label: "Company_ID" },
          { key: "COL2", label: "Company_Name" },
        ],
        items: [],
      },
      //modal
      modalData: {
        modalType: "create",
        companyName: "",
        editID: null,
      },

      ///test///
      APIdata: [
        {
          id: "1",
          name: "company1",
        },
        {
          id: "2",
          name: "company2",
        },
        {
          id: "3",
          name: "company3",
        },
        {
          id: "4",
          name: "company4",
        },
        {
          id: "5",
          name: "company5",
        },
        {
          id: "6",
          name: "company6",
        },
        {
          id: "7",
          name: "company7",
        },
        {
          id: "8",
          name: "company8",
        },
        {
          id: "9",
          name: "company9",
        },
        {
          id: "10",
          name: "company10",
        },
        {
          id: "11",
          name: "company11",
        },
        {
          id: "12",
          name: "company12",
        },
        {
          id: "13",
          name: "company13",
        },
        {
          id: "14",
          name: "company14",
        },
        {
          id: "15",
          name: "company15",
        },
        {
          id: "16",
          name: "company16",
        },
        {
          id: "17",
          name: "company17",
        },
        {
          id: "18",
          name: "company18",
        },
        {
          id: "19",
          name: "company19",
        },
        {
          id: "20",
          name: "company20",
        },
        {
          id: "21",
          name: "company21",
        },
        {
          id: "22",
          name: "company22",
        },
        {
          id: "23",
          name: "company23",
        },
      ],
    };
  },
  methods: {
    searchAction(page) {
      if (page) {
        this.table.currentPage = page;
      }

      //call api get data

      let APIdata = [...this.APIdata];

      let filterData = [];
      if (this.companyName !== "") {
        filterData = APIdata.filter((item) =>
          item.name.includes(this.companyName)
        );
      } else {
        filterData = APIdata;
      }

      this.table.totalItems = filterData.length;
      let array = filterData.slice(
        (this.table.currentPage - 1) * this.table.perPage,
        this.table.currentPage * this.table.perPage
      );

      this.searchData = array;
      this.setSearchData();
    },
    setSearchData() {
      this.table.items.splice(0);
      let array = [];
      for (var index in this.searchData) {
        let data = this.searchData[index];
        array.push({
          COL0: "edit,delete",
          COL1: data.id,
          COL2: data.name,
        });
      }
      this.table.items = array;
    },

    createModal() {
      this.modalData.modalType = "create";
      this.modalData.companyName = "";
      this.$bvModal.show(this.$route.name);
    },
    editModal(field, rowIndex) {
      console.log("editModalfield", field);

      this.modalData.modalType = "edit";
      this.modalData.companyName = "";
      this.modalData.editID = this.table.items[rowIndex].COL1;
      this.$bvModal.show(this.$route.name);
    },
    saveNewCompany() {
      if (!this.modalData.companyName) {
        Toast.fire({
          icon: 'warning',
          title: 'please enter the new company name.'
        })
        return;
      }
      if (this.modalData.modalType == "create") {
        console.log("create");
        let lastid = this.APIdata[this.APIdata.length - 1].id;
        this.APIdata.push({
          id: Number(lastid) + 1,
          name: this.modalData.companyName,
        });

        let lastPage = Math.ceil(this.APIdata.length / this.table.perPage);
        console.log("lastPage", lastPage);
        this.companyName = "";
        this.searchAction(lastPage);
      } else {
        this.APIdata.filter(
          (item) => item.id == this.modalData.editID
        )[0].name = this.modalData.companyName;
        this.searchAction();
      }
      this.$bvModal.hide(this.$route.name);
    },
    deleteCompany(field, rowIndex) {
      console.log("deleteCompanyfield", field);
      let ID = this.table.items[rowIndex].COL1;
      this.APIdata = this.APIdata.filter(item=>item.id !== ID)
      this.searchAction(1);
    },
    clickPage(page) {
      this.table.currentPage = page;
      this.searchAction();
    },
  },
  computed: {
    ...mapState(["backgroundColor"]),
  },
  created() {},
};
</script>
<style scoped>
</style>