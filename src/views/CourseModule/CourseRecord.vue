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
                <label class="fontCSS">使用者： </label>
              </b-col>
              <b-col class="">
                <SearchSelect
                  placeholder="請輸入關鍵字"
                  :searchinput.sync="userSelect.keyWords"
                  :allchoose="userSelect.allList"
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
              >報名課程</b-button
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
        :deleteAction="deleteCompany"
        :clickPage="clickPage"
      />
    </div>
    <!-- modal -->
    <b-modal
      :id="$route.name"
      title="報名課程"
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
                <label style="font-size: 20px" :for="$route.name + '1'">
                  課程：
                </label>
              </b-col>
              <b-col>
                <SearchSelect
                  placeholder="請輸入關鍵字"
                  :searchinput.sync="modalData.courseSelect.keyWords"
                  :allchoose="modalData.courseSelect.allList"
                />
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
import SearchSelect from "./../../components/SearchSelect";
// import DateField from "./../../components/DateField";
export default {
  components: {
    BaseTable,
    SearchSelect,
    // DateField,
  },
  data() {
    return {
      userSelect: {
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
          // { key: "COL1", label: "課程ID" },
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

        courseSelect: {
          keyWords: "",
          allList: [],
          isabled: true,
        },
      },

      ///test///
      APIuser: [
        {
          id: "1",
          name: "user1",
        },
        {
          id: "2",
          name: "user2",
        },
        {
          id: "3",
          name: "user3",
        },
        {
          id: "4",
          name: "user4",
        },
        {
          id: "5",
          name: "user5",
        },
        {
          id: "6",
          name: "user6",
        },
      ],
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
      APIuserCouese: [
        {
          id: "1",
          userName: "user1",
          courseID: "1",
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
    for (var index in this.APIuser) {
      this.userSelect.allList.push({
        value: this.APIuser[index].id,
        text: this.APIuser[index].name,
      });
    }
    for (var idx in this.APIcourseList) {
      this.modalData.courseSelect.allList.push({
        value: this.APIcourseList[idx].id,
        text: this.APIcourseList[idx].courseName,
      });
    }
    this.searchAction();
  },
  watch: {},
};
</script>
<style scoped>
</style>