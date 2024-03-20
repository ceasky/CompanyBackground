<template>
  <div
    class="navbar fixed-top navbar-light bg-light shadowBox"
    :class="
      backgroundColor == 'dark'
        ? 'navbar-dark bg-dark shadowBoxDark'
        : 'navbar-light bg-light shadowBoxLight'
    "
  >
    <div style="width: 100%" class="d-flex justify-content-between">
      <div class="d-flex align-items-center" style="position: relative">
        <div class="d-flex">
          <button
            type="button"
            :disabled="windowWidth <= 992"
            class="btn"
            style="background-color: transparent; border-color: transparent"
            @click="setSidebarType()"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="d-flex align-items-center" v-if="sidebarType == '18'">
            <span
              :class="
                backgroundColor == 'dark' ? 'fontColorDark' : 'fontColorLight'
              "
              style="font-size: 1.5rem"
              >JanuaryTC</span
            >
          </div>
        </div>
        <div
          class="d-flex"
          style="position: absolute; width: 30rem"
          :style="sidebarType == '18' ? 'left:17rem' : 'left:4rem'"
        >
          <div class="d-flex align-items-center mr-2">
            <span
              @click="setbackgroundColor()"
              v-show="backgroundColor == 'dark'"
              class="material-symbols-outlined fontColorDark"
              style="cursor: pointer"
            >
              light_mode
            </span>
            <span
              @click="setbackgroundColor()"
              v-show="backgroundColor == 'light'"
              class="material-symbols-outlined fontColorLight"
              style="cursor: pointer"
            >
              dark_mode
            </span>
          </div>
          <div class="d-flex">
            <div
              :class="
                backgroundColor == 'dark' ? 'fontColorDark' : 'fontColorLight'
              "
              style="font-size: 1.6rem"
            >
              {{ currentRouteTitle }}
            </div>
            <div class="d-flex align-items-end ml-3 mb-1">
              <i class="fontColorGroup">{{ pageGroup }}</i>
              <i
                :class="
                  backgroundColor == 'dark' ? 'fontColorDark' : 'fontColorLight'
                "
                style="margin-right: 0.5rem; margin-left: 0.5rem"
                >></i
              >
              <i
                :class="
                  backgroundColor == 'dark' ? 'fontColorDark' : 'fontColorLight'
                "
                >{{ currentRouteTitle }}</i
              >
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex" style="position: relative">
        <div class="ml-auto d-flex align-items-center">
          <div
            :class="
              backgroundColor == 'dark' ? 'fontColorDark' : 'fontColorLight'
            "
            style="font-size: 1.5rem; cursor: pointer"
          >
            Hi! {{ currentUser.name || "使用者" }}
          </div>
        </div>
        <div>
          <button
            type="button"
            class="btn my-2 my-sm-0"
            style="background-color: transparent; border-color: transparent"
            @click="showuseroption()"
          >
            <i
              :class="
                backgroundColor == 'dark' ? 'fontColorDark' : 'fontColorLight'
              "
              class="fa-solid fa-user"
              style="font-size: 20px; cursor: pointer"
            ></i>
          </button>
        </div>
        <!-- user list -->
        <div
          v-if="useroption"
          @mouseleave="closeuseroption()"
          class="useroption"
        >
          <ul style="padding: 0; margin: 0.5rem auto">
            <li>修改密碼</li>
            <li @click="logout()">登出</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import sidebarContent from "../utils/sidebar.js";
export default {
  // Vue 會在沒有資料時使用此預設值
  data() {
    return {
      useroption: false,
      sidebarContent: null,
      windowWidth: window.innerWidth,
      pageGroup: "",
      currentRouteTitle: "",
    };
  },
  methods: {
    showuseroption() {
      this.useroption = !this.useroption;
    },
    closeuseroption() {
      this.useroption = false;
    },
    setSidebarType() {
      if (this.windowWidth > 992) {
        this.$store.commit("setSidebarType", "100");
      }
    },
    logout() {
      this.$store.commit("revokeAuthentication");
      this.$router.push("/signin");
    },
    setbackgroundColor() {
      this.$store.commit("setbackgroundColor");
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
  },
  computed: {
    ...mapState([
      "currentRoute",
      "currentUser",
      "backgroundColor",
      "sidebarType",
    ]),
    isMobile() {
      return this.windowWidth < 992;
    },
  },
  watch: {
    isMobile(e) {
      if (e) {
        this.$store.commit("setSidebarType", "5");
      } else {
        this.$store.commit("setSidebarType", "18");
      }
    },
    currentRoute() {
      for (var index in this.sidebarContent) {
        let data = this.sidebarContent[index];
        if (data.children) {
          for (var idx in data.children) {
            if (data.children[idx].route == this.currentRoute) {
              this.pageGroup = data.title;
              this.currentRouteTitle = data.children[idx].title;
              return;
            }
          }
        } else {
          this.pageGroup = data.title;
          this.currentRouteTitle = data.title;
        }
      }
    },
  },
  mounted() {
    // 監聽窗口大小的改變
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    // 在組件被銷毀之前移除窗口大小改變的監聽器
    window.removeEventListener("resize", this.handleResize);
  },
  created() {
    this.sidebarContent = sidebarContent;
    console.log("this.sidebarContent", this.sidebarContent);
    if (this.windowWidth < 992) {
      this.$store.commit("setSidebarType", "5");
    } else {
      this.$store.commit("setSidebarType", "18");
    }
  },
};
</script>
<style scoped>
.useroption {
  position: absolute;
  top: 120%;
  left: 0;
  color: white;
  border-radius: 5px;
  width: 95%;
  background-color: #6c757d;
}
.useroption li {
  list-style: none;
  text-align: left;
  padding-left: 1rem;
  padding-top: 0.2rem;
  cursor: pointer;
}
.shadowBoxDark {
  box-shadow: 0 5px 5px 0px #212529;
}
.shadowBoxLight {
  box-shadow: 0 5px 5px 0px #cccccc;
}
li {
  margin-bottom: 0.5rem;
}
.fontColorLight {
  color: #04104a;
}
.fontColorDark {
  color: white;
}
.fontColorGroup {
  color: #868e96;
}
</style>