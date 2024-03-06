<template>
  <div>
    <div class="mainContent">
      <b-row>
        <!-- input sample -->
        <b-col md="6">
          <b-row>
            <b-col xl="3" md="4" class="col-2 titleCSS">
              <label class="fontCSS" :for="$route.name + '1'">Input： </label>
            </b-col>
            <b-col class="">
              <b-form-input
                :id="$route.name + '1'"
                :name="$route.name + '1'"
                placeholder="Enter"
                v-model="inputValue"
                :class="
                  backgroundColor == 'dark' ? 'text-light bg-secondary' : ''
                "
                trim
              ></b-form-input>
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
                v-model="selectedValue"
                :options="selectOptions"
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
      </b-row>

      <BaseTable class="mt-3" :fields="table.fields" :items="table.items" />
    </div>
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

      sampleArray: ["1", "2", "3", "4"],
      inputValue: "",
      selectedValue: null,
      selectOptions: [
        { value: null, text: "Please select an option" },
        { value: "a", text: "This is First option" },
        { value: "b", text: "Selected Option" },
      ],
      dateValue: "",

      selected: null,
      options: [
        { value: null, text: "Please select an option" },
        { value: "a", text: "This is First option" },
        { value: "b", text: "Selected Option" },
        { value: { C: "3PO" }, text: "This is an option with object value" },
        { value: "d", text: "This one is disabled", disabled: true },
      ],
      radioselected: "first",
      radiooptions: [
        { text: "First radio", value: "first" },
        { text: "Second radio", value: "second" },
        { text: "Third radio", value: "third" },
      ],
      table: {
        fields: [
          { key: "COL0", label: "", type: "button" },
          { key: "COL1", label: "排程名稱" },
          { key: "COL2", label: "檔案名稱" },
          { key: "COL3", label: "使用者" },
          { key: "COL4", label: "建立時間" },
          { key: "COL5", label: "狀態" },
        ],
        items: [
          {
            COL0: "delete,edit",
            COL1: "projectname",
            COL2: "filename",
            COL3: "admin",
            COL4: "2022-02-02",
            COL5: "success",
          },
          {
            COL0: "delete,edit",
            COL1: "projectname",
            COL2: "filename",
            COL3: "admin",
            COL4: "2022-02-02",
            COL5: "success",
          },
          {
            COL0: "delete",
            COL1: "projectname",
            COL2: "filename",
            COL3: "admin",
            COL4: "2022-02-02",
            COL5: "success",
          },
          {
            COL0: "delete",
            COL1: "projectname",
            COL2: "filename",
            COL3: "admin",
            COL4: "2022-02-02",
            COL5: "success",
          },
        ],
      },
    };
  },
  methods: {},
  computed: {
    ...mapState(["backgroundColor"]),
  },
  created() {},
};
</script>
<style scoped>
</style>