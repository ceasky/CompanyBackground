<template>
  <div>
    <div class="mainContent">
      <b-card
        class="mb-3"
        :class="backgroundColor == 'dark' ? 'bg-secondary' : 'bg-light'"
      >
        <b-row class="mb-3">
          <!-- Company -->
          <b-col lg="6" v-show="currentUser.isAdmin">
            <b-row>
              <b-col xl="4" lg="5" md="3" class="col-3 titleCSS">
                <label class="fontCSS">Company： </label>
              </b-col>
              <b-col>
                <SearchSelect
                  :searchinput.sync="companySelect.keyWords"
                  :allchoose="companySelect.allList"
                />
              </b-col>
            </b-row>
          </b-col>
          <b-col lg="6" v-show="currentUser.isAdmin"></b-col>
          <!-- Department -->
          <b-col lg="6">
            <b-row>
              <b-col xl="4" lg="5" md="3" class="col-3 titleCSS">
                <label class="fontCSS">Department： </label>
              </b-col>
              <b-col class="">
                <SearchSelect
                  :placeholder="
                    !companySelect.keyWords
                      ? 'enter the company first'
                      : 'enter the keywords'
                  "
                  :searchinput.sync="departmentSelect.keyWords"
                  :allchoose="departmentSelect.allList"
                />
              </b-col>
            </b-row>
          </b-col>
          <!-- User -->
          <b-col lg="6">
            <b-row>
              <b-col xl="4" lg="5" md="3" class="col-3 titleCSS">
                <label class="fontCSS">User： </label>
              </b-col>
              <b-col class="">
                <SearchSelect
                  :placeholder="
                    !departmentSelect.keyWords
                      ? 'enter the department first'
                      : 'enter the keywords'
                  "
                  :searchinput.sync="userSelect.keyWords"
                  :allchoose="userSelect.allList"
                />
              </b-col>
            </b-row>
          </b-col>
          <!-- button -->
          <b-col class="col-12">
            <b-button class="mr-2" @click="searchAction(1)" variant="primary"
              >search</b-button
            >
            <b-button @click="createModal()" variant="outline-primary"
              >Create project</b-button
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
        :text_btnFunction="text_btnFunction"
        :clickPage="clickPage"
      />
    </div>
    <!-- modal -->
    <b-modal
      :id="$route.name"
      :title="modalData.modalType == 'create' ? 'Create group' : 'Edit group'"
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
          <!-- user -->
          <b-col class="col-12" v-show="modalData.modalType == 'create'">
            <b-row>
              <b-col lg="3" class="modalTitleCSS col-4">
                <label style="font-size: 20px" :for="$route.name + '4'">
                  User：
                </label>
              </b-col>
              <b-col>
                <SearchSelect
                  :searchinput.sync="modalData.userSelect.keyWords"
                  :allchoose="modalData.userSelect.allList"
                />
              </b-col>
            </b-row>
          </b-col>
          <!-- JobName -->
          <b-col class="col-12">
            <b-row>
              <b-col lg="3" class="modalTitleCSS col-4">
                <label style="font-size: 20px" :for="$route.name + 'modal1'">
                  JobName：
                </label>
              </b-col>
              <b-col>
                <b-form-input
                  :id="$route.name + 'modal1'"
                  :name="$route.name + 'modal1'"
                  placeholder="Enter the JobName"
                  v-model="modalData.jobName"
                  type="text"
                  :class="
                    backgroundColor == 'dark' ? 'text-light bg-secondary' : ''
                  "
                  trim
                />
              </b-col>
            </b-row>
          </b-col>
          <!-- ModelCode -->
          <b-col class="col-12">
            <b-row>
              <b-col lg="3" class="modalTitleCSS col-4">
                <label style="font-size: 20px" :for="$route.name + 'modal2'">
                  ModelCode：
                </label>
              </b-col>
              <b-col>
                <b-form-input
                  :id="$route.name + 'modal2'"
                  :name="$route.name + 'modal2'"
                  placeholder="Enter the ModelCode"
                  v-model="modalData.modelCode"
                  type="text"
                  :class="
                    backgroundColor == 'dark' ? 'text-light bg-secondary' : ''
                  "
                  trim
                />
              </b-col>
            </b-row>
          </b-col>
          <!-- Version -->
          <b-col class="col-12">
            <b-row>
              <b-col lg="3" class="modalTitleCSS col-4">
                <label style="font-size: 20px" :for="$route.name + 'modal3'">
                  Version：
                </label>
              </b-col>
              <b-col>
                <b-form-input
                  :id="$route.name + 'modal3'"
                  :name="$route.name + 'modal3'"
                  placeholder="Enter the Version"
                  v-model="modalData.version"
                  type="text"
                  :class="
                    backgroundColor == 'dark' ? 'text-light bg-secondary' : ''
                  "
                  trim
                />
              </b-col>
            </b-row>
          </b-col>
          <!-- Sort -->
          <b-col class="col-12" v-show="modalData.modalType == 'edit'">
            <b-row>
              <b-col lg="3" class="modalTitleCSS col-4">
                <label style="font-size: 20px" :for="$route.name + 'modal4'">
                  Sort：
                </label>
              </b-col>
              <b-col>
                <b-form-input
                  :id="$route.name + 'modal4'"
                  :name="$route.name + 'modal4'"
                  placeholder="Enter the Sort"
                  v-model="modalData.sort"
                  type="text"
                  :class="
                    backgroundColor == 'dark' ? 'text-light bg-secondary' : ''
                  "
                  trim
                />
              </b-col>
            </b-row>
          </b-col>
          <!-- group -->
          <b-col class="col-12" v-show="modalData.modalType == 'create'">
            <b-row>
              <b-col lg="3" class="modalTitleCSS col-4">
                <label style="font-size: 20px" :for="$route.name + '4'">
                  Group：
                </label>
              </b-col>
              <b-col>
                <SearchSelect
                  :searchinput.sync="modalData.groupSelect.keyWords"
                  :allchoose="modalData.groupSelect.allList"
                  :placeholder="
                    modalData.groupSelect.allList.length == 0
                      ? 'select the user first'
                      : 'enter the keywords'
                  "
                />
              </b-col>
              <div class="w-100"></div>
              <b-col class="offset-lg-3">
                <b-list-group style="width: 100%">
                  <b-list-group-item
                    class="listGroupItemCSS"
                    style="padding: 0.5rem"
                    v-for="(item, index) in modalData.condition"
                    :key="index"
                  >
                    <div class="d-flex align-items-center">
                      <label
                        style="padding: 0; margin: 0; text-align: end"
                        class="col-3"
                        :for="$route.name + 'modal' + index"
                      >
                        {{ item.conditionName }} ：</label
                      >
                      <b-form-input
                        v-show="item.type !== 'file'"
                        :id="$route.name + 'modal' + index"
                        :name="$route.name + 'modal' + index"
                        placeholder="Enter the value"
                        v-model="item.input"
                        class="col-6 col-lg-7"
                        :class="
                          backgroundColor == 'dark'
                            ? 'text-light bg-secondary'
                            : ''
                        "
                        trim
                      />
                      <b-form-file
                        class="col-6 col-lg-7"
                        v-show="item.type == 'file'"
                        v-model="item.file"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
                      ></b-form-file>

                      <div
                        style="width: 100%"
                        class="d-flex justify-content-end"
                      >
                        <b-form-checkbox
                          class=""
                          v-model="item.isrequired"
                          disabled
                        >
                        </b-form-checkbox>
                        <label> Is quired</label>
                      </div>
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
import { Toast } from "../../utils/helper";
import BaseTable from "./../../components/BaseTable";
import SearchSelect from "./../../components/SearchSelect";
export default {
  components: {
    BaseTable,
    SearchSelect,
  },
  data() {
    return {
      companySelect: {
        keyWords: "",
        allList: [],
        isabled: true,
      },
      departmentSelect: {
        keyWords: "",
        allList: [],
        isabled: true,
      },
      userSelect: {
        keyWords: "",
        allList: [],
        isabled: true,
      },

      searchData: null,
      table: {
        currentPage: 1,
        perPage: 5,
        totalItems: 0,
        fields: [
          {
            key: "COL0",
            label: "",
            type: "text_btn",
          },
          { key: "COL1", label: "Project_ID" },
          { key: "COL2", label: "JobName" },
          { key: "COL3", label: "ModelCode" },
          { key: "COL4", label: "Version" },
          { key: "COL5", label: "SEQ" },
          { key: "COL6", label: "Status", type: "style_Cstm" },
          { key: "COL7", label: "GroupName" },
          { key: "COL8", label: "UserId" },
          { key: "COL9", label: "CompanyId" },
          { key: "COL10", label: "DepartmentId" },
          { key: "COL11", label: "CreateDate" },
          { key: "COL12", label: "StartDate" },
          { key: "COL13", label: "EndDate" },
          { key: "COL14", label: "Sort" },
          { key: "COL15", label: "Preport", type: "text_btn" },
        ],
        items: [],
      },
      //modal
      modalData: {
        modalType: "create",
        editID: null,
        jobName: "",
        modelCode: "",
        version: "",
        sort: "",
        userSelect: {
          keyWords: "",
          allList: [
            // { value: "1", text: "item10" },
          ],
          isabled: true,
        },
        groupSelect: {
          keyWords: "",
          allList: [
            // { value: "1", text: "item10" },
          ],
          isabled: true,
        },
        condition: [
          // {
          //   id: "1",
          //   conditionID: "1",
          //   conditionName: "PDF_file",
          //   input: "",
          //   file: null,
          //   type: "file",
          //   isrequired: true,
          // },
          // {
          //   id: "2",
          //   conditionID: "2",
          //   conditionName: "PDF_file",
          //   input: "",
          //   file: null,
          //   type: "file",
          //   isrequired: true,
          // },
        ],
      },

      ///test///
      //edit start stop delete
      APIcompany: [
        { id: "1", name: "company1" },
        { id: "2", name: "company2" },
        { id: "3", name: "company3" },
      ],
      APIdepartment: [
        {
          id: "1",
          name: "C1D1",
          companyID: "1",
          group: ["1", "2", "3"],
        },
        {
          id: "2",
          name: "C1D2",
          companyID: "1",
          group: ["4", "5"],
        },
        {
          id: "3",
          name: "C2D1",
          companyID: "2",
          group: ["1", "6"],
        },
        {
          id: "4",
          name: "C3D1",
          companyID: "3",
          group: ["2", "3"],
        },
        {
          id: "5",
          name: "C3D2",
          companyID: "3",
          group: ["6"],
        },
        {
          id: "6",
          name: "C3D3",
          companyID: "3",
          group: ["2", "3", "1"],
        },
      ],
      APIuser: [
        {
          id: "1",
          name: "C1D1U1",
          companyName: "company1",
          departmentName: "C1D1",
        },
        {
          id: "2",
          name: "C1D1U2",
          companyName: "company1",
          departmentName: "C1D1",
        },
        {
          id: "3",
          name: "C1D2U1",
          companyName: "company1",
          departmentName: "C1D2",
        },
        {
          id: "4",
          name: "C2D1U1",
          companyName: "company2",
          departmentName: "C2D1",
        },
        {
          id: "5",
          name: "C2D1U2",
          companyName: "company2",
          departmentName: "C2D1",
        },
        {
          id: "6",
          name: "C2D1U3",
          companyName: "company2",
          departmentName: "C2D1",
        },
        {
          id: "7",
          name: "C3D1U1",
          companyName: "company3",
          departmentName: "C3D1",
        },
        {
          id: "8",
          name: "C3D1U2",
          companyName: "company3",
          departmentName: "C3D1",
        },
        {
          id: "9",
          name: "C3D2U1",
          companyName: "company3",
          departmentName: "C3D2",
          permission: ["5", "2"],
        },
        {
          id: "10",
          name: "C3D3U1",
          companyName: "company3",
          departmentName: "C3D3",
        },
        {
          id: "11",
          name: "C3D3U2",
          companyName: "company3",
          departmentName: "C3D3",
        },
        {
          id: "12",
          name: "C3D3U3",
          companyName: "company3",
          departmentName: "C3D3",
        },
        {
          id: "13",
          name: "C3D3U4",
          companyName: "company3",
          departmentName: "C3D3",
        },
      ],
      APIcondition: [
        { id: "1", name: "PDF_file", type: "file" },
        { id: "2", name: "Image_file", type: "file" },
        { id: "3", name: "Gerber_file", type: "file" },
        { id: "4", name: "ValueA", type: "" },
        { id: "5", name: "ValueB", type: "" },
        { id: "6", name: "ValueC", type: "" },
      ],
      APIgroup: [
        {
          id: "1",
          name: "group1",
          condition: [
            { id: "1", conditionID: "1", isrequired: true },
            { id: "2", conditionID: "1", isrequired: false },
            { id: "3", conditionID: "2", isrequired: true },
            { id: "4", conditionID: "4", isrequired: false },
            { id: "5", conditionID: "5", isrequired: false },
          ],
        },
        {
          id: "2",
          name: "group2",
          condition: [
            { id: "1", conditionID: "1", isrequired: true },
            { id: "2", conditionID: "2", isrequired: true },
            { id: "3", conditionID: "3", isrequired: true },
            { id: "4", conditionID: "5", isrequired: false },
          ],
        },
        {
          id: "3",
          name: "group3",
          condition: [
            { id: "1", conditionID: "2", isrequired: true },
            { id: "2", conditionID: "2", isrequired: true },
            { id: "3", conditionID: "4", isrequired: false },
            { id: "4", conditionID: "6", isrequired: false },
          ],
        },
        {
          id: "4",
          name: "group4",
          condition: [
            { id: "1", conditionID: "1", isrequired: true },
            { id: "2", conditionID: "3", isrequired: false },
            { id: "3", conditionID: "3", isrequired: true },
            { id: "4", conditionID: "6", isrequired: false },
          ],
        },
        {
          id: "5",
          name: "group5",
          condition: [
            { id: "1", conditionID: "1", isrequired: true },
            { id: "2", conditionID: "1", isrequired: true },
            { id: "3", conditionID: "1", isrequired: true },
            { id: "4", conditionID: "4", isrequired: true },
          ],
        },
        {
          id: "6",
          name: "group6",
          condition: [
            { id: "1", conditionID: "3", isrequired: true },
            { id: "2", conditionID: "4", isrequired: false },
            { id: "3", conditionID: "5", isrequired: false },
            { id: "4", conditionID: "6", isrequired: false },
          ],
        },
      ],
      APIprojectStatus: [
        { id: "0", name: "Create" },
        { id: "1", name: "New" },
        { id: "2", name: "Running" },
        { id: "5", name: "Delete" },
        { id: "9", name: "Complate" },
      ],
      APIproject: [
        {
          id: "1",
          jobName: "jobName1",
          modelCode: "modelCode1",
          version: "version1",
          SEQ: "",
          Status: "0",
          groupName: "group1",
          userID: "C1D1U1",
          departmentId: "C1D1",
          companyId: "company1",
          createDate: "2020-01-01",
          startDate: "2020-01-01",
          endDate: "2020-01-01",
          report: "",
          sort: "0",
        },
        {
          id: "2",
          jobName: "jobName2",
          modelCode: "modelCode2",
          version: "version2",
          SEQ: "",
          Status: "1",
          groupName: "group2",
          userID: "C1D1U2",
          departmentId: "C1D1",
          companyId: "company1",
          createDate: "2020-01-01",
          startDate: "2020-01-01",
          endDate: "2020-01-01",
          report: "",
          sort: "0",
        },
        {
          id: "3",
          jobName: "jobName3",
          modelCode: "modelCode3",
          version: "version3",
          SEQ: "",
          Status: "2",
          groupName: "group3",
          userID: "C1D2U1",
          departmentId: "C1D2",
          companyId: "company1",
          createDate: "2020-01-01",
          startDate: "2020-01-01",
          endDate: "2020-01-01",
          report: "",
          sort: "0",
        },
        {
          id: "4",
          jobName: "jobName4",
          modelCode: "modelCode4",
          version: "version4",
          SEQ: "",
          Status: "9",
          groupName: "group4",
          userID: "C2D1U1",
          departmentId: "C2D1",
          companyId: "company2",
          createDate: "2020-01-01",
          startDate: "2020-01-01",
          endDate: "2020-01-01",
          report: "report",
          sort: "0",
        },
        {
          id: "5",
          jobName: "jobName5",
          modelCode: "modelCode5",
          version: "version5",
          SEQ: "",
          Status: "9",
          groupName: "group5",
          userID: "C2D1U2",
          departmentId: "C2D1",
          companyId: "company2",
          createDate: "2020-01-01",
          startDate: "2020-01-01",
          endDate: "2020-01-01",
          report: "report",
          sort: "0",
        },
        {
          id: "6",
          jobName: "jobName6",
          modelCode: "modelCode6",
          version: "version6",
          SEQ: "",
          Status: "5",
          groupName: "group6",
          userID: "C2D1U3",
          departmentId: "C2D1",
          companyId: "company2",
          createDate: "2020-01-01",
          startDate: "2020-01-01",
          endDate: "2020-01-01",
          report: "",
          sort: "0",
        },
        {
          id: "7",
          jobName: "jobName7",
          modelCode: "modelCode7",
          version: "version7",
          SEQ: "",
          Status: "0",
          groupName: "group1",
          userID: "C3D1U1",
          departmentId: "C3D1",
          companyId: "company3",
          createDate: "2020-01-01",
          startDate: "2020-01-01",
          endDate: "2020-01-01",
          report: "",
          sort: "0",
        },
        {
          id: "8",
          jobName: "jobName8",
          modelCode: "modelCode8",
          version: "version8",
          SEQ: "",
          Status: "1",
          groupName: "group2",
          userID: "C3D1U2",
          departmentId: "C3D1",
          companyId: "company3",
          createDate: "2020-01-01",
          startDate: "2020-01-01",
          endDate: "2020-01-01",
          report: "",
          sort: "0",
        },
        {
          id: "9",
          jobName: "jobName9",
          modelCode: "modelCode9",
          version: "version9",
          SEQ: "",
          Status: "0",
          groupName: "group3",
          userID: "C3D2U1",
          departmentId: "C3D2",
          companyId: "company3",
          createDate: "2020-01-01",
          startDate: "2020-01-01",
          endDate: "2020-01-01",
          report: "",
          sort: "0",
        },
        {
          id: "10",
          jobName: "jobName10",
          modelCode: "modelCode10",
          version: "version10",
          SEQ: "",
          Status: "0",
          groupName: "group4",
          userID: "C3D3U1",
          departmentId: "C3D3",
          companyId: "company3",
          createDate: "2020-01-01",
          startDate: "2020-01-01",
          endDate: "2020-01-01",
          report: "",
          sort: "0",
        },
        {
          id: "11",
          jobName: "jobName11",
          modelCode: "modelCode11",
          version: "version11",
          SEQ: "",
          Status: "1",
          groupName: "group5",
          userID: "C3D3U2",
          departmentId: "C3D3",
          companyId: "company3",
          createDate: "2020-01-01",
          startDate: "2020-01-01",
          endDate: "2020-01-01",
          report: "",
          sort: "50",
        },
        {
          id: "12",
          jobName: "jobName12",
          modelCode: "modelCode12",
          version: "version12",
          SEQ: "",
          Status: "1",
          groupName: "group6",
          userID: "C3D3U3",
          departmentId: "C3D3",
          companyId: "company3",
          createDate: "2020-01-01",
          startDate: "2020-01-01",
          endDate: "2020-01-01",
          report: "",
          sort: "99",
        },
        {
          id: "13",
          jobName: "jobName13",
          modelCode: "modelCode13",
          version: "version13",
          SEQ: "",
          Status: "9",
          groupName: "group4",
          userID: "C3D3U4",
          departmentId: "C3D3",
          companyId: "company3",
          createDate: "2020-01-01",
          startDate: "2020-01-01",
          endDate: "2020-01-01",
          report: "report",
          sort: "0",
        },
        {
          id: "14",
          jobName: "jobName14",
          modelCode: "modelCode14",
          version: "version14",
          SEQ: "",
          Status: "9",
          groupName: "group6",
          userID: "C3D3U4",
          departmentId: "C3D3",
          companyId: "company3",
          createDate: "2020-01-01",
          startDate: "2020-01-01",
          endDate: "2020-01-01",
          report: "report",
          sort: "0",
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
      if (this.userSelect.keyWords) {
        filterData = APIproject.filter(
          (item) => item.userID == this.userSelect.keyWords
        );
      } else {
        if (this.departmentSelect.keyWords) {
          filterData = APIproject.filter(
            (item) => item.departmentId == this.departmentSelect.keyWords
          );
        } else {
          if (this.companySelect.keyWords) {
            filterData = APIproject.filter(
              (item) => item.companyId == this.companySelect.keyWords
            );
          } else {
            filterData = APIproject;
          }
        }
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

        let btn = [];
        let repartbtn = [];
        let statusValue = this.APIprojectStatus.find(
          (a) => a.id == data.Status
        ).name;
        let statusStyle = "";

        if (data.Status == "0") {
          btn = [
            { text: "edit", variant: "secondary" },
            { text: "start", variant: "success" },
            { text: "delete", variant: "danger" },
          ];
        }
        if (data.Status == "1") {
          btn = [
            { text: "edit", variant: "secondary" },
            { text: "stop", variant: "warning" },
            { text: "delete", variant: "danger" },
          ];
          statusStyle = "color:#04104a";
        }
        if (data.Status == "2") {
          statusStyle = "color:#ffc107";
        }
        if (data.Status == "5") {
          statusStyle = "color:#dc3545";
        }
        if (data.Status == "9") {
          repartbtn = [{ text: "Download", variant: "primary" }];
          statusStyle = "color:#28a745";
        }

        let status = {
          text: statusValue,
          style: statusStyle,
        };

        array.push({
          COL0: btn,
          COL1: data.id,
          COL2: data.jobName,
          COL3: data.modelCode,
          COL4: data.version,
          COL5: data.SEQ,
          COL6: status,
          COL7: data.groupName,
          COL8: data.userID,
          COL9: data.companyId,
          COL10: data.departmentId,
          COL11: data.createDate,
          COL12: data.startDate,
          COL13: data.endDate,
          COL14: data.sort,
          COL15: repartbtn,
        });
      }
      this.table.items = array;
    },
    clickPage(page) {
      this.table.currentPage = page;
      this.searchAction();
    },
    createModal() {
      this.modalData.modalType = "create";
      //reset
      this.modalData.userSelect.keyWords = "";
      this.modalData.jobName = "";
      this.modalData.modelCode = "";
      this.modalData.version = "";
      this.modalData.sort = "";
      this.modalData.groupSelect.keyWords = "";
      this.modalData.condition.splice(0);
      //show modal
      this.$bvModal.show(this.$route.name);
    },
    text_btnFunction(field, rowIndex, itemsIndex) {
      let projectID = this.table.items[rowIndex].COL1;
      let itema = this.APIproject.find((a) => a.id == projectID);
      if (field == "COL14") {
        Toast.fire({
          icon: "success",
          title: "open the report(ID:" + projectID + ").",
        });
      } else {
        if (itemsIndex == 1) {
          if (itema.Status == "0") {
            itema.Status = "1";
            Toast.fire({
              icon: "success",
              title: "Start the project(ID:" + projectID + ").",
            });
            this.searchAction();
            return;
          }
          if (itema.Status == "1") {
            itema.Status = "0";
            Toast.fire({
              icon: "success",
              title: "Stop the project(ID:" + projectID + ").",
            });
            this.searchAction();
            return;
          }
        }
        if (itemsIndex == 2) {
          Toast.fire({
            icon: "success",
            title: "Delete the project(ID:" + projectID + ").",
          });
          let itema = this.APIproject.find((a) => a.id == projectID);
          itema.Status = "5";
          this.searchAction();
          return;
        }
        this.editModal(itema);
      }
    },
    editModal(data) {
      this.modalData.modalType = "edit";
      //reset
      this.modalData.userSelect.keyWords = "";
      this.modalData.jobName = "";
      this.modalData.modelCode = "";
      this.modalData.version = "";
      this.modalData.sort = "";
      this.modalData.groupSelect.keyWords = "";
      this.modalData.condition.splice(0);
      //set data
      this.modalData.editID = data.id;
      this.modalData.jobName = data.jobName;
      this.modalData.modelCode = data.modelCode;
      this.modalData.version = data.version;
      this.modalData.sort = data.sort;
      //show modal
      this.$bvModal.show(this.$route.name);
    },
    saveNewCompany() {
      //check isrequired field
      if (this.modalData.modalType == "create") {
        if (!this.modalData.userSelect.keyWords) {
          Toast.fire({
            icon: "warning",
            title: "please select the user.",
          });
          return;
        }
        if (!this.modalData.groupSelect.keyWords) {
          Toast.fire({
            icon: "warning",
            title: "please select the group.",
          });
          return;
        }
        for (var index in this.modalData.condition) {
          let data = this.modalData.condition[index];
          if (data.isrequired) {
            if (data.type == "file") {
              if (!data.file) {
                Toast.fire({
                  icon: "warning",
                  title: "please choose the " + data.conditionName + " file.",
                });
                return;
              }
            } else {
              if (!data.input) {
                Toast.fire({
                  icon: "warning",
                  title: "please enter the " + data.conditionName + " value.",
                });
                return;
              }
            }
          }
        }
      }
      if (!this.modalData.jobName) {
        Toast.fire({
          icon: "warning",
          title: "please enter the JobName.",
        });
        return;
      }
      if (!this.modalData.modelCode) {
        Toast.fire({
          icon: "warning",
          title: "please enter the ModelCode.",
        });
        return;
      }
      if (!this.modalData.version) {
        Toast.fire({
          icon: "warning",
          title: "please enter the Version.",
        });
        return;
      }

      //save data
      if (this.modalData.modalType == "create") {
        let lastid = this.APIproject[this.APIproject.length - 1].id;
        let userItem = this.APIuser.find(
          (item) => item.name == this.modalData.userSelect.keyWords
        );

        this.APIproject.push({
          id: Number(lastid) + 1,
          jobName: this.modalData.jobName,
          modelCode: this.modalData.modelCode,
          version: this.modalData.version,
          SEQ: "",
          Status: "0",
          groupName: this.modalData.groupSelect.keyWords,
          userID: this.modalData.userSelect.keyWords,
          departmentId: userItem.departmentName,
          companyId: userItem.companyName,
          createDate: moment().format("YYYY-MM-DD"),
          startDate: moment().format("YYYY-MM-DD"),
          endDate: moment().format("YYYY-MM-DD"),
          report: "",
          sort: "0",
        });

        let lastPage = Math.ceil(this.APIproject.length / this.table.perPage);
        console.log("lastPage", lastPage);
        this.companySelect.keyWords = "";
        this.departmentSelect.keyWords = "";
        this.userSelect.keyWords = "";
        this.searchAction(lastPage);
      } else {
        let editItem = this.APIproject.find(
          (item) => item.id == this.modalData.editID
        );
        editItem.jobName = this.modalData.jobName;
        editItem.modelCode = this.modalData.modelCode;
        editItem.version = this.modalData.version;
        editItem.sort = this.modalData.sort;
        this.searchAction();
      }
      this.$bvModal.hide(this.$route.name);
    },

    getDepartmentAPI() {
      this.departmentSelect.keyWords = "";
      this.departmentSelect.allList.splice(0);

      let departmentList = [];
      for (var index in this.APIdepartment) {
        let data = this.APIdepartment[index];
        let companyID = this.APIcompany.find(
          (item) => item.name == this.companySelect.keyWords
        ).id;

        if (data.companyID == companyID) {
          departmentList.push({
            value: data.id,
            text: data.name,
          });
        }
      }
      this.departmentSelect.allList = [...departmentList];
    },
    getUserAPI() {
      this.userSelect.keyWords = "";
      this.userSelect.allList.splice(0);

      let userList = [];
      for (var index in this.APIuser) {
        let data = this.APIuser[index];
        if (data.departmentName == this.departmentSelect.keyWords) {
          userList.push({
            value: data.id,
            text: data.name,
          });
        }
      }
      this.userSelect.allList = [...userList];
    },
    getGroupAPI() {
      this.modalData.groupSelect.keyWords = "";
      this.modalData.groupSelect.allList.splice(0);

      let a = this.APIuser.find(
        (it) => it.name == this.modalData.userSelect.keyWords
      );
      let b = this.APIdepartment.find((c) => c.name == a.departmentName);

      // ["1","2","3"]

      let groupSelect = [];
      for (var index in b.group) {
        let data = this.APIgroup.find((d) => d.id == b.group[index]);
        groupSelect.push({
          value: data.id,
          text: data.name,
        });
      }
      this.modalData.groupSelect.allList = [...groupSelect];
    },
    getModalGroupAPI(item) {
      this.modalData.condition.splice(0);

      for (var index in item.condition) {
        let data = item.condition[index];
        let b = this.APIcondition.find((i) => i.id == data.id);
        this.modalData.condition.push({
          id: data.id,
          conditionID: data.conditionID,
          conditionName: b.name,
          input: "",
          file: null,
          type: b.type,
          isrequired: data.isrequired,
        });
      }
    },
  },
  watch: {
    "companySelect.keyWords": function (newValue) {
      if (newValue) {
        let item = this.APIcompany.find(
          (item) => item.name == this.companySelect.keyWords
        );
        if (item) {
          this.getDepartmentAPI();
        } else return;
      } else {
        this.departmentSelect.keyWords = "";
        this.departmentSelect.allList.splice(0);
      }
    },
    "departmentSelect.keyWords": function (newValue) {
      if (newValue) {
        let item = this.APIdepartment.find(
          (item) => item.name == this.departmentSelect.keyWords
        );
        if (item) {
          this.getUserAPI();
        } else return;
      } else {
        this.userSelect.keyWords = "";
        this.userSelect.allList.splice(0);
      }
    },
    "modalData.userSelect.keyWords": function (newValue) {
      if (newValue) {
        let item = this.APIuser.find(
          (item) => item.name == this.modalData.userSelect.keyWords
        );
        if (item) {
          this.getGroupAPI();
        } else return;
      } else {
        this.modalData.groupSelect.keyWords = "";
        this.modalData.groupSelect.allList.splice(0);
      }
    },
    "modalData.groupSelect.keyWords": function (newValue) {
      if (newValue) {
        let item = this.APIgroup.find(
          (item) => item.name == this.modalData.groupSelect.keyWords
        );
        if (item) {
          this.getModalGroupAPI(item);
        } else return;
      } else {
        this.modalData.condition.splice(0);
      }
    },
  },
  computed: {
    ...mapState(["backgroundColor", "currentUser"]),
  },
  created() {
    for (var index in this.APIcompany) {
      this.companySelect.allList.push({
        value: this.APIcompany[index].id,
        text: this.APIcompany[index].name,
      });
    }

    if (!this.currentUser.isAdmin) {
      this.companySelect.keyWords = this.currentUser.company;
      this.getDepartmentAPI();

      let APIuser = this.APIuser.filter(
        (a) => a.companyName == this.currentUser.company
      );
      for (var idx in APIuser) {
        this.modalData.userSelect.allList.push({
          value: APIuser[idx].id,
          text: APIuser[idx].name,
        });
      }
    } else {
      for (var idx2 in this.APIuser) {
        this.modalData.userSelect.allList.push({
          value: this.APIuser[idx2].id,
          text: this.APIuser[idx2].name,
        });
      }
    }
    this.searchAction();
  },
};
</script>
<style scoped>
</style>