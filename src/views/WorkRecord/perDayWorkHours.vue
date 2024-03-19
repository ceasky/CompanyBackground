<template>
  <div>
    <div class="mainContent">
      <!-- <b-col class="col-12" style="text-align: start">
        <b-button @click="createModal()" variant="outline-primary"
          >新增報工</b-button
        >
      </b-col> -->
      <b-col class="col-12 mb-3" style="text-align: start; padding-left: 0">
        <b-button @click="createModal()" variant="primary">新增報工</b-button>
      </b-col>

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
      :title="modalData.modalType == 'create' ? '新增報工' : '修改報工'"
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
                  專案：
                </label>
              </b-col>
              <b-col>
                <SearchSelect
                  :searchinput.sync="modalData.projectSelect.keyWords"
                  :allchoose="modalData.projectSelect.allList"
                  placeholder="請輸入關鍵字"
                />
              </b-col>
            </b-row>
          </b-col>
          <b-col class="col-12">
            <b-row>
              <b-col lg="2" class="modalTitleCSS col-3">
                <label style="font-size: 20px" :for="$route.name + 'modal2'">
                  工作日期：
                </label>
              </b-col>
              <b-col>
                <DateField :value.sync="modalData.workDate" />
              </b-col>
            </b-row>
          </b-col>
          <b-col class="col-12">
            <b-row>
              <b-col lg="2" class="modalTitleCSS col-3">
                <label style="font-size: 20px" :for="$route.name + 'modal3'">
                  工作時數：
                </label>
              </b-col>
              <b-col>
                <b-form-input
                  :id="$route.name + 'modal3'"
                  :name="$route.name + 'modal3'"
                  placeholder="請輸入工時（小時）"
                  v-model="modalData.workHours"
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
                <label style="font-size: 20px" :for="$route.name + 'modal4'">
                  專案記事：
                </label>
              </b-col>
              <b-col>
                <b-form-textarea
                  :id="$route.name + 'modal4'"
                  :name="$route.name + 'modal4'"
                  v-model="modalData.content"
                  placeholder="請輸入記事"
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
import { Toast } from "./../../utils/helper";
import BaseTable from "./../../components/BaseTable";
import SearchSelect from "./../../components/SearchSelect";
import DateField from "./../../components/DateField";
export default {
  components: {
    BaseTable,
    SearchSelect,
    DateField,
  },
  data() {
    return {
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
          { key: "COL1", label: "使用者名稱" },
          { key: "COL2", label: "專案名稱" },
          { key: "COL3", label: "工作日期" },
          { key: "COL4", label: "工作時數" },
          { key: "COL5", label: "專案記事" },
        ],
        items: [],
      },
      //modal
      modalData: {
        modalType: "create",
        editID: null,
        projectSelect: {
          keyWords: "",
          allList: [],
          isabled: true,
        },
        workHours: "",
        workDate: "2024-01-01",
        content: "",
      },

      ///test///
      APIworkRecord: [
        {
          id: "1",
          user_Name: "user1",
          project_Name: "安新建經",
          workHours: "8",
          workDate: "2024-01-01",
          content: "workRecord1",
        },
        {
          id: "2",
          user_Name: "user1",
          project_Name: "安新建經",
          workHours: "8",
          workDate: "2024-01-01",
          content: "workRecord2",
        },
        {
          id: "3",
          user_Name: "user1",
          project_Name: "安新建經",
          workHours: "4",
          workDate: "2024-01-01",
          content: "workRecord3",
        },
        {
          id: "4",
          user_Name: "user1",
          project_Name: "安新建經",
          workHours: "8",
          workDate: "2024-02-02",
          content: "workRecord4",
        },
        {
          id: "5",
          user_Name: "user1",
          project_Name: "超時代",
          workHours: "4",
          workDate: "2024-01-01",
          content: "workRecord5",
        },
        {
          id: "6",
          user_Name: "user1",
          project_Name: "專案1",
          workHours: "8",
          workDate: "2024-01-01",
          content: "workRecord6",
        },
        {
          id: "7",
          user_Name: "user1",
          project_Name: "專案2",
          workHours: "8",
          workDate: "2024-01-01",
          content: "workRecord7",
        },
        {
          id: "8",
          user_Name: "user1",
          project_Name: "專案3",
          workHours: "8",
          workDate: "2024-01-01",
          content: "workRecord8",
        },
        {
          id: "8",
          user_Name: "user1",
          project_Name: "專案4",
          workHours: "8",
          workDate: "2024-02-02",
          content: "workRecord9",
        },
      ],
      APIproject: [
        {
          id: 1,
          name: "安新建經",
          memo: "安新建經安新建經",
        },
        {
          id: 2,
          name: "超時代",
          memo: "超時代超時代",
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

      let APIworkRecord = [...this.APIworkRecord];

      let filterData = [];
      filterData = APIworkRecord;

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
          COL1: data.user_Name,
          COL2: data.project_Name,
          COL3: data.workDate,
          COL4: data.workHours,
          COL5: data.content,
        });
      }
      this.table.items = array;
    },

    createModal() {
      this.modalData.modalType = "create";
      this.modalData.projectSelect.keyWords = "";
      this.modalData.workHours = "";
      this.modalData.workDate = "";
      this.modalData.content = "";
      this.$bvModal.show(this.$route.name);
    },
    editModal(field, rowIndex) {
      console.log("editModalfield", field);

      this.modalData.modalType = "edit";
      this.modalData.projectSelect.keyWords = "";
      this.modalData.workHours = "";
      this.modalData.workDate = "";
      this.modalData.content = "";

      this.modalData.editID = "1";
      this.modalData.projectSelect.keyWords = this.table.items[rowIndex].COL2;
      this.modalData.workHours = this.table.items[rowIndex].COL4;
      this.modalData.workDate = this.table.items[rowIndex].COL3;
      this.modalData.content = this.table.items[rowIndex].COL5;
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

      // if (this.modalData.modalType == "create") {
      //   console.log("create");
      //   let lastid = this.APIworkRecord[this.APIworkRecord.length - 1].id;
      //   this.APIworkRecord.push({
      //     id: Number(lastid) + 1,
      //     name: this.modalData.companyName,
      //   });

      //   let lastPage = Math.ceil(this.APIworkRecord.length / this.table.perPage);
      //   console.log("lastPage", lastPage);
      //   this.companySelect.keyWords = "";
      //   this.searchAction(lastPage);
      // } else {
      //   this.APIworkRecord.filter(
      //     (item) => item.id == this.modalData.editID
      //   )[0].name = this.modalData.companyName;
      //   this.searchAction();
      // }
    },
    deleteCompany(field, rowIndex) {
      console.log("deleteCompanyfield", field);
      console.log("deleteCompanyfield", rowIndex);
      // let ID = this.table.items[rowIndex].COL1;
      // this.APIworkRecord = this.APIworkRecord.filter((item) => item.id !== ID);
      // this.searchAction(1);
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
    for (var index in this.APIproject) {
      this.modalData.projectSelect.allList.push({
        value: this.APIproject[index].id,
        text: this.APIproject[index].name,
      });
    }
    this.searchAction();
  },
  watch: {},
};
</script>
<style scoped>
</style>