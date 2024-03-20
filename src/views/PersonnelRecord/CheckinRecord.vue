<template>
  <div>
    <div class="mainContent">
      <b-card
        class="mb-3"
        :class="backgroundColor == 'dark' ? 'bg-secondary' : 'bg-light'"
      >
        <b-row class="mb-3">
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
          <b-col lg="6">
            <b-row>
              <b-col xl="4" lg="5" md="3" class="col-3 titleCSS">
                <label class="fontCSS">日期： </label>
              </b-col>
              <b-col class="">
                <DateField :value.sync="workDate" />
              </b-col>
            </b-row>
          </b-col>
          <!-- button -->
          <b-col class="col-12">
            <b-button @click="searchAction(1)" variant="primary">查詢</b-button>
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
        :clickPage="clickPage"
      />
    </div>
    <!-- modal -->
    <b-modal
      :id="$route.name"
      title="打卡紀錄"
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
                  使用者：
                </label>
              </b-col>
              <b-col>
                <b-form-input
                  :id="$route.name + 'modal1'"
                  :name="$route.name + 'modal1'"
                  placeholder="請輸入使者"
                  v-model="modalData.userName"
                  type="text"
                  :class="
                    backgroundColor == 'dark' ? 'text-light bg-secondary' : ''
                  "
                  trim
                  disabled
                />
              </b-col>
            </b-row>
          </b-col>
          <b-col class="col-12">
            <b-row>
              <b-col lg="2" class="modalTitleCSS col-3">
                <label style="font-size: 20px" :for="$route.name + 'modal2'">
                  日期：
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
                <label style="font-size: 20px"> 打卡紀錄： </label>
              </b-col>
              <b-col>
                <div class="d-flex align-items-center">
                  <b-form-input
                    :id="$route.name + 'modal3'"
                    :name="$route.name + 'modal3'"
                    placeholder="請輸入時間"
                    v-model="modalData.earliestRecord"
                    type="time"
                    class="mr-1"
                    :class="
                      backgroundColor == 'dark' ? 'text-light bg-secondary' : ''
                    "
                    trim
                  />
                  －
                  <b-form-input
                    :id="$route.name + 'modal4'"
                    :name="$route.name + 'modal4'"
                    placeholder="請輸入時間"
                    v-model="modalData.latestRecord"
                    type="time"
                    class="ml-1"
                    :class="
                      backgroundColor == 'dark' ? 'text-light bg-secondary' : ''
                    "
                    trim
                  />
                </div>
              </b-col>
            </b-row>
          </b-col>
          <b-col class="col-12">
            <b-row>
              <b-col lg="2" class="modalTitleCSS col-3">
                <label style="font-size: 20px" :for="$route.name + 'modal4'">
                  備註：
                </label>
              </b-col>
              <b-col>
                <b-form-textarea
                  :id="$route.name + 'modal3'"
                  :name="$route.name + 'modal3'"
                  v-model="modalData.memo"
                  placeholder="請輸入備註內容"
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
      userSelect: {
        keyWords: "",
        allList: [],
        isabled: true,
      },
      workDate: "",
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
          { key: "COL1", label: "使用者" },
          { key: "COL2", label: "日期" },
          { key: "COL3", label: "最早打卡紀錄" },
          { key: "COL4", label: "最晚打卡紀錄" },
          { key: "COL5", label: "狀態" },
        ],
        items: [],
      },
      //modal
      modalData: {
        modalType: "create",
        editID: null,
        userName: "",
        workDate: "",
        earliestRecord: "",
        latestRecord: "",
        memo: "",
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
      ],
      APIcheckinRecord: [
        {
          id: "1",
          userName: "user1",
          workDate: "2024-01-01",
          earliestRecord: "08:02",
          latestRecord: "17:33",
          status: "正常",
          memo: "",
        },
        {
          id: "2",
          userName: "user2",
          workDate: "2024-01-01",
          earliestRecord: "08:40",
          latestRecord: "17:12",
          status: "異常",
          memo: "未滿八小時",
        },
        {
          id: "3",
          userName: "user1",
          workDate: "2024-01-02",
          earliestRecord: "08:02",
          latestRecord: "17:33",
          status: "正常",
          memo: "",
        },
        {
          id: "4",
          userName: "user2",
          workDate: "2024-01-02",
          earliestRecord: "08:40",
          latestRecord: "",
          status: "異常",
          memo: "無下班打卡紀錄",
        },
        {
          id: "5",
          userName: "user1",
          workDate: "2024-01-03",
          earliestRecord: "08:02",
          latestRecord: "17:33",
          status: "正常",
          memo: "",
        },
        {
          id: "6",
          userName: "user2",
          workDate: "2024-01-03",
          earliestRecord: "08:40",
          latestRecord: "17:12",
          status: "異常",
          memo: "未滿八小時",
        },
        {
          id: "7",
          userName: "user1",
          workDate: "2024-01-04",
          earliestRecord: "08:02",
          latestRecord: "17:33",
          status: "正常",
          memo: "",
        },
        {
          id: "8",
          userName: "user2",
          workDate: "2024-01-04",
          earliestRecord: "08:40",
          latestRecord: "17:12",
          status: "異常",
          memo: "未滿八小時",
        },
        {
          id: "9",
          userName: "user1",
          workDate: "2024-01-05",
          earliestRecord: "08:02",
          latestRecord: "17:33",
          status: "正常",
          memo: "",
        },
        {
          id: "10",
          userName: "user2",
          workDate: "2024-01-05",
          earliestRecord: "08:40",
          latestRecord: "17:12",
          status: "異常",
          memo: "未滿八小時",
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

      let APIcheckinRecord = [...this.APIcheckinRecord];
      let filterData = [];
      if (this.userSelect.keyWords) {
        filterData = APIcheckinRecord.filter(
          (item) => item.userName == this.userSelect.keyWords
        );
      } else {
        filterData = APIcheckinRecord;
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
          COL0: "edit",
          COL1: data.userName,
          COL2: data.workDate,
          COL3: data.earliestRecord,
          COL4: data.latestRecord,
          COL5: data.status,
          ID: data.id,
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
      console.log("rowIndex", rowIndex);

      this.modalData.modalType = "edit";
      this.modalData.userName = "";
      this.modalData.workDate = "";
      this.modalData.earliestRecord = "";
      this.modalData.latestRecord = "";
      this.modalData.memo = "";

      let id = this.table.items[rowIndex].ID;
      let data = this.APIcheckinRecord.find((item) => item.id == id);

      this.modalData.editID = data.id;
      this.modalData.userName = data.userName;
      this.modalData.workDate = data.workDate;
      this.modalData.earliestRecord = data.earliestRecord;
      this.modalData.latestRecord = data.latestRecord;
      this.modalData.memo = data.memo;
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
    this.searchAction();
  },
  watch: {},
};
</script>
<style scoped>
</style>