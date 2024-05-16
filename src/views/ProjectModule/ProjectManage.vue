<template>
  <div>
    <div class="mainContent">
      <b-card
        class="mb-3"
        :class="backgroundColor == 'dark' ? 'bg-secondary' : 'bg-light'"
      >
        <b-row class="mb-3">
          <!-- project -->
          <b-col lg="6">
            <b-row>
              <b-col xl="4" lg="5" md="3" class="col-3 titleCSS">
                <label class="fontCSS">專案： </label>
              </b-col>
              <b-col class="">
                <SearchSelect
                  placeholder="請輸入關鍵字"
                  :searchinput.sync="projectSelect.keyWords"
                  :allchoose="projectSelect.allList"
                />
              </b-col>
            </b-row>
          </b-col>
          <!-- button -->
          <b-col class="col-12">
            <b-button class="mr-2" @click="searchAction(1)" variant="primary"
              >查詢</b-button
            >
            <b-button @click="createModal()" variant="outline-primary"
              >新增</b-button
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
      :title="modalData.modalType == 'create' ? '新增專案' : '修改專案'"
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
      <div
        :class="backgroundColor == 'dark' ? 'modalTypeDark' : 'modalTypeLight'"
      >
        <b-row class="align-items-center">
          <b-col class="col-12">
            <b-row>
              <b-col lg="2" class="modalTitleCSS col-3">
                <label style="font-size: 20px" :for="$route.name + '4'">
                  專案：
                </label>
              </b-col>
              <b-col>
                <b-form-input
                  :id="$route.name + '4'"
                  :name="$route.name + '4'"
                  placeholder="請輸入專案名稱"
                  v-model="modalData.projectName"
                  type="text"
                  :class="
                    backgroundColor == 'dark' ? 'text-light bg-secondary' : ''
                  "
                  trim
                />
              </b-col>
            </b-row>
          </b-col>
          <b-col class="col-12">
            <b-row>
              <b-col lg="2" class="modalTitleCSS col-3">
                <label style="font-size: 20px" :for="$route.name + '4'">
                  備註：
                </label>
              </b-col>
              <b-col>
                <b-form-textarea
                  :id="$route.name + '4'"
                  :name="$route.name + '4'"
                  v-model="modalData.memo"
                  placeholder="請輸入備註"
                  rows="6"
                  max-rows="10"
                  :class="
                    backgroundColor == 'dark' ? 'text-light bg-secondary' : ''
                  "
                ></b-form-textarea>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>

      <template #modal-footer="{ cancel }">
        <b-row>
          <b-button @click="saveNewCompany()" class="mr-2" variant="primary"
            >確定</b-button
          >
          <b-button variant="outline-secondary" @click="cancel">
            返回
          </b-button>
        </b-row>
      </template>
    </b-modal>
  </div>
</template>
<script>
import { mapState } from "vuex";
// import { Toast } from "./../../utils/helper";
import BaseTable from "./../../components/BaseTable";
import SearchSelect from "./../../components/SearchSelect";
export default {
  components: {
    BaseTable,
    SearchSelect,
  },
  data() {
    return {
      projectSelect: {
        keyWords: "",
        allList: [],
        isabled: true,
      },
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
          { key: "COL1", label: "專案ID" },
          { key: "COL2", label: "專案名稱" },
          { key: "COL3", label: "備註" },
        ],
        items: [],
      },
      //modal
      modalData: {
        modalType: "create",
        editID: null,
        projectName: "",
        memo: "",
      },

      ///test///
      APIproject: [
        {
          id: 1,
          name: "專案Ｂ",
          memo: "專案Ｂ專案Ｂ",
        },
        {
          id: 2,
          name: "專案Ａ",
          memo: "專案Ａ專案Ａ",
        },
        {
          id: 3,
          name: "專案1",
          memo: "專案1專案1",
        },
        {
          id: 4,
          name: "專案2",
          memo: "專案2專案2",
        },
        {
          id: 5,
          name: "專案3",
          memo: "專案3專案3",
        },
        {
          id: 6,
          name: "專案4",
          memo: "專案4專案4",
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
      let APIproject = [...this.APIproject];

      let filterData = [];

      if (this.projectSelect.keyWords) {
        filterData = APIproject.filter(
          (item) => item.name == this.projectSelect.keyWords
        );
      } else {
        filterData = APIproject;
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
          COL3: data.memo,
        });
      }
      this.table.items = array;
    },
    createModal() {
      this.modalData.modalType = "create";
      this.modalData.projectName = "";
      this.modalData.memo = "";
      this.$bvModal.show(this.$route.name);
    },
    editModal(field, rowIndex) {
      console.log("editModalfield", field);

      this.modalData.modalType = "edit";
      this.modalData.projectName = "";
      this.modalData.memo = "";

      let projectID = this.table.items[rowIndex].COL1;
      this.modalData.editID = projectID;
      let object = this.APIproject.find((item) => item.id == projectID);
      this.modalData.projectName = object.name;
      this.modalData.memo = object.memo;

      this.$bvModal.show(this.$route.name);
    },
    saveNewCompany() {
      console.log("this.modalData", this.modalData);
      return;

      // if (!this.modalData.companyName) {
      //   Toast.fire({
      //     icon: "warning",
      //     title: "please enter the new company name.",
      //   });
      //   return;
      // }
      // if (this.modalData.modalType == "create") {
      //   console.log("create");
      //   let lastid = this.APIdata[this.APIdata.length - 1].id;
      //   this.APIdata.push({
      //     id: Number(lastid) + 1,
      //     name: this.modalData.companyName,
      //   });

      //   let lastPage = Math.ceil(this.APIdata.length / this.table.perPage);
      //   console.log("lastPage", lastPage);
      //   this.companyName = "";
      //   this.searchAction(lastPage);
      // } else {
      //   this.APIdata.filter(
      //     (item) => item.id == this.modalData.editID
      //   )[0].name = this.modalData.companyName;
      //   this.searchAction();
      // }
      // this.$bvModal.hide(this.$route.name);
    },
    deleteCompany(field, rowIndex) {
      console.log(field, rowIndex);
      return;
      // console.log("deleteCompanyfield", field);
      // let ID = this.table.items[rowIndex].COL1;
      // this.APIdata = this.APIdata.filter((item) => item.id !== ID);
      // this.searchAction(1);
    },
    clickPage(page) {
      this.table.currentPage = page;
      this.searchAction();
    },
  },
  watch: {},
  computed: {
    ...mapState(["backgroundColor"]),
  },
  created() {
    let projectList = [];
    for (var index in this.APIproject) {
      projectList.push({
        value: this.APIproject[index].id,
        text: this.APIproject[index].name,
      });
    }
    this.projectSelect.allList = [...projectList];
    this.searchAction();
  },
};
</script>
<style scoped>
</style>