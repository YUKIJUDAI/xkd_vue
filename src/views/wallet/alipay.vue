<template>
    <div class="alipay">
        <div>
            <van-cell-group>
                <van-field v-model="data.account" label="支付宝账号" placeholder="支付宝账号" />
                <newCodeInput type="other" :phone="$store.state.userInfo.user_phone" @changeSmsCode="changeSmsCode"></newCodeInput>
                <van-field name="uploader" label="支付宝截图">
                    <template #input>
                        <uploader v-model="data.pic" :qnInfo="qnInfo" />
                        <van-image width="80" height="80" style="margin-top:-8px" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                    </template>
                </van-field>
            </van-cell-group>
            <div class="alipay-submit">
                <div class="xkd-btn-primary" @click="submit" v-show="userInfo.is_alipay === 0">提交审核</div>
                <div class="xkd-btn-primary" @click="submit" v-show="userInfo.is_alipay === 2">更新支付宝</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import newCodeInput from "@/components/newCodeInput.vue";
import qn from "@/mix/qn";
import uploader from "@/components/uploader.vue";

@Component({
    components: { newCodeInput, uploader }
})
export default class extends qn {

    data: { [propsName: string]: any } = { sex: "1" };
    userInfo: { [propsName: string]: any } = {};

    created() {
        this.getQnInfo();
        this.getUserInfo();
    }

    changeSmsCode(smscode: string) {
        this.data.smscode = smscode;
    }

    // 获取用户信息
    async getUserInfo() {
        const res: any = await this.$http.post("/user/getUserInfo");
        if (res.code === 200) {
            this.userInfo = res.result;
            if (res.result.is_card !== 2) {
                this.$toast.fail("请先完成实名认证");
            }
        }
    }

    async submit() {
        const res: any = await this.$http.post("/User/Wallet/alipay", this.data);
        if (res.code === 200) {
            this.$toast.success(res.msg);
            this.$router.push("/me");
        } else {
            this.$toast.fail(res.msg);
        }
    }

}
</script>

<style lang="less" scoped>
@import url("./alipay.less");
</style>