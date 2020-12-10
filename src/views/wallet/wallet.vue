<template>
    <div class="wallet">
        <div class="wallet-head">
            <p class="font16 color666">可提现余额（元）</p>
            <div class="flexsb">
                <h1 class="color333">{{incomeInfo.money_over}}</h1>
                <div class="xkd-btn-primary" @click="toWithdraw">申请提现</div>
            </div>
        </div>
        <div class="wallet-main">
            <van-grid :column-num="3">
                <van-grid-item>
                    <p class="font16 color333">{{incomeInfo.money_income_total}}</p>
                    <p class="font12 color666">总收益（元）</p>
                </van-grid-item>
                <van-grid-item>
                    <p class="font16 color333">{{incomeInfo.money_income_total}}</p>
                    <p class="font12 color666">本月CPM总收益</p>
                </van-grid-item>
                <van-grid-item>
                    <p class="font16 color333">{{incomeInfo.money_wait_income_one_month}}</p>
                    <p class="font12 color666">本月CPM待结算</p>
                </van-grid-item>
                <van-grid-item>
                    <p class="font16 color333">{{incomeInfo.integral}}</p>
                    <p class="font12 color666">总积分</p>
                </van-grid-item>
                <van-grid-item>
                    <p class="font16 color333">{{incomeInfo.money_income_two_month}}</p>
                    <p class="font12 color666">上月CPM总收益</p>
                </van-grid-item>
                <van-grid-item>
                    <p class="font16 color333">{{incomeInfo.money_wait_income_two_month}}</p>
                    <p class="font12 color666">上月CPM待结算</p>
                </van-grid-item>
            </van-grid>
        </div>
        <div class="wallet-list">
            <van-cell-group>
                <van-cell is-link title="收益记录" to="/revenueRecord" />
                <van-cell is-link title="提现记录" to="/withdrawalsRecord" />
                <van-cell is-link :title="'实名认证（' + ['未绑定','审核中','已绑定','未通过'][userInfo.is_card]+'）'" @click="toVerified" />
                <van-cell is-link :title="'支付宝（' + ['未绑定','审核中','已绑定','未通过'][userInfo.is_alipay]+'）'" @click="toAlipay" />
            </van-cell-group>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {

    // 用户信息
    userInfo: { [propsName: string]: any } = {};
    // 账户信息
    incomeInfo: { [propsName: string]: any } = {};

    created() {
        this.getUserInfo();
        this.getIcomeInfo();
    }

    // 获取用户信息
    async getUserInfo() {
        const res: any = await this.$http.post("/user/getUserInfo");
        res.code === 200 && (this.userInfo = res.result);
    }

    // 获取账户信息
    async getIcomeInfo() {
        const res: any = await this.$http.post("/user/Wallet/getMonthIncome");
        res.code === 200 && (this.incomeInfo = res.result);
    }

    toVerified() {
        if (this.userInfo.is_card === 0) {
            this.$router.push("/verified");
        } else if (this.userInfo.is_card === 2) {
            this.$router.push("/bind-status/1");
        } else if (this.userInfo.is_card === 3) {
            this.$router.push("/bind-status/0");
        }
    }

    toAlipay() {
        if (this.userInfo.is_alipay === 0 || this.userInfo.is_alipay === 2) {
            this.$router.push("/alipay");
        } else if (this.userInfo.is_card === 3) {
            this.$router.push("/bind-status/0");
        }
    }

    toWithdraw() {
        if (this.userInfo.is_card !== 2) this.$toast.fail("请先绑定身份证");
        if (this.userInfo.is_alipay !== 2) this.$toast.fail("请先绑定支付宝");
        else this.$router.push("/withdraw");
    }


}
</script>

<style lang="less" scoped>
@import url("./wallet.less");
</style>