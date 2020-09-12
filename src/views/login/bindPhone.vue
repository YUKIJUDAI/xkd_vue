<template>
    <div class="login">
        <div class="wechat-info">
            <img src="" alt="">
            <p>微信昵称</p>
        </div>
        <div class="login-form">
            <LoginByCode ref="loginWayTemp"></LoginByCode>
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
                    <span class="blue">服务协议、隐私权限</span>
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
        const data = Object.assign(this.bindInfo, (this.$refs.loginWayTemp as any).loginInfo);
        const res: any = await this.$http.post("User/Register/bind", data);
        if (res.code === 200) {
            this.$router.push("/bind-status?type=1");
        } else {
            this.$router.push("/bind-status?type=0");
        }
    }
}
</script>

<style lang="less" scoped>
@import url("./login.less");
</style>