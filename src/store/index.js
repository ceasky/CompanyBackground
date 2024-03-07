import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: "",
      isAdmin: false,
    },

    token: "",
    isAuthenticated: false,
    sidebarType: "15",
    backgroundColor: localStorage.getItem("backgroundColor")||"light",
    currentRoute: "",
  },
  getters: {},
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser,
      };
      state.token = localStorage.getItem("token");
      state.isAuthenticated = true;
    },
    setSidebarType(state, type) {
      if (type == "100") {
        if (state.sidebarType == "15") {
          state.sidebarType = "5";
        } else {
          state.sidebarType = "15";
        }
      } else {
        state.sidebarType = type;
      }
    },
    setbackgroundColor(state) {
      if (state.backgroundColor == "dark") {
        state.backgroundColor = "light";
        localStorage.setItem("backgroundColor", "light");
      } else {
        state.backgroundColor = "dark";
        localStorage.setItem("backgroundColor", "dark");
      }
    },
    setCurrentRoute(state, currentRoute) {
      state.currentRoute = currentRoute;
    },
    revokeAuthentication(state) {
      state.currentUser = {};
      state.isAuthenticated = false;
      state.token = "";
      localStorage.removeItem("token");
    },
  },
  actions: {
    fetchCurrentUser() {
      //call api get user data
      let dummyuser = {
        id: 30,
        name: "sky",
        isAdmin: true,
      };

      this.commit("setCurrentUser", dummyuser);
      return true;
    },
    // async fetchCurrentUser({ commit }) {
    //   try {
    //     const { data } = await usersAPI.getCurrentUser();
    //     const { id, name, email, image, isAdmin } = data;

    //     commit("setCurrentUser", {
    //       id,
    //       name,
    //       email,
    //       image,
    //       isAdmin,
    //     });
    //     return true;
    //   } catch (error) {
    // commit('revokeAuthentication')

    //     return false;
    //   }
    // },
  },
  modules: {},
});
