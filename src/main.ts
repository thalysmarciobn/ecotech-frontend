import { createApp } from "vue";
import App from "./App.vue";
import VueCookies from "vue-cookies";
import store from "./store";
import router from "./router/index";
import BootstrapVue3 from "bootstrap-vue-3";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";

createApp(App)
  .use(store)
  .provide("$store", store)
  .use(router)
  .use(BootstrapVue3)
  .use(VueCookies)
  .mount("#app");
