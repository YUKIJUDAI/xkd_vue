<template>
    <div class="xkd-input-label">
        <span>验证码</span>
        <input type="text" v-model="value" class="xkd-input login-input" placeholder="请输入验证码" />
        <span class="xkd-input-label-code" @Click="getCaptcha">
            {{isSending ? sendNumber : "获取验证码"}}
        </span>
        <Dialog v-model="show" class="code-dialog">
            <div class="code-img">
                <img :src="codeImg" alt="" />
            </div>
            <div class="code-footer">
                <input type="text" v-model="captcha" class="code-input" placeholder="请输入图片验证码" />
                <img src="~@/static/img/shuaxin.png" @Click="getCaptcha" alt="" />
                <div class="xkd-btn-primary" @click="getCode">确认</div>
            </div>
        </Dialog>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { timer, Subscription } from "rxjs";
import { Dialog, Toast } from 'vant';

import http from "@/utils/http";
import { phoneVerification } from "@/utils/utils";

@Options({
    components: {
        [Dialog.Component.name]: Dialog.Component,
    },
    props: ["phone", "type"]
})
export default class CodeInput extends Vue {

    smscode: string = ""; // 短信验证码
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

    // 获取短信验证码
    getCode = async () => {
        const res: any = await http.post("Other/sendsms", { phone: this.phone, captcha: this.captcha, type: this.type });
        if (res.code === 200) {
            this.isSending = true;
            this.show = true;
            Toast.success(res.msg);
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
            Toast.fail(res.msg);
        }
    };

    // 获取图片验证码
    getCaptcha = async () => {
        if (!phoneVerification(this.phone)) {
            Toast.fail("手机号码格式不正确");
            return;
        }
        const res: any = await http.post("Other/captcha", { phone: this.phone, type: this.type, t: new Date().getTime() });
        typeof res === "string" ? (this.show = true, this.codeImg = res) : Toast.fail(res.msg);
    };

}
</script>

<style lang="less" scoped>
</style>