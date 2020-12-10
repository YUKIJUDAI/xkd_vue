<template>
    <div class="xkd-input-label">
        <span>验证码</span>
        <input type="text" v-model="smscode" class="xkd-input login-input" placeholder="请输入验证码" />
        <span class="xkd-input-label-code" @click="getCaptcha">
            {{isSending ? sendNumber : "获取验证码"}}
        </span>
        <van-dialog v-model="show" class="code-dialog" :show-confirm-button="false" closeOnClickOverlay>
            <div class="code-img">
                <img :src="codeImg" alt="" />
            </div>
            <div class="code-footer">
                <input type="text" v-model="captcha" class="code-input color999" placeholder="请输入图片验证码"/>
                <img src="~@/static/img/shuaxin.png" @click="getCaptcha" alt="" />
                <div class="xkd-btn-primary" @click="getCode">确认</div>
            </div>
        </van-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
import { timer, Subscription } from "rxjs";
import { Dialog } from 'vant';

import http from "@/utils/http";
import { phoneVerification } from "@/utils/utils";

@Component({
    components: { [Dialog.Component.name]: Dialog.Component }
})
export default class CodeInput extends Vue {
    @Prop()
    readonly phone!: string;
    @Prop()
    readonly type!: string;

    smscode: string = ""; // 短信验证码
    @Watch('smscode')
    smscodeWatch() {
        this.changeSmsCode();
    }
    captcha: string = ""; // 图片验证码
    isSending: boolean = false; // 是否在获取验证码中
    sendNumber: number = 60; // 倒计时数字
    show: boolean = false; // 是否显示验证码弹窗
    codeImg: string = ""; // 图片验证码
    // 倒计时定时器
    countdownTimer: Subscription | null = null;

    beforeDestroy() {
        this.countdownTimer && this.countdownTimer.unsubscribe();
    }

    @Emit("changeSmsCode")
    changeSmsCode() {
        return this.smscode;
    }

    // 获取短信验证码
    async getCode() {
        const res: any = await http.post("Other/sendsms", { phone: this.phone, captcha: this.captcha, type: this.type });
        if (res.code === 200) {
            this.isSending = true;
            this.show = false;
            this.$toast.success(res.msg);
            this.countdownTimer = timer(0, 1000).subscribe((val: number) => {
                const _val = 60 - val;
                if (_val === 0) {
                    (this.countdownTimer as Subscription).unsubscribe();
                    this.isSending = false;
                } else {
                    this.sendNumber = _val;
                }
            });
        } else {
            this.getCaptcha();
            this.$toast.fail(res.msg);
        }
    };

    // 获取图片验证码
    async getCaptcha() {
        if (!phoneVerification(this.phone)) {
            this.$toast.fail("手机号码格式不正确");
            return;
        }
        const res: any = await http.post("Other/captcha", { phone: this.phone, type: this.type, t: new Date().getTime() });
        if (typeof res === "string") {
            this.show = true;
            this.codeImg = res;
        } else {
            this.$toast.fail(res.msg);
        }
    };

}
</script>

<style lang="less" scoped>
@import url("./codeInput.less");
@import url("~@/views/login/login.less");
</style>