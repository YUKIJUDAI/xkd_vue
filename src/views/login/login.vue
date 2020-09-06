<template>
    <div class="login">
        <div class="xkd-tab login-tab">
            <p :class="{'active': loginWay === 0}" @click="changeLoginWay(0)">
                密码登录
            </p>
            <p :class="{'active': loginWay === 1}" @click="changeLoginWay(1)">
                短信登录
            </p>
        </div>
        <div class="login-form">
            <component :is="loginWayTemp" ref="loginWayTemp"></component>
            <div class="login-submit">
                <div class="xkd-btn-primary" @click="login">登录</div>
            </div>
            <div class="login-other clearfix">
                <p class="fl">
                    还没有注册？
                    <router-link to="/registered" class="blue">去注册</router-link>
                </p>
                <p class="fr">
                    <router-link to="/forget" class="blue">忘记密码</router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import LoginByPassword from "./loginByPassword.vue";
import LoginByCode from "./loginByCode.vue";


interface LoginInfo { phone: string; password?: string; smscode?: string; }

@Component({
    components: { LoginByPassword, LoginByCode }
})
export default class Login extends Vue {
    loginWay: 0 | 1 = 0; // 登录方式  0密码登录  1短信登录

    loginWayTemp: any = 'LoginByPassword'; //登录模板

    // 修改登录方式
    changeLoginWay(loginWay: 0 | 1) {
        this.loginWay = loginWay;
        this.loginWayTemp = ["LoginByPassword", "LoginByCode"][loginWay];
    };

    // 登录
    login = async () => {
        const url = ["User/Login/pwd", "User/Login/sms",][this.loginWay];
        const res: any = await this.$http.post(url, (this.$refs.loginWayTemp as any).loginInfo);

        if (res.code === 200) {
            this.$toast.success(res.msg);
            // setToken(res.result);
            this.$router.push("/");
        } else {
            this.$toast.fail(res.msg);
        }
    };

}
</script>


<style lang="less" scoped>
@import url("./login.less");
</style>