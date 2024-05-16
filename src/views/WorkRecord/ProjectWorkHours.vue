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
              <b-col>
                <SearchSelect
                  :searchinput.sync="userSelect.keyWords"
                  :allchoose="userSelect.allList"
                />
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row class="justify-content-center">
          <b-button class="mr-2" @click="searchAction(1)" variant="primary"
            >查詢</b-button
          >
        </b-row>
      </b-card>
      <b-card
        class="mb-3"
        :class="backgroundColor == 'dark' ? 'bg-secondary' : 'bg-light'"
      >
        <b-row>
          <b-col>
            <div class="col-6">
              <b-form-select
                :id="$route.name + '1'"
                :class="
                  backgroundColor == 'dark' ? 'text-light bg-secondary' : ''
                "
                v-model="barSelect.value"
                :options="barSelect.options"
                @change="getChartBarData()"
              ></b-form-select>
            </div>
            <ChartBar :chartBarData="chartBarData" />
          </b-col>
          <b-col>
            <div class="col-6">
              <b-form-select
                :id="$route.name + '2'"
                :class="
                  backgroundColor == 'dark' ? 'text-light bg-secondary' : ''
                "
                v-model="pieSelect.value"
                :options="pieSelect.options"
                @change="getChartPieData()"
              ></b-form-select>
            </div>
            <ChartPie :chartPieData="chartPieData" />
          </b-col>
        </b-row>
      </b-card>
      <BaseTable
        :fields="table.fields"
        :items="table.items"
        :currentPage="table.currentPage"
        :totalItems="table.totalItems"
        :perPage="table.perPage"
        :clickPage="clickPage"
      />
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import moment from "moment";
import BaseTable from "./../../components/BaseTable";
import ChartBar from "./../../components/ChartBar";
import ChartPie from "./../../components/ChartPie";
import SearchSelect from "./../../components/SearchSelect";
// import { Toast } from "./../utils/helper";
export default {
  components: {
    BaseTable,
    ChartPie,
    ChartBar,
    SearchSelect,
  },
  data() {
    return {
      userSelect: {
        keyWords: "",
        allList: [],
        isabled: true,
      },
      //chart
      barSelect: {
        value: "1",
        options: [
          { value: "1", text: "每週" },
          { value: "2", text: "每月" },
        ],
      },
      pieSelect: {
        value: "01",
        options: [
          { value: "01", text: "3-4" },
          { value: "02", text: "3-3" },
          { value: "03", text: "3-2" },
          { value: "04", text: "3-1" },
          { value: "05", text: "2-4" },
          { value: "06", text: "2-3" },
          { value: "07", text: "2-2" },
          { value: "08", text: "2-1" },
          { value: "09", text: "1-4" },
          { value: "10", text: "1-3" },
          { value: "11", text: "1-2" },
          { value: "12", text: "1-1" },
        ],
      },
      chartBarData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
          },
          {
            label: "Data One",
            backgroundColor: "red",
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
          },
        ],
      },
      chartPieData: {
        labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
        datasets: [
          {
            backgroundColor: [
              "#007bff",
              "#6f42c1",
              "#dc3545",
              "#fd7e14",
              "#ffc107",
              "#28a745",
              "#e83e8c",
              "#17a2b8",
              "#20c997",
              "#19692c",
            ],
            data: [40, 20, 80, 10],
          },
        ],
      },
      // table
      searchData: null,
      table: {
        currentPage: 1,
        perPage: 5,
        totalItems: 0,
        fields: [
          { key: "COL0", label: "使用者名稱" },
          { key: "COL1", label: "專案名稱" },
          { key: "COL2", label: "工作日期" },
          { key: "COL3", label: "工作時數" },
          { key: "COL4", label: "專案記事" },
        ],
        items: [],
      },

      ///test///
      //edit start stop delete
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
      APIworkRecord: [
        {
          id: "1",
          user_Name: "user1",
          project_Name: "專案Ｂ",
          workHours: "8",
          workDate: "2024-01-01",
          content: "workRecord1",
        },
        {
          id: "2",
          user_Name: "user2",
          project_Name: "專案Ｂ",
          workHours: "8",
          workDate: "2024-01-01",
          content: "workRecord2",
        },
        {
          id: "3",
          user_Name: "user3",
          project_Name: "專案Ｂ",
          workHours: "4",
          workDate: "2024-01-01",
          content: "workRecord3",
        },
        {
          id: "4",
          user_Name: "user1",
          project_Name: "專案Ｂ",
          workHours: "8",
          workDate: "2024-02-02",
          content: "workRecord4",
        },
        {
          id: "5",
          user_Name: "user3",
          project_Name: "專案Ａ",
          workHours: "4",
          workDate: "2024-01-01",
          content: "workRecord5",
        },
        {
          id: "6",
          user_Name: "user4",
          project_Name: "專案1",
          workHours: "8",
          workDate: "2024-01-01",
          content: "workRecord6",
        },
        {
          id: "7",
          user_Name: "user5",
          project_Name: "專案2",
          workHours: "8",
          workDate: "2024-01-01",
          content: "workRecord7",
        },
        {
          id: "8",
          user_Name: "user6",
          project_Name: "專案3",
          workHours: "8",
          workDate: "2024-01-01",
          content: "workRecord8",
        },
        {
          id: "8",
          user_Name: "user6",
          project_Name: "專案4",
          workHours: "8",
          workDate: "2024-02-02",
          content: "workRecord9",
        },
      ],

      APIchartData: {
        barData: [
          { month: "一月", allWorkHours: "30", week: "1-1" },
          { month: "二月", allWorkHours: "20", week: "1-2" },
          { month: "三月", allWorkHours: "14", week: "1-3" },
          { month: "四月", allWorkHours: "29", week: "1-4" },
          { month: "五月", allWorkHours: "33", week: "2-1" },
          { month: "六月", allWorkHours: "40", week: "2-2" },
          { month: "七月", allWorkHours: "6", week: "2-3" },
          { month: "八月", allWorkHours: "18", week: "2-4" },
          { month: "九月", allWorkHours: "39", week: "3-1" },
          { month: "十月", allWorkHours: "6", week: "3-2" },
          { month: "十一月", allWorkHours: "12", week: "3-3" },
          { month: "十二月", allWorkHours: "18", week: "3-4" },
        ],
        pieData: [
          {
            month: "01",
            user: [
              {
                name: "project1",
                value: 23,
              },
              {
                name: "project2",
                value: 32,
              },
              {
                name: "project3",
                value: 13,
              },
            ],
          },
          {
            month: "02",
            user: [
              {
                name: "project1",
                value: 23,
              },
              {
                name: "project3",
                value: 32,
              },
            ],
          },
          {
            month: "03",
            user: [
              {
                name: "project1",
                value: 13,
              },
              {
                name: "project2",
                value: 26,
              },
              {
                name: "project3",
                value: 9,
              },
            ],
          },
          {
            month: "04",
            user: [
              {
                name: "project1",
                value: 23,
              },
              {
                name: "project2",
                value: 32,
              },
              {
                name: "project3",
                value: 13,
              },
            ],
          },
          {
            month: "05",
            user: [
              {
                name: "project2",
                value: 23,
              },
              {
                name: "project3",
                value: 32,
              },
            ],
          },
          {
            month: "06",
            user: [
              {
                name: "project1",
                value: 23,
              },
              {
                name: "project2",
                value: 32,
              },
              {
                name: "project3",
                value: 13,
              },
            ],
          },
          {
            month: "07",
            user: [
              {
                name: "project1",
                value: 23,
              },
              {
                name: "project2",
                value: 26,
              },
              {
                name: "project3",
                value: 9,
              },
            ],
          },
          {
            month: "08",
            user: [
              {
                name: "project1",
                value: 23,
              },
              {
                name: "project2",
                value: 32,
              },
              {
                name: "project3",
                value: 13,
              },
            ],
          },
          {
            month: "09",
            user: [
              {
                name: "project2",
                value: 32,
              },
              {
                name: "project3",
                value: 13,
              },
            ],
          },
          {
            month: "10",
            user: [
              {
                name: "project1",
                value: 23,
              },
              {
                name: "project2",
                value: 32,
              },
            ],
          },
          {
            month: "11",
            user: [
              {
                name: "project1",
                value: 26,
              },
              {
                name: "project2",
                value: 9,
              },
            ],
          },
          {
            month: "12",
            user: [
              {
                name: "project1",
                value: 13,
              },
              {
                name: "project2",
                value: 26,
              },
              {
                name: "user3",
                value: 9,
              },
            ],
          },
        ],
      },
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
      if (this.userSelect.keyWords) {
        filterData = APIworkRecord.filter(
          (item) => item.project_Name == this.userSelect.keyWords
        );
      } else {
        filterData = APIworkRecord;
      }

      this.table.totalItems = filterData.length;
      let array = filterData.slice(
        (this.table.currentPage - 1) * this.table.perPage,
        this.table.currentPage * this.table.perPage
      );

      this.searchData = array;
      this.setSearchData();
      this.getChartBarData();
    },
    setSearchData() {
      this.table.items.splice(0);

      let array = [];
      for (var index in this.searchData) {
        let data = this.searchData[index];

        array.push({
          COL0: data.user_Name,
          COL1: data.project_Name,
          COL2: data.workDate,
          COL3: data.workHours,
          COL4: data.content,
        });
      }
      this.table.items = array;
    },
    clickPage(page) {
      this.table.currentPage = page;
      this.searchAction();
    },
    getChartBarData() {
      //call api get data
      let monthList = [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
        "一月",
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
      ];

      let labels = [];
      let allWorkHoursList = [];
      let datasetsLabel = "";
      if (this.barSelect.value == "1") {
        //每週
        labels = [
          "1-1",
          "1-2",
          "1-3",
          "1-4",
          "2-1",
          "2-2",
          "2-3",
          "2-4",
          "3-1",
          "3-2",
          "3-3",
          "3-4",
        ];
        for (var idx1 in labels) {
          let data = this.APIchartData.barData.find(
            (item) => item.week == labels[idx1]
          );
          allWorkHoursList.push(Number(data.allWorkHours));
          datasetsLabel = "每週工時";
        }
      } else {
        //每月
        let index = Number(moment().format("MM"));
        labels = monthList.slice(index, index + 12);
        for (var idx2 in labels) {
          let data = this.APIchartData.barData.find(
            (item) => item.month == labels[idx2]
          );
          allWorkHoursList.push(Number(data.allWorkHours));
        }
        datasetsLabel = "每月工時";
      }

      let datasets = [
        {
          label: datasetsLabel,
          backgroundColor: "#04104a",
          data: allWorkHoursList,
        },
      ];

      let object = {
        labels,
        datasets,
      };
      this.chartBarData = object;

      //連動pieChart
      if (this.barSelect.value == "1") {
        this.pieSelect.options = [
          { value: "01", text: "3-4" },
          { value: "02", text: "3-3" },
          { value: "03", text: "3-2" },
          { value: "04", text: "3-1" },
          { value: "05", text: "2-4" },
          { value: "06", text: "2-3" },
          { value: "07", text: "2-2" },
          { value: "08", text: "2-1" },
          { value: "09", text: "1-4" },
          { value: "10", text: "1-3" },
          { value: "11", text: "1-2" },
          { value: "12", text: "1-1" },
        ];
        this.pieSelect.value = "01";
      } else {
        this.pieSelect.options = [
          { value: "01", text: "一月" },
          { value: "02", text: "二月" },
          { value: "03", text: "三月" },
          { value: "04", text: "四月" },
          { value: "05", text: "五月" },
          { value: "06", text: "六月" },
          { value: "07", text: "七月" },
          { value: "08", text: "八月" },
          { value: "09", text: "九月" },
          { value: "10", text: "十月" },
          { value: "11", text: "十一月" },
          { value: "12", text: "十二月" },
        ];
        this.pieSelect.value = moment().format("MM");
      }
      this.getChartPieData();
    },
    getChartPieData() {
      let data = this.APIchartData.pieData.find(
        (item) => item.month == this.pieSelect.value
      );
      let labels = [];
      let value = [];
      for (var index in data.user) {
        labels.push(data.user[index].name);
        value.push(data.user[index].value);
      }

      let datasets = [
        {
          backgroundColor: [
            "#04104a",
            "#dc3545",
            "#fd7e14",
            "#ffc107",
            "#28a745",
            "#e83e8c",
            "#6f42c1",
            "#17a2b8",
            "#007bff",
            "#19692c",
          ],
          data: value,
        },
      ];
      let object = {
        labels,
        datasets,
      };
      this.chartPieData = object;
    },
  },
  computed: {
    ...mapState(["backgroundColor", "currentUser"]),
  },
  watch: {},
  created() {
    console.log("monent", Number(moment().format("MM")).toString());
    for (var index in this.APIuser) {
      this.userSelect.allList.push({
        value: this.APIuser[index].id,
        text: this.APIuser[index].name,
      });
    }
    this.searchAction(1);
  },
};
</script>
<style scoped>
</style>