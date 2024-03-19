<template>
  <div>
    <div class="mainContent">
      <!-- <b-col class="col-12" style="text-align: start">
        <b-button @click="createModal()" variant="outline-primary"
          >新增報工</b-button
        >
      </b-col> -->
      <b-col class="col-12 mb-3" style="text-align: start; padding-left: 0">
        <b-button @click="createModal()" variant="primary">新增課程</b-button>
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
      :title="modalData.modalType == 'create' ? '新增課程' : '修改課程'"
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
                  課程名稱：
                </label>
              </b-col>
              <b-col>
                <b-form-input
                  :id="$route.name + 'modal1'"
                  :name="$route.name + 'modal1'"
                  placeholder="請輸入課程名稱"
                  v-model="modalData.courseName"
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
                  課程時間：
                </label>
              </b-col>
              <b-col>
                <DateField :value.sync="modalData.courseDate" />
              </b-col>
            </b-row>
          </b-col>
          <b-col class="col-12">
            <b-row>
              <b-col lg="2" class="modalTitleCSS col-3">
                <label style="font-size: 20px" :for="$route.name + 'modal3'">
                  課程時數：
                </label>
              </b-col>
              <b-col>
                <b-form-input
                  :id="$route.name + 'modal3'"
                  :name="$route.name + 'modal3'"
                  placeholder="請輸入課程時數（小時）"
                  v-model="modalData.courseHours"
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
                  課程內容：
                </label>
              </b-col>
              <b-col>
                <b-form-textarea
                  :id="$route.name + 'modal4'"
                  :name="$route.name + 'modal4'"
                  v-model="modalData.content"
                  placeholder="請輸入課程內容"
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
import { Toast } from "../../utils/helper";
import BaseTable from "./../../components/BaseTable";
// import SearchSelect from "./../../components/SearchSelect";
import DateField from "./../../components/DateField";
export default {
  components: {
    BaseTable,
    // SearchSelect,
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
          { key: "COL1", label: "課程ID" },
          { key: "COL2", label: "課程名稱" },
          { key: "COL3", label: "課程日期" },
          { key: "COL4", label: "課程時數" },
          { key: "COL5", label: "課程內容" },
          // { key: "COL6", label: "相關部門" },
        ],
        items: [],
      },
      //modal
      modalData: {
        modalType: "create",
        editID: null,

        courseName: "",
        courseDate: "2024-01-01",
        courseHours: "",
        content: "",
      },

      ///test///
      APIcourseList: [
        {
          id: "1",
          courseName: "course1",
          courseDate: "2024-01-01",
          courseHours: "2",
          content: "courseList1",
        },
        {
          id: "2",
          courseName: "course2",
          courseDate: "2024-01-01",
          courseHours: "3",
          content: "courseList2",
        },
        {
          id: "3",
          courseName: "course3",
          courseDate: "2024-01-01",
          courseHours: "2",
          content: "courseList3",
        },
        {
          id: "4",
          courseName: "course4",
          courseDate: "2024-01-01",
          courseHours: "5",
          content: "courseList4",
        },
        {
          id: "5",
          courseName: "course5",
          courseDate: "2024-01-01",
          courseHours: "1",
          content: "courseList5",
        },
        {
          id: "6",
          courseName: "course6",
          courseDate: "2024-01-01",
          courseHours: "6",
          content: "courseList6",
        },
        {
          id: "7",
          courseName: "course7",
          courseDate: "2024-01-01",
          courseHours: "3",
          content: "courseList7",
        },
        {
          id: "8",
          courseName: "course8",
          courseDate: "2024-01-01",
          courseHours: "8",
          content: "courseList8",
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
          COL1: data.id,
          COL2: data.courseName,
          COL3: data.courseDate,
          COL4: data.courseHours,
          COL5: data.content,
        });
      }
      this.table.items = array;
    },

    createModal() {
      this.modalData.modalType = "create";
      this.modalData.courseName = "";
      this.modalData.courseDate = "";
      this.modalData.courseHours = "";
      this.modalData.content = "";
      this.$bvModal.show(this.$route.name);
    },
    editModal(field, rowIndex) {
      console.log("editModalfield", field);

      this.modalData.modalType = "edit";
      this.modalData.courseName = "";
      this.modalData.courseDate = "";
      this.modalData.courseHours = "";
      this.modalData.content = "";

      this.modalData.editID = "1";
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
      //   let lastid = this.APIcourseList[this.APIcourseList.length - 1].id;
      //   this.APIcourseList.push({
      //     id: Number(lastid) + 1,
      //     name: this.modalData.companyName,
      //   });

      //   let lastPage = Math.ceil(this.APIcourseList.length / this.table.perPage);
      //   console.log("lastPage", lastPage);
      //   this.companySelect.keyWords = "";
      //   this.searchAction(lastPage);
      // } else {
      //   this.APIcourseList.filter(
      //     (item) => item.id == this.modalData.editID
      //   )[0].name = this.modalData.companyName;
      //   this.searchAction();
      // }
    },
    deleteCompany(field, rowIndex) {
      console.log("deleteCompanyfield", field);
      console.log("deleteCompanyfield", rowIndex);
      // let ID = this.table.items[rowIndex].COL1;
      // this.APIcourseList = this.APIcourseList.filter((item) => item.id !== ID);
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
    this.searchAction();
  },
  watch: {},
};
</script>
<style scoped>
</style>