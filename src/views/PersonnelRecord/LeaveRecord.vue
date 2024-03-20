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
              >申請</b-button
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
        :text_btnFunction="reviewAction"
        :clickPage="clickPage"
      />
    </div>
    <!-- modal -->
    <b-modal
      :id="$route.name"
      :title="modalData.modalType == 'create' ? '申請' : '修改'"
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
                <label style="font-size: 20px" :for="$route.name + 'modal2'">
                  請假類別：
                </label>
              </b-col>
              <b-col>
                <b-form-select
                  :id="$route.name + 'modal2'"
                  :class="
                    backgroundColor == 'dark' ? 'text-light bg-secondary' : ''
                  "
                  v-model="modalData.typeSelect.value"
                  :options="modalData.typeSelect.options"
                ></b-form-select>
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
          { key: "COL2", label: "假別" },
          { key: "COL3", label: "起始時間" },
          { key: "COL4", label: "結束時間" },
          { key: "COL5", label: "審核狀態", type: "style_Cstm" },
          { key: "COL6", label: "審核", type: "text_btn" },
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
        typeSelect: {
          value: null,
          options: [
            { value: null, text: "請選擇" },
            { value: "1", text: "特休" },
            { value: "2", text: "病假" },
            { value: "3", text: "事假" },
          ],
        },
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
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
      APIleaveRecord: [
        {
          id: "1",
          userName: "user1",
          typeSelect: "1",
          startDate: "2024-01-01",
          startTime: "08:00",
          endDate: "2024-01-01",
          endTime: "18:00",
          memo: "特休",
          status: "已核准",
        },
        {
          id: "2",
          userName: "user1",
          typeSelect: "2",
          startDate: "2024-01-02",
          startTime: "08:00",
          endDate: "2024-01-02",
          endTime: "18:00",
          memo: "打疫苗",
          status: "申請中",
        },
        {
          id: "3",
          userName: "user1",
          typeSelect: "3",
          startDate: "2024-01-04",
          startTime: "08:00",
          endDate: "2024-01-10",
          endTime: "18:00",
          memo: "",
          status: "未核准",
        },
        {
          id: "4",
          userName: "user2",
          typeSelect: "1",
          startDate: "2024-01-01",
          startTime: "08:00",
          endDate: "2024-01-01",
          endTime: "18:00",
          memo: "特休",
          status: "申請中",
        },
        {
          id: "5",
          userName: "user3",
          typeSelect: "1",
          startDate: "2024-01-01",
          startTime: "08:00",
          endDate: "2024-01-01",
          endTime: "18:00",
          memo: "特休",
          status: "已核准",
        },
        {
          id: "6",
          userName: "user1",
          typeSelect: "1",
          startDate: "2024-02-01",
          startTime: "08:00",
          endDate: "2024-02-01",
          endTime: "18:00",
          memo: "特休",
          status: "申請中",
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

      let APIleaveRecord = [...this.APIleaveRecord];

      let filterData = [];
      if (this.userSelect.keyWords) {
        filterData = APIleaveRecord.filter(
          (item) => item.userName == this.userSelect.keyWords
        );
      } else {
        filterData = APIleaveRecord;
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
        let type = this.modalData.typeSelect.options.find(
          (item) => item.value == data.typeSelect
        ).text;

        let statusStyle = "";
        if (data.status == "申請中") {
          statusStyle = "color:#04104a";
        } else if (data.status == "已核准") {
          statusStyle = "color:#28a745";
        } else {
          statusStyle = "color:#dc3545";
        }
        let status = {
          text: data.status,
          style: statusStyle,
        };

        let reviewBtn = [
          { text: "核准", variant: "success" },
          { text: "未核准", variant: "danger" },
        ];

        array.push({
          COL0: "edit,delete",
          COL1: data.userName,
          COL2: type,
          COL3: data.startDate + " " + data.startTime,
          COL4: data.endDate + " " + data.endTime,
          COL5: status,
          COL6: reviewBtn,
          ID: data.id,
        });
      }
      this.table.items = array;
    },

    createModal() {
      this.modalData.modalType = "create";
      this.modalData.userSelect.keyWords = "";
      this.modalData.typeSelect.value = null;
      this.modalData.startDate = "";
      this.modalData.startTime = "";
      this.modalData.endDate = "";
      this.modalData.endTime = "";
      this.modalData.memo = "";
      this.$bvModal.show(this.$route.name);
    },
    editModal(field, rowIndex) {
      console.log("editModalfield", field);

      this.modalData.modalType = "edit";
      this.modalData.userSelect.keyWords = "";
      this.modalData.typeSelect.value = null;
      this.modalData.startDate = "";
      this.modalData.startTime = "";
      this.modalData.endDate = "";
      this.modalData.endTime = "";
      this.modalData.memo = "";

      let id = this.table.items[rowIndex].ID;
      let data = this.APIleaveRecord.find((item) => item.id == id);
      this.modalData.editID = data.id;

      this.modalData.userSelect.keyWords = data.userName;
      this.modalData.typeSelect.value = data.typeSelect;
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
    reviewAction(field, rowIndex, itemsIndex) {
      console.log(field, rowIndex, itemsIndex);
      let id = this.table.items[rowIndex].ID;
      let data = this.APIleaveRecord.find((item) => item.id == id);
      if (itemsIndex == 0) {
        data.status = "已核准";
      } else {
        data.status = "未核准";
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
    this.searchAction();
  },
  watch: {},
};
</script>
<style scoped>
</style>