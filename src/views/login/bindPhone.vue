<template>
    <div class="login">
        <div class="wechat-info">
            <img :src="$store.state.userInfo.headimgurl" alt="">
            <p>{{$store.state.userInfo.nickname}}</p>
        </div>
        <div class="login-form">
            <LoginByCode ref="loginWayTemp" type="bind"></LoginByCode>
        </div>
        <div class="login-form">
            <div class="login-submit">
                <div class="xkd-btn-primary" @click="bindPhone">
                    绑定
                </div>
            </div>
            <div class="login-other">
                <p>
                    注册即表示同意平台
                    <span class="blue"><router-link tag="a" to="/single/2" class="blue">服务协议</router-link>、<router-link tag="a" to="/single/3" class="blue">隐私权限</router-link></span>
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { component } from 'vue/types/umd';
import LoginByCode from "./loginByCode.vue";

@Component({
    components: { LoginByCode }
})
export default class BindPhone extends Vue {

    bindInfo: { [PropsName: string]: any } = { phone: "", openid: "", smscode: "", invitecode: "" };

    // 绑定手机
    async bindPhone() {
        const data = Object.assign(this.bindInfo, (this.$refs.loginWayTemp as any).loginInfo, { openid: this.$route.query.key, invitecode: this.$route.query.invitecode || 0 });
        const res: any = await this.$http.post("User/Register/bind", data);
        if (res.code === 200) {
            this.$store.commit("SET_USER_INFO", res.result);
            this.$toast.success(res.msg);
            this.$router.push("/");
        } else {
            this.$toast.fail(res.msg);
        }
    }
}
</script>

<style lang="less" scoped>
@import url("./login.less");
</style>