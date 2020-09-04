<template>
    <div>
        <div class="xkd-input-label">
            <span>+86</span>
            <input type="text" v-model="loginInfo.phone" class="xkd-input" placeholder="请输入手机号" />
        </div>
        <div class="xkd-input-label">
            <span>密码</span>
            <input type="password" v-model="loginInfo.password" class="xkd-input" placeholder="请输入密码" />
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

export default class LoginByPassword extends Vue {
    loginInfo = {
        phone: "",
        password: ""
    }
}
</script>

<style lang="less" scoped>
</style>