<template>
  <div class="wrapper">
    <b-form-input
      id="input-lg"
      placeholder="enter the keywords"
      type="text"
      v-model="searchinputdata"
      @focus="outfocus(1)"
      @blur="outfocus(0)"
      @keyup.enter="$event.target.blur()"
      autocomplete="off"
      :disabled="this.showli.length == 0"
      :class="backgroundColor == 'dark' ? 'text-light bg-secondary' : ''"
    />
    <ul
      :class="backgroundColor == 'dark' ? 'darkBox' : 'lightNBox'"
      v-show="isshow"
    >
      <li
        v-for="item in showli"
        :key="item.value"
        class="listyle"
        @mousedown="choosesitem(item.text)"
        :class="{ disabled: item.disabled }"
      >
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {
    allchoose: {
      type: Array,
    },
    searchinput: {
      type: String,
    },
  },
  data() {
    return {
      showli: this.allchoose,
      isshow: false,
    };
  },
  methods: {
    outfocus(type) {
      let data = this.allchoose.filter(
        (item) => item.text == this.searchinputdata
      );
      if (data.length == 0) {
        this.searchinputdata = "";
      }
      this.isshow = !this.isshow;
      if (type == 0) {
        this.$emit("linkage");
      }
    },
    choosesitem(data) {
      this.searchinputdata = data;
    },
  },
  computed: {
    ...mapState(["backgroundColor"]),
    searchinputdata: {
      get() {
        return this.searchinput;
      },
      set(val) {
        this.$emit("update:searchinput", val);
      },
    },
  },
  created() {},
  watch: {
    searchinputdata: function () {
      this.showli = this.allchoose.filter((item) =>
        item.text?.includes(this.searchinputdata)
      );
      if (this.showli.length == 0) {
        this.showli = [{ value: null, text: "查無符合", disabled: true }];
      }
    },
    allchoose: function () {
      this.showli = this.allchoose;
    },
  },
};
</script>
<style scoped>
.wrapper {
  position: relative;
  width: 100%;
}
ul {
  border: 1px solid #82868b;
  background: white;
  position: absolute;
  width: 100%;
  z-index: 999;
  box-shadow: 0 0 5px 0 #82868b;
  max-height: 200px;
  border-radius: 5px;
}
.darkBox{
  background: #343a40;
  color:white
}
.lightNBox{
  background: white;
}
ul,
li {
  list-style: none;
  padding-left: 0px;
  overflow: auto;
  text-align: start;
}
.listyle {
  padding-left: 1rem;
}
.listyle:hover {
  background: #04104a;
  color: white;
  cursor: pointer;
}
.disabled {
  pointer-events: none;
  color: gray;
}
</style>
