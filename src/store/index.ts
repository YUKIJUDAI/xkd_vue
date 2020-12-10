import vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

import { UserInfo } from "./store";
import router from "@/router/index";

vue.use(Vuex);

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
});

const store = {
    state: {
        userInfo: {
            token: "", // token
            user_code: "", // 邀请码
            user_id: "", // 用户ID
            user_level: "", // 用户等级
            user_phone: "", // 用户手机
            user_referrer_id: "", // 用户上级ID
            over_time: 0, // 超时时间
            nickname: "", // 微信名称
            headimgurl: "", // 微信头像
        },
    },
    mutations: {
        SET_USER_INFO: (state: any, o: UserInfo) => {
            state.userInfo = Object.assign({ ...state.userInfo }, o);
        },
        REMOVE_USER_INFO: (state: any) => {
            state.userInfo = {};
        },
    },
    plugins: [vuexLocal.plugin],
};

export default new Vuex.Store(store);
