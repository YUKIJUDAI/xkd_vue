import axios from "axios";
import qs from "qs";
import { Toast } from "vant";

import { baseURL } from "../config/index";
import store from "../store/index";
import router from "../router/index";

// 创建新http
const http = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
});

// 请求发送前数据处理
http.interceptors.request.use(
    (config) => {
        config.headers.token = store.state.userInfo.token || "";
        if (config.headers["Content-Type"] !== "multipart/form-data") {
            config.data = qs.stringify(config.data);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 请求发送后数据处理
http.interceptors.response.use((response) => {
    if (response.data.code === 1202) {
        Toast("请先登录，2秒后跳转");
        setTimeout(() => {
            router.replace("/login");
        }, 2000);
        return;
    }
    return response.data;
});

export default http;
