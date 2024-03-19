<template>
  <div>
    <div class="mainContent">
      <b-card
        class="mb-3"
        :class="backgroundColor == 'dark' ? 'bg-secondary' : 'bg-light'"
      >
        <!-- chart -->
        <b-row class="mb-3">
          <!-- searchSelect sample -->
          <b-col lg="6">
            <b-row>
              <b-col xl="4" lg="5" md="3" class="col-3 titleCSS">
                <label class="fontCSS">searchSelect： </label>
              </b-col>
              <b-col>
                <SearchSelect
                  :searchinput.sync="searchSelect.keyWords"
                  :allchoose="searchSelect.allList"
                  @linkage="searchSelectFunction()"
                />
              </b-col>
            </b-row>
          </b-col>
          <!-- input sample -->
          <b-col lg="6">
            <b-row>
              <b-col xl="4" lg="5" md="3" class="col-3 titleCSS">
                <label class="fontCSS" :for="$route.name + '1'">Input： </label>
              </b-col>
              <b-col>
                <b-form-input
                  :id="$route.name + '1'"
                  :name="$route.name + '1'"
                  placeholder="Enter the value"
                  v-model="inputValue"
                  :class="
                    backgroundColor == 'dark' ? 'text-light bg-secondary' : ''
                  "
                  trim
                />
              </b-col>
            </b-row>
          </b-col>
          <!-- select sample -->
          <b-col lg="6">
            <b-row>
              <b-col xl="4" lg="5" md="3" class="col-3 titleCSS">
                <label class="fontCSS" :for="$route.name + '2'"
                  >Select：
                </label>
              </b-col>
              <b-col class="">
                <b-form-select
                  :id="$route.name + '2'"
                  :class="
                    backgroundColor == 'dark' ? 'text-light bg-secondary' : ''
                  "
                  v-model="sampleSelect.value"
                  :options="sampleSelect.options"
                ></b-form-select>
              </b-col>
            </b-row>
          </b-col>
          <!-- date sample -->
          <b-col lg="6">
            <b-row>
              <b-col xl="4" lg="5" md="3" class="col-3 titleCSS">
                <label class="fontCSS" :for="$route.name + '3'">Date： </label>
              </b-col>
              <b-col class="">
                <b-form-datepicker
                  :id="$route.name + '3'"
                  v-model="dateValue"
                  :dark="backgroundColor == 'dark'"
                  :class="
                    backgroundColor == 'dark' ? 'text-light bg-secondary' : ''
                  "
                  class="mb-2 datetype"
                  locale="en"
                ></b-form-datepicker>
              </b-col>
            </b-row>
          </b-col>
          <!-- check sample -->
          <b-col lg="6">
            <b-row>
              <b-col xl="4" lg="5" md="3" class="col-3 titleCSS">
                <label class="fontCSS">Checkbox： </label>
              </b-col>
              <b-col class="d-flex flex-wrap mt-2">
                <div
                  v-for="(item, index) in sampleCheckbox.options"
                  :key="index"
                  class="d-flex mr-1"
                >
                  <b-form-checkbox
                    v-model="sampleCheckbox.value"
                    :value="item.value"
                    :id="sampleCheckbox.name + item.value"
                  >
                  </b-form-checkbox>
                  <label
                    class="fontColor"
                    :for="sampleCheckbox.name + item.value"
                  >
                    {{ item.text }}</label
                  >
                </div>
              </b-col>
            </b-row>
          </b-col>
          <!-- radio sample -->
          <b-col lg="6">
            <b-row>
              <b-col xl="4" lg="5" md="3" class="col-3 titleCSS">
                <label class="fontCSS">Radio： </label>
              </b-col>
              <b-col class="d-flex flex-wrap mt-2">
                <div
                  v-for="(item, index) in this.sampleRadio.options"
                  :key="index"
                  class="d-flex mr-1"
                >
                  <b-form-radio
                    v-model="sampleRadio.value"
                    :value="item.value"
                    :id="sampleRadio.name + item.value"
                  >
                  </b-form-radio>
                  <label class="fontColor" :for="sampleRadio.name + item.value">
                    {{ item.text }}</label
                  >
                </div>
              </b-col>
            </b-row>
          </b-col>

          <b-col class="col-12">
            <b-button @click="createAction()" variant="primary"
              >showModal</b-button
            >
            <b-button @click="getTableData(1)" variant="outline-primary"
              >search</b-button
            >
            <b-button disabled variant="outline-secondary">sample</b-button>
          </b-col>
        </b-row>
        <b-row class="justify-content-center">
          <b-button class="mr-3" @click="getChartBarData()" variant="info"
            >ChartBar</b-button
          >
          <b-button @click="getChartPieData()" variant="success"
            >ChartPie</b-button
          >
        </b-row>
        <b-row class="mb-3">
          <b-col>
            <ChartBar :chartBarData="chartBarData" />
          </b-col>
          <b-col>
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
        :editAction="editAction"
        :deleteAction="deleteAction"
        :text_btnFunction="text_btnFunction"
        :icon_btnFunction="icon_btnFunction"
        :clickPage="clickPage"
      />
    </div>
    <!-- modal -->
    <b-modal
      :id="$route.name"
      :title="
        modalData.modalType == 'create'
          ? 'Create department'
          : 'Edit department'
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
      <div
        :class="backgroundColor == 'dark' ? 'modalTypeDark' : 'contentTypeDark'"
      >
        <b-row class="align-items-center">
          <b-col class="col-12">
            <b-row>
              <b-col lg="3" class="modalTitleCSS col-4">
                <label style="font-size: 20px" :for="$route.name + 'modal1'">
                  Company：
                </label>
              </b-col>
              <b-col>
                <SearchSelect
                  :searchinput.sync="modalData.companySelect.keyWords"
                  :allchoose="modalData.companySelect.allList"
                  :isabled="modalData.modalType == 'create' ? true : false"
                />
              </b-col>
            </b-row>
          </b-col>
          <b-col class="col-12">
            <b-row>
              <b-col lg="3" class="modalTitleCSS col-4">
                <label style="font-size: 20px" :for="$route.name + '4'">
                  Department：
                </label>
              </b-col>
              <b-col>
                <b-form-input
                  :id="$route.name + '4'"
                  :name="$route.name + '4'"
                  placeholder="Enter the new department name"
                  v-model="modalData.departmentName"
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
              <b-col lg="3" class="modalTitleCSS col-4">
                <label style="font-size: 20px" :for="$route.name + '4'">
                  Project：
                </label>
              </b-col>
              <b-col class="d-flex flex-wrap">
                <b-list-group>
                  <b-list-group-item
                    class="listGroupItemCSS"
                    style="padding: 0.5rem"
                    v-for="(item, index) in modalData.permissionCheckbox
                      .options"
                    :key="index"
                  >
                    <div class="d-flex mr-1">
                      <b-form-checkbox
                        v-model="modalData.permissionCheckbox.value"
                        :value="item.value"
                        :id="modalData.permissionCheckbox.name + item.value"
                      >
                      </b-form-checkbox>
                      <label
                        style="margin: 0"
                        class="fontColor"
                        :for="modalData.permissionCheckbox.name + item.value"
                      >
                        {{ item.text }}</label
                      >
                    </div>
                  </b-list-group-item>
                </b-list-group>
              </b-col>
            </b-row>
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
import moment from "moment";
import BaseTable from "./../components/BaseTable";
import ChartBar from "./../components/ChartBar";
import ChartPie from "./../components/ChartPie";
import SearchSelect from "./../components/SearchSelect";
import { Toast } from "./../utils/helper";
export default {
  components: {
    BaseTable,
    ChartPie,
    ChartBar,
    SearchSelect,
  },
  data() {
    return {
      //searchSelect
      searchSelect: {
        keyWords: "",
        allList: [
          { value: "1", text: "item10" },
          { value: "2", text: "item11" },
          { value: "3", text: "item12" },
          { value: "4", text: "item20" },
          { value: "5", text: "item21" },
          { value: "6", text: "item22", disabled: true },
        ],
        isabled: true,
      },
      //input
      inputValue: "",
      //select
      sampleSelect: {
        value: null,
        options: [
          { value: null, text: "Please select an option" },
          { value: "a", text: "This is First option" },
          { value: "b", text: "Selected Option" },
        ],
      },
      //date
      dateValue: "",
      //checkbox
      sampleCheckbox: {
        name: "sampleCheckbox",
        value: [],
        options: [
          { text: "TEST1TEST1TEST1", value: "0" },
          { text: "TEST2TEST1TEST1", value: "1" },
          { text: "TEST1", value: "2" },
          { text: "TEST2", value: "3" },
          { text: "TEST1", value: "4" },
          { text: "TEST2", value: "5" },
        ],
      },
      //radio
      sampleRadio: {
        name: "sampleRadio",
        value: "0",
        options: [
          { text: "TEST1TEST1TEST1", value: "0" },
          { text: "TEST2TEST1TEST1", value: "1" },
          { text: "TEST1", value: "2" },
          { text: "TEST2", value: "3" },
          { text: "TEST1", value: "4" },
          { text: "TEST2", value: "5" },
        ],
      },
      // table
      searchData: null,
      table: {
        currentPage: 1,
        perPage: 10,
        totalItems: 0,
        fields: [
          {
            key: "COL0",
            label: "default_btn",
            type: "default_btn",
          },
          { key: "COL1", label: "default" },
          { key: "COL2", label: "style_Cstm", type: "style_Cstm" },
          { key: "COL10", label: "text_btn", type: "text_btn" },
          { key: "COL12", label: "icon_btn", type: "icon_btn" },
        ],
        items: [],
      },
      //modal
      modalData: {
        modalType: "create",
        editID: null,
        companySelect: {
          keyWords: "",
          allList: [
            { value: "1", text: "item10" },
            { value: "2", text: "item11" },
            { value: "3", text: "item12" },
            { value: "4", text: "item20" },
            { value: "5", text: "item21" },
            { value: "6", text: "item22", disabled: true },
          ],
          isabled: true,
        },
        permissionCheckbox: {
          name: "permissionCheckbox",
          value: [],
          options: [
            { value: "1", text: "projectx1" },
            { value: "2", text: "projectxxx2" },
            { value: "3", text: "projectxx3" },
            { value: "4", text: "projectxxxxx4" },
            { value: "5", text: "projectxx5" },
            { value: "6", text: "projectxxxxxxx6" },
          ],
        },
        departmentName: "",
      },
      //bar-chart
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

      //bar-chart
      chartPieData: {
        labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
        datasets: [
          {
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
            data: [40, 20, 80, 10],
          },
        ],
      },
    };
  },
  methods: {
    getTableData(type) {
      if (type) {
        Toast.fire({
          icon: "warning",
          title: "type.",
        });
        this.table.currentPage = type;
      }

      let data = [
        {
          COL10: [
            { text: "item1", variant: "secondary" },
            { text: "item2", variant: "danger" },
            { text: "item3", variant: "warning" },
            { text: "item1", variant: "secondary" },
            { text: "item2", variant: "danger" },
            { text: "item3", variant: "warning" },
          ],
          COL12: [
            { icon: "pencil-square", variant: "secondary" },
            { icon: "stop", variant: "warning" },
            { icon: "trash", variant: "danger" },
          ],
          COL0: "edit,delete",
          COL1: "id1",
          COL2: {
            text: "datatext",
            style: "color:#dc3545 ; border:2px solid red",
          },
        },
        {
          COL10: [
            { text: "data1", variant: "secondary" },
            { text: "data2", variant: "danger" },
            { text: "data3", variant: "warning" },
          ],
          COL12: [
            { icon: "pencil-square", variant: "primary" },
            { icon: "stop", variant: "danger" },
            { icon: "trash", variant: "info" },
          ],
          COL0: "edit,delete",
          COL1: "id2",
          COL2: {
            text: "datatext",
            style: "color:#dc3545 ; border:2px solid red",
          },

          COL5: "new",
        },
        {
          COL10: [
            { text: "item1", variant: "secondary" },
            { text: "item2", variant: "danger" },
            { text: "item3", variant: "warning" },
            { text: "item1", variant: "secondary" },
            { text: "item2", variant: "danger" },
            { text: "item3", variant: "warning" },
          ],
          COL12: [
            { icon: "pencil-square", variant: "secondary" },
            { icon: "stop", variant: "warning" },
            { icon: "trash", variant: "danger" },
          ],
          COL0: "edit,delete",
          COL1: "id3",
          COL2: {
            text: "datatext",
            style: "color:#dc3545 ; border:2px solid red",
          },
        },
        {
          COL10: [
            { text: "data1", variant: "secondary" },
            { text: "data2", variant: "danger" },
            { text: "data3", variant: "warning" },
          ],
          COL12: [
            { icon: "pencil-square", variant: "primary" },
            { icon: "stop", variant: "danger" },
            { icon: "trash", variant: "info" },
          ],
          COL0: "edit,delete",
          COL1: "id4",
          COL2: {
            text: "datatext",
            style: "color:#dc3545 ; border:2px solid red",
          },

          COL5: "new",
        },
        {
          COL10: [
            { text: "item1", variant: "secondary" },
            { text: "item2", variant: "danger" },
            { text: "item3", variant: "warning" },
            { text: "item1", variant: "secondary" },
            { text: "item2", variant: "danger" },
            { text: "item3", variant: "warning" },
          ],
          COL12: [
            { icon: "pencil-square", variant: "secondary" },
            { icon: "stop", variant: "warning" },
            { icon: "trash", variant: "danger" },
          ],
          COL0: "edit,delete",
          COL1: "id5",
          COL2: {
            text: "datatext",
            style: "color:#dc3545 ; border:2px solid red",
          },
        },
        {
          COL10: [
            { text: "data1", variant: "secondary" },
            { text: "data2", variant: "danger" },
            { text: "data3", variant: "warning" },
          ],
          COL12: [
            { icon: "pencil-square", variant: "primary" },
            { icon: "stop", variant: "danger" },
            { icon: "trash", variant: "info" },
          ],
          COL0: "edit,delete",
          COL1: "id6",
          COL2: {
            text: "datatext",
            style: "color:#dc3545 ; border:2px solid red",
          },

          COL5: "new",
        },
        {
          COL10: [
            { text: "item1", variant: "secondary" },
            { text: "item2", variant: "danger" },
            { text: "item3", variant: "warning" },
            { text: "item1", variant: "secondary" },
            { text: "item2", variant: "danger" },
            { text: "item3", variant: "warning" },
          ],
          COL12: [
            { icon: "pencil-square", variant: "secondary" },
            { icon: "stop", variant: "warning" },
            { icon: "trash", variant: "danger" },
          ],
          COL0: "edit,delete",
          COL1: "id7",
          COL2: {
            text: "datatext",
            style: "color:#dc3545 ; border:2px solid red",
          },
        },
        {
          COL10: [
            { text: "data1", variant: "secondary" },
            { text: "data2", variant: "danger" },
            { text: "data3", variant: "warning" },
          ],
          COL12: [
            { icon: "pencil-square", variant: "primary" },
            { icon: "stop", variant: "danger" },
            { icon: "trash", variant: "info" },
          ],
          COL0: "edit,delete",
          COL1: "id8",
          COL2: {
            text: "datatext",
            style: "color:#dc3545 ; border:2px solid red",
          },

          COL5: "new",
        },
        {
          COL10: [
            { text: "item1", variant: "secondary" },
            { text: "item2", variant: "danger" },
            { text: "item3", variant: "warning" },
            { text: "item1", variant: "secondary" },
            { text: "item2", variant: "danger" },
            { text: "item3", variant: "warning" },
          ],
          COL12: [
            { icon: "pencil-square", variant: "secondary" },
            { icon: "stop", variant: "warning" },
            { icon: "trash", variant: "danger" },
          ],
          COL0: "edit,delete",
          COL1: "id9",
          COL2: {
            text: "datatext",
            style: "color:#dc3545 ; border:2px solid red",
          },
        },
        {
          COL10: [
            { text: "data1", variant: "secondary" },
            { text: "data2", variant: "danger" },
            { text: "data3", variant: "warning" },
          ],
          COL12: [
            { icon: "pencil-square", variant: "primary" },
            { icon: "stop", variant: "danger" },
            { icon: "trash", variant: "info" },
          ],
          COL0: "edit,delete",
          COL1: "id10",
          COL2: {
            text: "datatext",
            style: "color:#dc3545 ; border:2px solid red",
          },

          COL5: "new",
        },
        {
          COL10: [
            { text: "item1", variant: "secondary" },
            { text: "item2", variant: "danger" },
            { text: "item3", variant: "warning" },
            { text: "item1", variant: "secondary" },
            { text: "item2", variant: "danger" },
            { text: "item3", variant: "warning" },
          ],
          COL12: [
            { icon: "pencil-square", variant: "secondary" },
            { icon: "stop", variant: "warning" },
            { icon: "trash", variant: "danger" },
          ],
          COL0: "edit,delete",
          COL1: "id11",
          COL2: {
            text: "datatext",
            style: "color:#dc3545 ; border:2px solid red",
          },
        },
        {
          COL10: [
            { text: "data1", variant: "secondary" },
            { text: "data2", variant: "danger" },
            { text: "data3", variant: "warning" },
          ],
          COL12: [
            { icon: "pencil-square", variant: "primary" },
            { icon: "stop", variant: "danger" },
            { icon: "trash", variant: "info" },
          ],
          COL0: "edit,delete",
          COL1: "id12",
          COL2: {
            text: "datatext",
            style: "color:#dc3545 ; border:2px solid red",
          },

          COL5: "new",
        },
        {
          COL10: [
            { text: "item1", variant: "secondary" },
            { text: "item2", variant: "danger" },
            { text: "item3", variant: "warning" },
            { text: "item1", variant: "secondary" },
            { text: "item2", variant: "danger" },
            { text: "item3", variant: "warning" },
          ],
          COL12: [
            { icon: "pencil-square", variant: "secondary" },
            { icon: "stop", variant: "warning" },
            { icon: "trash", variant: "danger" },
          ],
          COL0: "edit,delete",
          COL1: "id13",
          COL2: {
            text: "datatext",
            style: "color:#dc3545 ; border:2px solid red",
          },
        },
        {
          COL10: [
            { text: "data1", variant: "secondary" },
            { text: "data2", variant: "danger" },
            { text: "data3", variant: "warning" },
          ],
          COL12: [
            { icon: "pencil-square", variant: "primary" },
            { icon: "stop", variant: "danger" },
            { icon: "trash", variant: "info" },
          ],
          COL0: "edit,delete",
          COL1: "id14",
          COL2: {
            text: "datatext",
            style: "color:#dc3545 ; border:2px solid red",
          },

          COL5: "new",
        },
        {
          COL10: [
            { text: "item1", variant: "secondary" },
            { text: "item2", variant: "danger" },
            { text: "item3", variant: "warning" },
            { text: "item1", variant: "secondary" },
            { text: "item2", variant: "danger" },
            { text: "item3", variant: "warning" },
          ],
          COL12: [
            { icon: "pencil-square", variant: "secondary" },
            { icon: "stop", variant: "warning" },
            { icon: "trash", variant: "danger" },
          ],
          COL0: "edit,delete",
          COL1: "id15",
          COL2: {
            text: "datatext",
            style: "color:#dc3545 ; border:2px solid red",
          },

          COL5: "proccess",
        },
        {
          COL10: [
            { text: "data1", variant: "secondary" },
            { text: "data2", variant: "danger" },
            { text: "data3", variant: "warning" },
          ],
          COL12: [
            { icon: "pencil-square", variant: "primary" },
            { icon: "stop", variant: "danger" },
            { icon: "trash", variant: "info" },
          ],
          COL0: "edit,delete",
          COL1: "id16",
          COL2: {
            text: "datatext",
            style: "color:#dc3545 ; border:2px solid red",
          },

          COL5: "new",
        },
        {
          COL10: [
            { text: "data1", variant: "secondary" },
            { text: "data2", variant: "danger" },
            { text: "data3", variant: "warning" },
          ],
          COL12: [
            { icon: "pencil-square", variant: "primary" },
            { icon: "stop", variant: "danger" },
            { icon: "trash", variant: "info" },
          ],
          COL0: "edit,delete",
          COL1: "id17",
          COL2: {
            text: "datatext",
            style: "color:#dc3545 ; border:2px solid red",
          },

          COL5: "new",
        },
        {
          COL10: [
            { text: "item1", variant: "secondary" },
            { text: "item2", variant: "danger" },
            { text: "item3", variant: "warning" },
            { text: "item1", variant: "secondary" },
            { text: "item2", variant: "danger" },
            { text: "item3", variant: "warning" },
          ],
          COL12: [
            { icon: "pencil-square", variant: "secondary" },
            { icon: "stop", variant: "warning" },
            { icon: "trash", variant: "danger" },
          ],
          COL0: "edit,delete",
          COL1: "id18",
          COL2: {
            text: "datatext",
            style: "color:#dc3545 ; border:2px solid red",
          },
        },
        {
          COL10: [
            { text: "data1", variant: "secondary" },
            { text: "data2", variant: "danger" },
            { text: "data3", variant: "warning" },
          ],
          COL12: [
            { icon: "pencil-square", variant: "primary" },
            { icon: "stop", variant: "danger" },
            { icon: "trash", variant: "info" },
          ],
          COL0: "edit,delete",
          COL1: "id19",
          COL2: {
            text: "datatext",
            style: "color:#dc3545 ; border:2px solid red",
          },

          COL5: "new",
        },
        {
          COL10: [
            { text: "item1", variant: "secondary" },
            { text: "item2", variant: "danger" },
            { text: "item3", variant: "warning" },
            { text: "item1", variant: "secondary" },
            { text: "item2", variant: "danger" },
            { text: "item3", variant: "warning" },
          ],
          COL12: [
            { icon: "pencil-square", variant: "secondary" },
            { icon: "stop", variant: "warning" },
            { icon: "trash", variant: "danger" },
          ],
          COL0: "edit,delete",
          COL1: "id20",
          COL2: {
            text: "datatext",
            style: "color:#dc3545 ; border:2px solid red",
          },
        },
        {
          COL10: [
            { text: "data1", variant: "secondary" },
            { text: "data2", variant: "danger" },
            { text: "data3", variant: "warning" },
          ],
          COL12: [
            { icon: "pencil-square", variant: "primary" },
            { icon: "stop", variant: "danger" },
            { icon: "trash", variant: "info" },
          ],
          COL0: "edit,delete",
          COL1: "id21",
          COL2: {
            text: "datatext",
            style: "color:#dc3545 ; border:2px solid red",
          },

          COL5: "new",
        },
      ];
      this.table.totalItems = data.length;

      let array = data.slice(
        (this.table.currentPage - 1) * this.table.perPage,
        this.table.currentPage * this.table.perPage
      );
      this.searchData = array;
      this.setSearchData();
    },
    setSearchData() {
      this.table.items = [...this.searchData];
    },
    createAction() {
      this.modalData.modalType = "create";
      this.$bvModal.show(this.$route.name);
    },
    editAction(field, rowIndex) {
      console.log("editActionfield", field);
      console.log("editActionrowIndex", rowIndex);
      this.modalData.modalType = "edit";
      this.$bvModal.show(this.$route.name);
    },
    deleteAction(field, rowIndex) {
      console.log("deleteActionfield", field);
      console.log("deleteActionrowIndex", rowIndex);
    },
    text_btnFunction(field, rowIndex, itemsIndex) {
      console.log("field", field);
      console.log("rowIndex", rowIndex);
      console.log("itemsIndex", itemsIndex);
    },
    icon_btnFunction(field, rowIndex, itemsIndex) {
      console.log("field", field);
      console.log("rowIndex", rowIndex);
      console.log("itemsIndex", itemsIndex);
    },
    clickPage(page) {
      this.table.currentPage = page;
      this.getTableData();
    },
    getChartBarData() {
      //call api get data
      let labels = [
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
      let datasets = [
        {
          label: "預定排程",
          backgroundColor: "blue",
          data: [800, 400, 600, 390, 100, 400, 390, 800, 400, 200, 120, 110],
        },
        {
          label: "完成排程",
          backgroundColor: "red",
          data: [400, 200, 120, 390, 90, 300, 260, 680, 340, 120, 72, 31],
        },
      ];

      let object = {
        labels,
        datasets,
      };
      this.chartBarData = object;
    },
    getChartPieData() {
      console.log("1");
      //call api get data
      let labels = ["project1", "project2", "project3", "project4", "project5"];
      let datasets = [
        {
          backgroundColor: [
            "#41B883",
            "#E46651",
            "#00D8FF",
            "#DD1B16",
            "yellow",
          ],
          data: [2, 4, 5, 6, 10],
        },
      ];
      let object = {
        labels,
        datasets,
      };
      this.chartPieData = object;
    },
    searchSelectFunction() {
      console.log("searchSelectFunction");
    },
  },
  computed: {
    ...mapState(["backgroundColor"]),
  },
  watch: {
    //test
    "companySelect.keyWords": function (newValue) {
      if (newValue) {
        let item = this.APIcompany.find(
          (item) => item.name == this.companySelect.keyWords
        );
        if (item) {
          this.searchSelectFunction();
        } else return;
      } else {
        this.departmentSelect.keyWords = "";
        this.departmentSelect.allList.splice(0);
      }
    },
  },
  created() {
    this.dateValue = moment().format("YYYY-MM-DD");
  },
};
</script>
<style scoped>
</style>