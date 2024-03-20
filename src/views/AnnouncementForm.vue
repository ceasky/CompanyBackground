<template>
  <div>
    <div class="mainContent">
      <b-card
        class="mb-3"
        :class="backgroundColor == 'dark' ? 'bg-secondary' : 'bg-light'"
      >
        <b-row class="mb-3">
          <!-- User -->
          <b-col lg="6">
            <b-row>
              <b-col xl="4" lg="5" md="3" class="col-3 titleCSS">
                <label class="fontCSS" :for="$route.name + '1'"
                  >關鍵字查詢：
                </label>
              </b-col>
              <b-col class="">
                <b-form-input
                  :id="$route.name + '1'"
                  :name="$route.name + '1'"
                  placeholder="請輸入關鍵字"
                  v-model="keyword"
                  type="text"
                  :class="
                    backgroundColor == 'dark' ? 'text-light bg-secondary' : ''
                  "
                  trim
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
              >新增公告</b-button
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
        :icon_btnFunction="downloadFile"
        :clickPage="clickPage"
      />
    </div>
    <!-- modal -->
    <b-modal
      :id="$route.name"
      :title="modalData.modalType == 'create' ? '新增公告' : '修改公告'"
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
                <label style="font-size: 20px" :for="$route.name + 'modal1'">
                  公告名稱：
                </label>
              </b-col>
              <b-col>
                <b-form-input
                  :id="$route.name + 'modal1'"
                  :name="$route.name + 'modal1'"
                  placeholder="請輸入公告名稱"
                  v-model="modalData.title"
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
                <label style="font-size: 20px" :for="$route.name + 'modal2'">
                  公告日期：
                </label>
              </b-col>
              <b-col>
                <DateField :value.sync="modalData.date" />
              </b-col>
            </b-row>
          </b-col>
          <b-col class="col-12">
            <b-row>
              <b-col lg="2" class="modalTitleCSS col-3">
                <label style="font-size: 20px" :for="$route.name + 'modal3'">
                  公告內容：
                </label>
              </b-col>
              <b-col>
                <b-form-textarea
                  :id="$route.name + 'modal3'"
                  :name="$route.name + 'modal3'"
                  v-model="modalData.content"
                  placeholder="請輸入公告內容"
                  rows="6"
                  max-rows="10"
                  :class="
                    backgroundColor == 'dark' ? 'text-light bg-secondary' : ''
                  "
                ></b-form-textarea>
              </b-col>
            </b-row>
          </b-col>
          <b-col class="col-12">
            <b-row>
              <b-col lg="2" class="modalTitleCSS col-3">
                <label style="font-size: 20px" :for="$route.name + 'modal4'">
                  公告檔案：
                </label>
              </b-col>
              <b-col>
                <b-form-file
                  v-model="modalData.file"
                  placeholder="請選擇檔案"
                  drop-placeholder="Drop file here..."
                  class="bg-secondary"
                ></b-form-file>
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
import { Toast } from "./../utils/helper";
import BaseTable from "./../components/BaseTable";
// import SearchSelect from "./../components/SearchSelect";
import DateField from "./../components/DateField";
export default {
  components: {
    BaseTable,
    // SearchSelect,
    DateField,
  },
  data() {
    return {
      keyword: "",
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
          { key: "COL1", label: "公告名稱" },
          // { key: "COL2", label: "公告內容" },
          { key: "COL3", label: "公告日期" },
          { key: "COL4", label: "公告檔案", type: "icon_btn" },
        ],
        items: [],
      },
      //modal
      modalData: {
        modalType: "create",
        editID: null,

        title: "",
        date: "2024-01-01",
        file: null,
        content: "",
      },

      ///test///

      APIcourseList: [
        {
          id: "1",
          title: "announcement1",
          date: "2024-01-01",
          content: "announcement1announcement1",
          file: "",
        },
        {
          id: "2",
          title: "announcement2",
          date: "2024-01-01",
          content: "announcement2announcement2",
          file: "",
        },
        {
          id: "3",
          title: "announcement3",
          date: "2024-01-01",
          content: "announcement3announcement3",
          file: "",
        },
        {
          id: "4",
          title: "announcement4",
          date: "2024-01-01",
          content: "announcement4announcement4",
          file: "",
        },
        {
          id: "5",
          title: "announcement5",
          date: "2024-01-01",
          content: "announcement5announcement5",
          file: "",
        },
        {
          id: "6",
          title: "announcement6",
          date: "2024-01-01",
          content: "announcement6announcement6",
          file: "",
        },
        {
          id: "7",
          title: "announcement7",
          date: "2024-01-01",
          content: "announcement7announcement7",
          file: "",
        },
        {
          id: "8",
          title: "announcement8",
          date: "2024-01-01",
          content: "announcement8announcement8",
          file: "",
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

      let APIcourseList = [...this.APIcourseList];

      let filterData = [];
      filterData = APIcourseList;

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
          COL1: data.title,
          // COL2: data.content,
          COL3: data.date,
          COL4: [
            { icon: "file-earmark-arrow-down", variant: "outline-success" },
          ],
        });
      }
      this.table.items = array;
    },

    createModal() {
      this.modalData.modalType = "create";
      this.modalData.title = "";
      this.modalData.date = "";
      this.modalData.file = null;
      this.modalData.content = "";
      this.$bvModal.show(this.$route.name);
    },
    editModal(field, rowIndex) {
      console.log("editModalfield", field);

      this.modalData.modalType = "edit";
      this.modalData.title = "";
      this.modalData.date = "";
      this.modalData.file = null;
      this.modalData.content = "";

      this.modalData.editID = "1";
      this.modalData.title = this.table.items[rowIndex].COL1;
      this.modalData.date = this.table.items[rowIndex].COL3;
      // this.modalData.content = this.table.items[rowIndex].COL5;
      this.$bvModal.show(this.$route.name);
    },
    saveNewCompany() {
      if (!this.modalData.conditionName) {
        Toast.fire({
          icon: "warning",
          title: "please enter the new condition name.",
        });
        return;
      }
      this.$bvModal.hide(this.$route.name);
      return;
    },
    deleteCompany(field, rowIndex) {
      console.log("deleteCompanyfield", field);
      console.log("deleteCompanyfield", rowIndex);
    },
    downloadFile(field, rowIndex, index) {
      console.log(field, rowIndex, index);
      Toast.fire({
        icon: "success",
        title: "downloadFile.",
      });
    },
    clickPage(page) {
      this.table.currentPage = page;
      this.searchAction();
    },
  },
  computed: {
    ...mapState(["backgroundColor"]),
  },
  created() {
    this.searchAction();
  },
  watch: {},
};
</script>
<style scoped>
</style>