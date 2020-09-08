import Vue from "vue";
import VueAwesomeSwiper from "vue-awesome-swiper";
import { Toast, Dialog, Tab, Tabs, PullRefresh, Swipe, SwipeItem, Tabbar, TabbarItem, List } from "vant";

import App from "./App.vue";
import router from "@/router/index";
import store from "@/store/index";
import http from "@/utils/http";

import "swiper/swiper-bundle.css";
import "@/assets/less/index.less";

declare module "vue/types/vue" {
    interface Vue {
        $http: any;
        $toast: Toast;
    }
}

Vue.prototype.$http = http;

Vue.use(VueAwesomeSwiper);

Vue.use(Toast);
Vue.use(Dialog);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(PullRefresh);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(List);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
