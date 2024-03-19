<template>
  <div>
    <div class="mainContent">
      <b-card
        class="mb-3"
        :class="backgroundColor == 'dark' ? 'bg-secondary' : 'bg-light'"
      >
        <b-row class="mb-3">
          <!-- Department -->
          <b-col lg="6">
            <b-row>
              <b-col xl="4" lg="5" md="3" class="col-3 titleCSS">
                <label class="fontCSS">部門： </label>
              </b-col>
              <b-col class="">
                <SearchSelect
                  placeholder="請輸入關鍵字"
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
                <label class="fontCSS">使用者： </label>
              </b-col>
              <b-col class="">
                <SearchSelect
                  :placeholder="
                    !departmentSelect.keyWords ? '請先選擇部門' : '請輸入關鍵字'
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
              >查詢</b-button
            >
            <b-button @click="createModal()" variant="outline-primary"
              >新增使用者</b-button
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
        :clickPage="clickPage"
      />
    </div>
    <!-- modal -->
    <b-modal
      :id="$route.name"
      :title="modalData.modalType == 'create' ? '新增使用者' : '修改使用者'"
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
              <b-col lg="2" class="modalTitleCSS col-3">
                <label style="font-size: 20px" :for="$route.name + 'modal1'">
                  部門：
                </label>
              </b-col>
              <b-col>
                <SearchSelect
                  :searchinput.sync="modalData.departmentSelect.keyWords"
                  :allchoose="modalData.departmentSelect.allList"
                  placeholder="請輸入關鍵字"
                />
              </b-col>
            </b-row>
          </b-col>
          <b-col class="col-12">
            <b-row>
              <b-col lg="2" class="modalTitleCSS col-3">
                <label style="font-size: 20px" :for="$route.name + 'modal2'">
                  使用者：
                </label>
              </b-col>
              <b-col>
                <b-form-input
                  :id="$route.name + 'modal2'"
                  :name="$route.name + 'modal2'"
                  placeholder="請輸入使用者名稱"
                  v-model="modalData.userName"
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
                <label style="font-size: 20px" :for="$route.name + 'modal3'">
                  帳號：
                </label>
              </b-col>
              <b-col>
                <b-form-input
                  :id="$route.name + 'modal3'"
                  :name="$route.name + 'modal3'"
                  placeholder="請輸入使用者帳號"
                  v-model="modalData.userAccount"
                  type="text"
                  :class="
                    backgroundColor == 'dark' ? 'text-light bg-secondary' : ''
                  "
                  trim
                />
              </b-col>
            </b-row>
          </b-col>
          <b-col class="col-12" v-show="modalData.modalType == 'create'">
            <b-row>
              <b-col lg="2" class="modalTitleCSS col-3">
                <label style="font-size: 20px" :for="$route.name + 'modal4'">
                  密碼：
                </label>
              </b-col>
              <b-col>
                <b-form-input
                  :id="$route.name + 'modal4'"
                  :name="$route.name + 'modal4'"
                  placeholder="請輸入使用者密碼"
                  v-model="modalData.userPassword"
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
                <label style="font-size: 20px" :for="$route.name + '4'">
                  權限：
                </label>
              </b-col>
              <b-col class="d-flex flex-wrap">
                <b-list-group style="width: 100%">
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
                        class="fontColor col-2"
                        :for="modalData.permissionCheckbox.name + item.value"
                      >
                        {{ item.text }}</label
                      >
                      <label
                        style="margin: 0"
                        class="fontColor"
                        :for="modalData.permissionCheckbox.name + item.value"
                      >
                        {{ item.info }}</label
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
            >確認</b-button
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
// import { Toast } from "./../../utils/helper";
import BaseTable from "./../../components/BaseTable";
import SearchSelect from "./../../components/SearchSelect";
export default {
  components: {
    BaseTable,
    SearchSelect,
  },
  data() {
    return {
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
          { key: "COL1", label: "使用者ID" },
          { key: "COL2", label: "名稱" },
          { key: "COL3", label: "帳號" },
          { key: "COL4", label: "部門" },
          { key: "COL5", label: "權限" },
        ],
        items: [],
      },
      //modal
      modalData: {
        modalType: "create",
        editID: null,
        departmentSelect: {
          keyWords: "",
          allList: [],
          isabled: true,
        },
        permissionCheckbox: {
          name: "permissionCheckbox",
          value: [],
          options: [],
        },
        userName: "",
        userAccount: "",
        userPassword: "",
      },

      ///test///
      APIuser: [
        {
          id: 1,
          name: "user1",
          account: "Accountuser1",
          departmentName: "工程部",
          permission: ["1", "2", "3"],
        },
        {
          id: 2,
          name: "user2",
          account: "Accountuser2",
          departmentName: "工程部",
          permission: ["4", "5"],
        },
        {
          id: 3,
          name: "user3",
          account: "Accountuser3",
          departmentName: "工程部",
          permission: ["1", "2", "3"],
        },
        {
          id: 4,
          name: "user4",
          account: "Accountuser4",
          departmentName: "工程部",
          permission: ["4", "5"],
        },
        {
          id: 5,
          name: "user5",
          account: "Accountuser5",
          departmentName: "業務部",
          permission: ["1", "5"],
        },
        {
          id: 6,
          name: "user6",
          account: "Accountuser6",
          departmentName: "業務部",
          permission: ["4", "3", "2"],
        },
        {
          id: 7,
          name: "user7",
          account: "Accountuser7",
          departmentName: "部門1",
          permission: ["1", "3", "2"],
        },
        {
          id: 8,
          name: "user8",
          account: "Accountuser8",
          departmentName: "部門2",
          permission: ["5", "2"],
        },
        {
          id: 9,
          name: "user9",
          account: "Accountuser9",
          departmentName: "部門3",
          permission: ["5", "2"],
        },
        {
          id: 10,
          name: "user10",
          account: "Accountuser10",
          departmentName: "部門4",
          permission: ["1", "2"],
        },
      ],
      APIdepartment: [
        {
          id: 1,
          name: "工程部",
        },
        {
          id: 2,
          name: "業務部",
        },
        {
          id: 3,
          name: "部門1",
        },
        {
          id: 4,
          name: "部門2",
        },
        {
          id: 5,
          name: "部門3",
        },
        {
          id: 6,
          name: "部門4",
        },
      ],
      APIpermission: [
        { id: "1", name: "P1", info: "Permission1" },
        { id: "2", name: "P2", info: "Permission2" },
        {
          id: "3",
          name: "P3",
          info: "Permission3",
        },
        {
          id: "4",
          name: "P4",
          info: "Permission4",
        },
        { id: "5", name: "P5", info: "Permission5" },
      ],
    };
  },
  methods: {
    searchAction(page) {
      if (page) {
        this.table.currentPage = page;
      }

      //call api get data
      let APIuser = [...this.APIuser];

      let filterData = [];

      if (this.userSelect.keyWords) {
        filterData = APIuser.filter(
          (item) => item.name == this.userSelect.keyWords
        );
      } else {
        if (this.departmentSelect.keyWords) {
          filterData = APIuser.filter(
            (item) => item.departmentName == this.departmentSelect.keyWords
          );
        } else {
          filterData = APIuser;
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
        let permission = [];
        for (var idx in data.permission) {
          let a = data.permission[idx];
          permission.push(this.APIpermission.find((b) => b.id == a).name);
        }

        array.push({
          COL0: "edit,delete",
          COL1: data.id,
          COL2: data.name,
          COL3: data.account,
          COL4: data.departmentName,
          COL5: permission.toString(),
        });
      }
      this.table.items = array;
    },
    createModal() {
      this.modalData.modalType = "create";
      this.modalData.departmentSelect.keyWords = "";
      this.modalData.userName = "";
      this.modalData.userAccount = "";
      this.modalData.userPassword = "";
      this.modalData.permissionCheckbox.value.splice(0);
      this.$bvModal.show(this.$route.name);
    },
    editModal(field, rowIndex) {
      console.log("editModalfield", field);

      this.modalData.modalType = "edit";
      this.modalData.departmentSelect.keyWords = "";
      this.modalData.userName = "";
      this.modalData.userAccount = "";
      this.modalData.userPassword = "";
      this.modalData.permissionCheckbox.value.splice(0);

      let userID = this.table.items[rowIndex].COL1;
      this.modalData.editID = userID;
      let object = this.APIuser.find((item) => item.id == userID);
      this.modalData.departmentSelect.keyWords = object.departmentName;
      this.modalData.userName = object.name;
      this.modalData.userAccount = object.account;
      this.modalData.permissionCheckbox.value = [...object.permission];

      this.$bvModal.show(this.$route.name);
    },
    saveNewCompany() {
      console.log("this.modalData", this.modalData);
      return;

      // if (!this.modalData.companyName) {
      //   Toast.fire({
      //     icon: "warning",
      //     title: "please enter the new company name.",
      //   });
      //   return;
      // }
      // if (this.modalData.modalType == "create") {
      //   console.log("create");
      //   let lastid = this.APIdata[this.APIdata.length - 1].id;
      //   this.APIdata.push({
      //     id: Number(lastid) + 1,
      //     name: this.modalData.companyName,
      //   });

      //   let lastPage = Math.ceil(this.APIdata.length / this.table.perPage);
      //   console.log("lastPage", lastPage);
      //   this.companyName = "";
      //   this.searchAction(lastPage);
      // } else {
      //   this.APIdata.filter(
      //     (item) => item.id == this.modalData.editID
      //   )[0].name = this.modalData.companyName;
      //   this.searchAction();
      // }
      // this.$bvModal.hide(this.$route.name);
    },
    deleteCompany(field, rowIndex) {
      console.log(field, rowIndex);
      return;
      // console.log("deleteCompanyfield", field);
      // let ID = this.table.items[rowIndex].COL1;
      // this.APIdata = this.APIdata.filter((item) => item.id !== ID);
      // this.searchAction(1);
    },
    clickPage(page) {
      this.table.currentPage = page;
      this.searchAction();
    },
    //API
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
  },
  watch: {
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
  },
  computed: {
    ...mapState(["backgroundColor"]),
  },
  created() {
    let departmentList = [];
    for (var index in this.APIdepartment) {
      departmentList.push({
        value: this.APIdepartment[index].id,
        text: this.APIdepartment[index].name,
      });
    }
    this.departmentSelect.allList.splice(0);
    this.modalData.departmentSelect.allList.splice(0);
    this.departmentSelect.allList = [...departmentList];
    this.modalData.departmentSelect.allList = [...departmentList];

    this.modalData.permissionCheckbox.options.splice(0);
    for (var idx in this.APIpermission) {
      let data = this.APIpermission[idx];
      this.modalData.permissionCheckbox.options.push({
        value: data.id,
        text: data.name,
        info: data.info,
      });
    }
    this.searchAction();
  },
};
</script>
<style scoped>
</style>