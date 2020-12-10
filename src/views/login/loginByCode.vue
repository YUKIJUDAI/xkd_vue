<template>
    <div>
        <div class="xkd-input-label">
            <span>+86</span>
            <input type="text" v-model="loginInfo.phone" class="xkd-input" placeholder="请输入手机号" />
        </div>
        <CodeInput :type="type" :phone="loginInfo.phone" @changeSmsCode="changeSmsCode"></CodeInput>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import CodeInput from "@/components/codeInput.vue";

@Component({
    components: { CodeInput }
})
export default class LoginByPassword extends Vue {

    @Prop()
    readonly type!: string;

    loginInfo = {
        phone: "",
        smscode: "",
    };
    changeSmsCode(val: string) {
        this.loginInfo.smscode = val;
    }
}
</script>

<style lang="less" scoped>
</style>