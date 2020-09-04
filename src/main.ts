import { createApp } from "vue";

import App from "./App.vue";
import router from "@/router/index";
import store from "@/store/index";

import "@/assets/less/index.less";

createApp(App)
    .use(store)
    .use(router)
    .mount("#app");
