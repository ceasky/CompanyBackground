<template>
  <div class="" style="padding-top: 5rem">
    <div
      class="d-flex flex-column"
      v-for="(item, index) in sidebarList"
      :key="index"
      @click="showSidebar()"
    >
      <div
        :class="
          item.title == currentRoute && sidebarType == '15' ? 'choosePage' : ''
        "
        @click="renderURL(item.route, sidebarType)"
        v-b-toggle="'collapse' + index"
        style="text-align: left; padding-left: 2rem; height: 3rem"
        class="d-flex align-items-center"
      >
        <i
          class="fa-solid mr-2"
          :class="checkItemFontColor(item.title, item.icon)"
          style="font-size: 1.2rem; width: 1.7rem"
        ></i>
        <i
          :class="checkItemFontColor(item.title)"
          v-show="sidebarType == '15'"
          >{{ item.title }}</i
        >
      </div>

      <b-collapse
        v-if="item.children && sidebarType == '15'"
        :id="'collapse' + index"
        style="width: 100%"
      >
        <b-list-group>
          <b-list-group-item
            v-for="(data, index) in item.children"
            :key="index"
            @click="renderURL(data.route)"
            :class="checkItemCss(data.title)"
            >{{ data.title }}</b-list-group-item
          >
        </b-list-group>
      </b-collapse>
    </div>

    <!-- sidebar -->
    <div>
      <b-sidebar
        id="sidebar-variant"
        :bg-variant="backgroundColor"
        :text-variant="backgroundColor == 'dark' ? 'light' : 'dark'"
        v-model="isSidebar"
        width="15rem"
        no-header
        shadow
        backdrop
      >
        <div class="px-2 py-2">
          <h4 class="mt-3">公司名稱</h4>
          <div
            class="d-flex flex-column"
            v-for="(item, index) in sidebarList"
            :key="index"
          >
            <div
              :class="item.title == currentRoute ? 'choosePage' : ''"
              @click="renderURL(item.route)"
              v-b-toggle="'collapseC' + index"
              style="text-align: left; padding-left: 2rem; height: 3rem"
              class="d-flex align-items-center"
            >
              <i
                class="fa-solid mr-2"
                :class="checkItemFontColor(item.title, item.icon)"
                style="font-size: 1.2rem; width: 1.7rem"
              ></i>
              <i :class="checkItemFontColor(item.title)">{{ item.title }}</i>
            </div>

            <b-collapse :id="'collapseC' + index" style="width: 100%">
              <b-list-group>
                <b-list-group-item
                  v-for="(data, index) in item.children"
                  :key="index"
                  @click="renderURL(data.route)"
                  :class="checkItemCss(data.title)"
                  >{{ data.title }}</b-list-group-item
                >
              </b-list-group>
            </b-collapse>
          </div>
        </div>
      </b-sidebar>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import sidebarContent from "../utils/sidebar.js";
export default {
  data() {
    return {
      sidebarList: [],
      isSidebar: false,
      // windowWidth: window.innerWidth,
    };
  },
  methods: {
    renderURL(route, sidebarType) {
      if (!route) return;
      if (sidebarType == "5") return;

      let Nowroute = this.$router.history.current.name;
      if (Nowroute == route) return;
      this.$router.push({ name: route });
    },
    showSidebar() {
      if (this.sidebarType == "15") return;
      this.isSidebar = !this.isSidebar;
    },
    checkItemCss(route) {
      if (route == this.currentRoute) {
        return "choosePage";
      } else {
        if (this.backgroundColor == "dark") {
          return "itemDark";
        } else {
          return "itemLight";
        }
      }
    },
    checkItemFontColor(route, icon) {
      if (route == this.currentRoute) {
        return "iDark " + icon;
      } else {
        if (this.backgroundColor == "dark") {
          return "iDark " + icon;
        } else {
          return "iLight " + icon;
        }
      }
    },
  },
  computed: {
    ...mapState(["sidebarType", "currentRoute", "backgroundColor"]),
  },
  watch: {},
  created() {
    this.sidebarList = [...sidebarContent];
  },
};
</script>
<style scoped>
.itemLight {
  background-color: #f8f9fa;
  border-color: #f8f9fa;
  cursor: pointer;
}
.itemDark {
  background-color: #6c757d;
  border-color: #6c757d;
  cursor: pointer;
  color: white;
}
.choosePage {
  background-color: #04104a;
  border-color: #04104a;
  box-shadow: 0 2px 10px #04104a;
  cursor: pointer;
  color: white;
}

.iLight {
  font-size: 20px;
  color: #04104a;
}
.iDark {
  font-size: 20px;
  color: white;
}
</style>