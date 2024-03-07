<template>
  <div>
    <div class="mainContent">
      <b-row class="mb-3">
        <!-- input sample -->
        <b-col md="6">
          <b-row>
            <b-col xl="3" md="4" class="col-2 titleCSS">
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
        <b-col md="6">
          <b-row>
            <b-col xl="3" md="4" class="col-2 titleCSS">
              <label class="fontCSS" :for="$route.name + '2'">Select： </label>
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
        <b-col md="6">
          <b-row>
            <b-col xl="3" md="4" class="col-2 titleCSS">
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
              ></b-form-datepicker>
            </b-col>
          </b-row>
        </b-col>
        <!-- check sample -->
        <b-col md="6">
          <b-row>
            <b-col xl="3" md="4" class="col-2 titleCSS">
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
        <b-col md="6">
          <b-row>
            <b-col xl="3" md="4" class="col-2 titleCSS">
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
          <b-button disabled variant="outline-primary">sample</b-button>
          <b-button disabled variant="outline-secondary">sample</b-button>
        </b-col>
      </b-row>

      <BaseTable
        :fields="table.fields"
        :items="table.items"
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
      :title="modalData.modalType == 'create' ? 'Create item' : 'Edit item'"
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
      <div>
        <b-row class="align-items-center">
          <b-col lg="2" class="modalTitleCSS col-3">
            <label style="font-size: 20px" :for="$route.name + '4'">
              modalTitle：
            </label>
          </b-col>
          <b-col>
            <b-form-input
              :id="$route.name + '4'"
              :name="$route.name + '4'"
              placeholder="Enter the value"
              v-model="modalData.companyName"
              type="text"
              :class="
                backgroundColor == 'dark' ? 'text-light bg-secondary' : ''
              "
              trim
            />
          </b-col>
        </b-row>
      </div>

      <template #modal-footer="{ cancel }">
        <b-row>
          <b-button class="mr-2" variant="primary">confirm</b-button>
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
import BaseTable from "./../components/BaseTable";
export default {
  components: {
    BaseTable,
  },
  data() {
    return {
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
      table: {
        perPage: 5,
        totalItems: 50,
        fields: [
          {
            key: "COL0",
            label: "default_btn",
            type: "default_btn",
          },
          { key: "COL1", label: "ID" },
          { key: "COL2", label: "Title" },
          { key: "COL3", label: "Data" },
          { key: "COL4", label: "Date" },
          { key: "COL5", label: "Status" },
          { key: "COL10", label: "text_btn", type: "text_btn" },
          { key: "COL12", label: "icon_btn", type: "icon_btn" },
          { key: "COL15", label: "text_btn", type: "text_btn" },
          { key: "COL16", label: "icon_btn", type: "icon_btn" },
        ],
        items: [
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
            COL2: "title1",
            COL3: "data1",
            COL4: "2022-01-01",
            COL5: "proccess",

            COL15: [
              { text: "item1", variant: "secondary" },
              { text: "item2", variant: "danger" },
              { text: "item3", variant: "warning" },
            ],
            COL16: [
              { icon: "pencil-square", variant: "secondary" },
              { icon: "stop", variant: "warning" },
              { icon: "trash", variant: "danger" },
            ],
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
            COL1: "id1",
            COL2: "title1",
            COL3: "data1",
            COL4: "2022-01-01",
            COL5: "new",

            COL15: [
              { text: "item1", variant: "secondary" },
              { text: "item2", variant: "danger" },
              { text: "item3", variant: "warning" },
            ],
            COL16: [
              { icon: "pencil-square", variant: "secondary" },
              { icon: "stop", variant: "warning" },
              { icon: "trash", variant: "danger" },
            ],
          },
        ],
      },
      //modal
      modalData: {
        modalType: "create",
        companyName: "",
      },
    };
  },
  methods: {
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
      console.log("Page", page);
    },
  },
  computed: {
    ...mapState(["backgroundColor"]),
  },
  created() {},
};
</script>
<style scoped>
</style>