declare module "vue/types/vue" {
    interface Vue {
        $http: any;
        $toast: Toast;
    }
}

import Vue from "vue";
import VueAwesomeSwiper from "vue-awesome-swiper";
const vueMiniPlayer = require("vue-mini-player").default;
import { 
    Toast, Dialog, Tab, Tabs, PullRefresh, Swipe, 
    SwipeItem, Tabbar, TabbarItem, List, Uploader, 
    Search, Overlay, ActionSheet, Grid, GridItem, 
    Cell, CellGroup, Field, Radio, RadioGroup, Button, 
    Image as VanImage, NavBar, Popup, DatetimePicker ,
    Checkbox  
} from "vant";

import App from "./App.vue";
import router from "@/router/index";
import store from "@/store/index";
import http from "@/utils/http";
import filter from "@/filter/index";
import directive from "@/directive/index";

import "vue-mini-player/lib/vue-mini-player.css";
import "swiper/swiper-bundle.css";
import "@/assets/less/index.less";

Object.keys(filter).map((item: string) => {
    Vue.filter(item, filter[item as "changeDay"]);
});

Object.keys(directive).map((item: string) => {
    Vue.directive(item, directive[item as "longtap"]);
});

Vue.prototype.$http = http;

Vue.use(VueAwesomeSwiper);
Vue.use(require("vue-wechat-title"));
Vue.use(vueMiniPlayer);

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
Vue.use(Overlay);
Vue.use(ActionSheet);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Field);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Button);
Vue.use(VanImage);
Vue.use(NavBar);
Vue.use(Popup);
Vue.use(DatetimePicker);
Vue.use(Checkbox);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
