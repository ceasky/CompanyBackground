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
          <b-col lg="6">
            <b-row>
              <b-col xl="4" lg="5" md="3" class="col-3 titleCSS">
                <label class="fontCSS">日期： </label>
              </b-col>
              <b-col class="">
                <DateField :value.sync="date" />
              </b-col>
            </b-row>
          </b-col>
          <!-- button -->
          <b-col class="col-12">
            <b-button class="mr-2" @click="searchAction(1)" variant="primary"
              >查詢</b-button
            >
            <b-button @click="createModal()" variant="outline-primary"
              >申請加班</b-button
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
        :text_btnFunction="settleAction"
        :clickPage="clickPage"
      />
    </div>
    <!-- modal -->
    <b-modal
      :id="$route.name"
      :title="modalData.modalType == 'create' ? '申請加班' : '修改加班'"
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
                <label style="font-size: 20px"> 使用者： </label>
              </b-col>
              <b-col>
                <SearchSelect
                  placeholder="請輸入關鍵字"
                  :searchinput.sync="modalData.userSelect.keyWords"
                  :allchoose="modalData.userSelect.allList"
                />
              </b-col>
            </b-row>
          </b-col>
          <b-col class="col-12">
            <b-row>
              <b-col lg="2" class="modalTitleCSS col-3">
                <label style="font-size: 20px"> 專案名稱： </label>
              </b-col>
              <b-col>
                <SearchSelect
                  placeholder="請輸入關鍵字"
                  :searchinput.sync="modalData.projectSelect.keyWords"
                  :allchoose="modalData.projectSelect.allList"
                />
              </b-col>
            </b-row>
          </b-col>
          <b-col class="col-12">
            <b-row>
              <b-col lg="2" class="modalTitleCSS col-3">
                <label style="font-size: 20px"> 起始時間： </label>
              </b-col>
              <b-col>
                <div class="d-flex align-items-center">
                  <div class="col-6" style="padding-left: 0">
                    <DateField :value.sync="modalData.startDate" />
                  </div>
                  <b-form-input
                    :id="$route.name + 'modal4'"
                    :name="$route.name + 'modal4'"
                    placeholder="請輸入時間"
                    v-model="modalData.startTime"
                    type="time"
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
                <label style="font-size: 20px"> 結束時間： </label>
              </b-col>
              <b-col>
                <div class="d-flex align-items-center">
                  <div class="col-6" style="padding-left: 0">
                    <DateField :value.sync="modalData.endDate" />
                  </div>
                  <b-form-input
                    :id="$route.name + 'modal4'"
                    :name="$route.name + 'modal4'"
                    placeholder="請輸入時間"
                    v-model="modalData.endTime"
                    type="time"
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
                <label style="font-size: 20px" :for="$route.name + 'modal2'">
                  結算：
                </label>
              </b-col>
              <b-col>
                <b-form-select
                  :id="$route.name + 'modal2'"
                  :class="
                    backgroundColor == 'dark' ? 'text-light bg-secondary' : ''
                  "
                  v-model="modalData.settleType.value"
                  :options="modalData.settleType.options"
                ></b-form-select>
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
      date: "",
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
          { key: "COL2", label: "專案名稱" },
          { key: "COL3", label: "起始時間" },
          { key: "COL4", label: "結束時間" },
          { key: "COL5", label: "結算方式" },
          { key: "COL6", label: "結算狀態", type: "style_Cstm" },
          { key: "COL7", label: "結算", type: "text_btn" },
        ],
        items: [],
      },
      //modal
      modalData: {
        modalType: "create",
        editID: null,

        userSelect: {
          keyWords: "",
          allList: [],
          isabled: true,
        },
        projectSelect: {
          keyWords: "",
          allList: [],
          isabled: true,
        },
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        memo: "",
        settleType: {
          value: null,
          options: [
            { value: null, text: "請選擇" },
            { value: "1", text: "結算成薪資" },
            { value: "2", text: "結算成特休" },
          ],
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
      APIOvertimeRecord: [
        {
          id: "1",
          userName: "user1",
          projectID: "1",
          startDate: "2024-01-01",
          startTime: "08:00",
          endDate: "2024-01-01",
          endTime: "18:00",
          memo: "專案Ｂ",
          settleType: "1",
          status: "已結算",
        },
        {
          id: "2",
          userName: "user1",
          projectID: "2",
          startDate: "2024-01-02",
          startTime: "08:00",
          endDate: "2024-01-02",
          endTime: "18:00",
          memo: "打疫苗",
          settleType: "2",
          status: "未結算",
        },
        {
          id: "3",
          userName: "user1",
          projectID: "4",
          startDate: "2024-01-04",
          startTime: "08:00",
          endDate: "2024-01-10",
          endTime: "18:00",
          memo: "",
          settleType: "2",
          status: "未結算",
        },
        {
          id: "4",
          userName: "user2",
          projectID: "1",
          startDate: "2024-01-01",
          startTime: "08:00",
          endDate: "2024-01-01",
          endTime: "18:00",
          memo: "特休",
          settleType: "1",
          status: "未結算",
        },
        {
          id: "5",
          userName: "user3",
          projectID: "1",
          startDate: "2024-01-01",
          startTime: "08:00",
          endDate: "2024-01-01",
          endTime: "18:00",
          memo: "特休",
          settleType: "1",
          status: "已結算",
        },
        {
          id: "6",
          userName: "user1",
          projectID: "2",
          startDate: "2024-02-01",
          startTime: "08:00",
          endDate: "2024-02-01",
          endTime: "18:00",
          memo: "特休",
          settleType: "1",
          status: "未結算",
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

      let APIOvertimeRecord = [...this.APIOvertimeRecord];

      let filterData = [];
      if (this.userSelect.keyWords) {
        filterData = APIOvertimeRecord.filter(
          (item) => item.userName == this.userSelect.keyWords
        );
      } else {
        filterData = APIOvertimeRecord;
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
        let project = this.modalData.projectSelect.allList.find(
          (item) => item.value == data.projectID
        ).text;

        let settleType = this.modalData.settleType.options.find(
          (item) => item.value == data.settleType
        ).text;

        let statusStyle = "";
        if (data.status == "已結算") {
          statusStyle = "color:#28a745";
        } else {
          statusStyle = "color:#dc3545";
        }
        let status = {
          text: data.status,
          style: statusStyle,
        };

        let reviewBtn = [
          { text: "結算", variant: "success" },
          { text: "未結算", variant: "danger" },
        ];

        array.push({
          COL0: "edit,delete",
          COL1: data.userName,
          COL2: project,
          COL3: data.startDate + " " + data.startTime,
          COL4: data.endDate + " " + data.endTime,
          COL5: settleType,
          COL6: status,
          COL7: reviewBtn,
          ID: data.id,
        });
      }
      this.table.items = array;
    },

    createModal() {
      this.modalData.modalType = "create";
      this.modalData.userSelect.keyWords = "";
      this.modalData.projectSelect.keyWords = "";
      this.modalData.startDate = "";
      this.modalData.startTime = "";
      this.modalData.endDate = "";
      this.modalData.endTime = "";
      this.modalData.memo = "";
      this.modalData.settleType.value = null;
      this.$bvModal.show(this.$route.name);
    },
    editModal(field, rowIndex) {
      console.log("editModalfield", field);

      this.modalData.modalType = "edit";
      this.modalData.userSelect.keyWords = "";
      this.modalData.projectSelect.keyWords = "";
      this.modalData.startDate = "";
      this.modalData.startTime = "";
      this.modalData.endDate = "";
      this.modalData.endTime = "";
      this.modalData.memo = "";
      this.modalData.settleType.value = null;

      let id = this.table.items[rowIndex].ID;
      let data = this.APIOvertimeRecord.find((item) => item.id == id);
      this.modalData.editID = data.id;

      let project = this.APIproject.find(
        (item) => item.id == data.projectID
      ).name;

      this.modalData.userSelect.keyWords = data.userName;
      this.modalData.projectSelect.keyWords = project;
      this.modalData.settleType.value = data.settleType;
      this.modalData.startDate = data.startDate;
      this.modalData.startTime = data.startTime;
      this.modalData.endDate = data.endDate;
      this.modalData.endTime = data.endTime;
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
    deleteCompany(field, rowIndex) {
      console.log("deleteCompanyfield", field);
      console.log("deleteCompanyfield", rowIndex);
    },
    settleAction(field, rowIndex, itemsIndex) {
      console.log(field, rowIndex, itemsIndex);
      let id = this.table.items[rowIndex].ID;
      let data = this.APIOvertimeRecord.find((item) => item.id == id);
      if (itemsIndex == 0) {
        data.status = "已結算";
      } else {
        data.status = "未結算";
      }
      this.searchAction();
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
    let userSelect = [];
    for (var index in this.APIuser) {
      userSelect.push({
        value: this.APIuser[index].id,
        text: this.APIuser[index].name,
      });
    }
    this.userSelect.allList = [...userSelect];
    this.modalData.userSelect.allList = [...userSelect];

    for (var idx in this.APIproject) {
      this.modalData.projectSelect.allList.push({
        value: this.APIproject[idx].id,
        text: this.APIproject[idx].name,
      });
    }
    this.searchAction();
  },
  watch: {},
};
</script>
<style scoped>
</style>