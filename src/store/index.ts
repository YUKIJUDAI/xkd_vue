import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";

import { UserInfo } from "./store";

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
        },
    },
    mutations: {
        SET_USER_INFO: (state: any, o: UserInfo) => {
            state.userInfo = Object.assign({ ...state.userInfo }, o);
        },
    },
    plugins: [vuexLocal.plugin],
};

export default createStore(store);
