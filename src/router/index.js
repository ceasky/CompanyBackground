import Vue from "vue";
import VueRouter from "vue-router";
import store from "./../store";

import HomeView from "../views/HomeView.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import NotFound from "../views/NotFound.vue";

import DepartmentPage from "../views/UserModule/DepartmentPage.vue";
import UsersPage from "../views/UserModule/UsersPage.vue";
import ProjectManage from "../views/ProjectModule/ProjectManage.vue";
import ProjectRecord from "../views/ProjectModule/ProjectRecord.vue";
import perDayWorkHours from "../views/WorkRecord/perDayWorkHours.vue";
import ProjectWorkHours from "../views/WorkRecord/ProjectWorkHours.vue";
import CourseManage from "../views/CourseModule/CourseManage.vue";
import CourseRecord from "../views/CourseModule/CourseRecord.vue";
import AnnouncementForm from "../views/AnnouncementForm.vue";

import Group2Page1 from "../views/Group2/Group2Page1.vue";
import Group2Page2 from "../views/Group2/Group2Page2.vue";

//sample
import perModels from "../sample/perModels.vue";

Vue.use(VueRouter);

//perpage permission
// const authorizeIsAdmin = (to, from, next) => {
//   const currentUser = store.state.currentUser
//   if (currentUser && !currentUser.isAdmin) {
//     next('/404')
//     return
//   }

//   next()
//   // beforeEnter: authorizeIsAdmin
// }

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/signin",
    name: "sign-in",
    component: SignIn,
  },
  {
    path: "/signup",
    name: "sign-up",
    component: SignUp,
  },
  //userModule
  {
    path: "/DepartmentPage",
    name: "DepartmentPage",
    component: DepartmentPage,
  },
  {
    path: "/UsersPage",
    name: "UsersPage",
    component: UsersPage,
  },
  //projectModule
  {
    path: "/ProjectManage",
    name: "ProjectManage",
    component: ProjectManage,
  },
  {
    path: "/ProjectRecord",
    name: "ProjectRecord",
    component: ProjectRecord,
  },
  //workRecord
  {
    path: "/ProjectWorkHours",
    name: "ProjectWorkHours",
    component: ProjectWorkHours,
  },
  {
    path: "/perDayWorkHours",
    name: "perDayWorkHours",
    component: perDayWorkHours,
  },
  //CourseModule
  {
    path: "/CourseManage",
    name: "CourseManage",
    component: CourseManage,
  },
  {
    path: "/CourseRecord",
    name: "CourseRecord",
    component: CourseRecord,
  },
  //AnnouncementForm
  {
    path: "/AnnouncementForm",
    name: "AnnouncementForm",
    component: AnnouncementForm,
  },
  //group2
  {
    path: "/Group2Page1",
    name: "Group2Page1",
    component: Group2Page1,
  },
  {
    path: "/Group2Page2",
    name: "Group2Page2",
    component: Group2Page2,
  },
  //sample
  {
    path: "/perModels",
    name: "perModels",
    component: perModels,
  },
  //404
  {
    path: "*",
    name: "not-found",
    component: NotFound,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach(async (to, from, next) => {
  const tokenInLocalStorage = localStorage.getItem("token");
  const tokenInStore = store.state.token;

  let isAuthenticated = store.state.isAuthenticated;

  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    isAuthenticated = await store.dispatch("fetchCurrentUser");
  }
  // 對於不需要驗證 token 的頁面
  const pathsWithoutAuthentication = ["sign-up", "sign-in"];

  // 如果 token 無效且進入需要驗證的頁面則轉址到登入頁
  if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {
    next("/signin");
    return;
  }

  // 如果 token 有效且進入不需要驗證到頁面則轉址到餐廳首頁
  if (isAuthenticated && pathsWithoutAuthentication.includes(to.name)) {
    next("/");
    return;
  }
  store.commit("setCurrentRoute", to.name);
  next();
});

export default router;
