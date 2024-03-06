import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from  'bootstrap-vue'

// 導入 Bootstrap 和 BootstrapVue CSS 檔案（順序很重要）
import  'bootstrap/dist/css/bootstrap.css'
import  'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store'
import './assets/style.css'
Vue.config.productionTip = false
Vue.use(BootstrapVue) // 可選擇安裝 BootstrapVue 圖示元件外掛程式
Vue.use(IconsPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
