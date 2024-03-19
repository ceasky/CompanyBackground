<template>
  <div>
    <b-input-group class="">
      <b-form-input
        id="example-input"
        v-model="datevalue"
        type="text"
        placeholder="YYYY-MM-DD"
        autocomplete="off"
        @blur="onfocusoutAction"
        :disabled="!isabled"
        :class="backgroundColor == 'dark' ? 'text-light bg-secondary' : ''"
      ></b-form-input>
      <b-input-group-append>
        <b-form-datepicker
          v-model="datevalue"
          button-only
          right
          locale="zh"
          aria-controls="example-input"
          @context="onContext"
        ></b-form-datepicker>
      </b-input-group-append>
    </b-input-group>
  </div>
</template>
  
<script>
import { mapState } from "vuex";
import { Toast } from "./../utils/helper";
export default {
  props: {
    value: {
      type: String,
    },
    isabled: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      formatted: "",
      selected: "",
    };
  },
  methods: {
    onContext(ctx) {
      this.formatted = ctx.selectedFormatted;
      this.selected = ctx.selectedYMD;
    },
    onfocusoutAction() {
      if (this.datevalue == "") return;
      if (!this.isValidDate(this.datevalue)) {
        this.datevalue = "";
        Toast.fire({
          icon: "error",
          title: "日期格式錯誤，請重新輸入",
        });
      }
    },
    isValidDate(dateString) {
      var regEx = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateString?.match(regEx)) return false; // Invalid format
      var d = new Date(dateString);
      var dNum = d.getTime();
      if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
      return d.toISOString().slice(0, 10) === dateString;
    },
  },
  computed: {
    ...mapState(["backgroundColor"]),
    datevalue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("update:value", val);
      },
    },
  },
};
</script>
