<template>
    <div>
        <div className="xkd-input-label">
            <span>+86</span>
            <input type="text" v-model="loginInfo.phone" className="xkd-input" placeholder="请输入手机号" />
        </div>
        <CodeInput type="login" v-model="logininfo.smscode"></CodeInput>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

export default class LoginByPassword extends Vue {
    loginInfo = {
        phone: "",
        smscode: ""
    }
}
</script>

<style lang="less" scoped>
</style>