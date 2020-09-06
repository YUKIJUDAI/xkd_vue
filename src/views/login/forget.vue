<template>
    <div class="login">
        <div class="login-title">密码找回</div>
        <div class="login-form">
            <div class="xkd-input-label">
                <span>+86</span>
                <input type="text" v-model="loginInfo.phone" class="xkd-input" placeholder="请输入手机号" />
            </div>
            <CodeInput type="forget" v-model="loginInfo.smscode" :phone="loginInfo.phone"></CodeInput>
            <div class="xkd-input-label">
                <span>新密码</span>
                <input type="password" v-model="loginInfo.password" class="xkd-input" placeholder="请输入密码" />
            </div>
        </div>
        <div class="login-form">
            <div class="login-submit">
                <div class="xkd-btn-primary" @click="forget">
                    确定提交
                </div>
            </div>
        </div>
        <Back></Back>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CodeInput from "@/components/codeInput.vue";
import Back from "@/components/back.vue";

interface LoginInfo {
    phone: string; // 手机号
    smscode: string; // 验证码
    password: string; // 密码
}

@Component({
    components: { CodeInput, Back }
})
export default class extends Vue {
    loginInfo: LoginInfo = { phone: "", smscode: "", password: "" };

    forget = async () => {
        const res: any = await this.$http.post("User/Forget/index", this.loginInfo);
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