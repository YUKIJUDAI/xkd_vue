<template>
    <div class="login">
        <div class="login-title">新用户注册</div>
        <div class="login-form">
            <div class="xkd-input-label">
                <span>+86</span>
                <input type="text" v-model="loginInfo.phone" class="xkd-input" placeholder="请输入手机号" />
            </div>
            <div class="xkd-input-label">
                <span>密码</span>
                <input type="password" v-model="loginInfo.password" class="xkd-input" placeholder="请输入密码" />
            </div>
            <CodeInput type="reg" v-model="loginInfo.smscode" :phone="loginInfo.phone"></CodeInput>
            <div class="xkd-input-label">
                <span>邀请码</span>
                <input type="text" v-model="loginInfo.invitecode" class="xkd-input" placeholder="请输入邀请码（选填）" />
            </div>
        </div>
        <div class="login-form">
            <div class="login-submit">
                <div class="xkd-btn-primary" @click="registered">
                    注册
                </div>
            </div>
            <div class="login-other">
                <p>
                    注册即表示同意平台
                    <span class="blue">服务协议、隐私权限</span>
                </p>
            </div>
        </div>
        <Back></Back>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CodeInput from "@/components/codeInput.vue";
import Back from "@/components/back.vue";

interface LoginInfo {
    phone: string; // 手机号
    smscode: string; // 验证码
    password: string; // 密码
    invitecode?: string; // 邀请码
}

@Component({
    components: { CodeInput, Back }
})
export default class Reistered extends Vue {

    loginInfo: LoginInfo = { phone: "", smscode: "", password: "", invitecode: "" };
    // 点击注册
    async registered() {
        const res: any = await this.$http.post("User/Register/index", this.loginInfo);
        if (res.code === 200) {
            this.$toast.success(res.msg);
            this.$router.push("/login");
        } else {
            this.$toast.fail(res.msg);
        }
    };
}
</script>

<style lang="less" scoped>
@import url("./login.less");
</style>
