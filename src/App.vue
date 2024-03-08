<template>
  <div id="app">
    <div v-show="isAuthenticated">
      <NavBar />
    </div>
    <div class="d-flex" style="position: relative">
      <SideBar
        v-show="isAuthenticated"
        :class="backgroundColor == 'light' ? 'sidebarLight' : 'sidebarDark'"
        class="APPsidebarCSS"
        :style="'width :' + sidebarType + 'rem'"
      />
      <router-view
        class="mainViewPage"
        :class="
          backgroundColor == 'light' ? 'contentTypeLight' : 'contentTypeDark'
        "
        style="
          width: 100%;
          padding-top: 5rem;
          min-height: 100vh;
          padding-bottom: 3rem;
        "
        :style="'padding-left :' + sidebarType + 'rem'"
      />
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import { mapState } from "vuex";

export default {
  components: {
    NavBar,
    SideBar,
  },
  computed: {
    ...mapState(["sidebarType", "isAuthenticated", "backgroundColor"]),
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #04104a;
}
.APPsidebarCSS {
  position: absolute;
  top: 0%;
  left: 0;
  height: 100%;
}
</style>
