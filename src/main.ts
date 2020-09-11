import Vue from "vue";
import VueAwesomeSwiper from "vue-awesome-swiper";
import { Toast, Dialog, Tab, Tabs, PullRefresh, Swipe, SwipeItem, Tabbar, TabbarItem, List, Uploader, Search } from "vant";

import App from "./App.vue";
import router from "@/router/index";
import store from "@/store/index";
import http from "@/utils/http";
import filter from "@/filter/index";

import "swiper/swiper-bundle.css";
import "@/assets/less/index.less";

declare module "vue/types/vue" {
    interface Vue {
        $http: any;
        $toast: Toast;
    }
}

Object.keys(filter).map((item: string) => {
    Vue.filter(item, filter[item as "changeDay"]);
});

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
Vue.use(Uploader);
Vue.use(Search);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
