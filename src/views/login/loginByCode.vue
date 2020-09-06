<template>
    <div>
        <div class="xkd-input-label">
            <span>+86</span>
            <input type="text" v-model="loginInfo.phone" class="xkd-input" placeholder="请输入手机号" />
        </div>
        <CodeInput type="login" v-model="loginInfo.smscode"></CodeInput>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import CodeInput from "@/components/codeInput.vue";

@Component({
    components: { CodeInput }
})
export default class LoginByPassword extends Vue {
    loginInfo = {
        phone: "",
        smscode: "",
    };
}
</script>

<style lang="less" scoped>
</style>