<template>
    <div class="commission">
        <div class="sum">
            <p class="tips">提现金额（收取{{handling}}元服务费）</p>
            <div class="sum_num">
                <em>¥</em>
                <van-field class="inputMoney" type="number" v-model="money" />
            </div>
            <p class="bototm_tips">
                <span>可提现余额 {{incomeInfo.money_over}}元</span>
                <span @click="showAll">全部提现</span>
            </p>
        </div>
        <div class="xkd-btn-primary" @click="showPopup">提现</div>
        <div class="explain">
            <p>
                <i></i>
                <span>提现说明</span>
            </p>
            <p class="colorRed">1.每日可提现一次，每次提现需大于等于50元，提现金额大于等于200元，不收取手续费，提现金额小于200元，收取{{handling}}元手续费。</p>
            <p>2.工作日提现次日打款，如遇节假日或国家法定假日，会在假日之后的第一个工作日进行打款。</p>
            <p>3.提现到账时间因不同银行处理时间不同，请以实际到账为准，默认会在1~5个工作日之内到账。</p>
            <p>4.每个用户每日提现上限50000万元（本金+佣金）。</p>
            <p>5.每次提现数小于200元，将收取{{handling}}元提现服务费。</p>
            <p>6.用户提现需要进行实名认证，未实名认证的用户无法提现。</p>
        </div>
        <van-popup class="van_popup" position="bottom" closeable @closed="closePop" v-model="show">
            <p>请输入支付金额</p>
            <p>到账金额</p>
            <div class="account">
                <i>¥</i>
                <span>{{account_money_data}}</span>
            </div>
            <div class="info">
                <div class="serve_charge">
                    <span>本次服务费</span>
                    <span>{{serve_charge_data}}元</span>
                </div>
                <newCodeInput type="other" :phone="$store.state.userInfo.user_phone" @changeSmsCode="changeSmsCode"></newCodeInput>
            </div>
            <div class="popBtn" @click="toWithdraw">提现</div>
        </van-popup>
    </div>
</template>

<script lang = "ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import newCodeInput from "@/components/newCodeInput.vue";
const BigNumber = require("bignumber.js");

@Component({
    components: { newCodeInput }
})
export default class extends Vue {
    isAll = false;
    show = false;
    handling = 0;
    money = 0;
    smscode = "";
    // 支付类型 1 支付宝
    type = 1;
    serve_charge_data: number | null = null;
    account_money_data: number | null = null;

    // 账户信息
    incomeInfo: { [propsName: string]: any } = {};

    @Watch("money")
    changeMoney(val: string | number, oldVal: string) {
        val = Math.floor(+val);
        this.serve_charge_data = this.handling;
        var a = new BigNumber(val);
        var b = new BigNumber(this.incomeInfo.money_over);
        this.account_money_data = b.minus(a) < +this.handling ? a.minus(this.serve_charge_data) : a;
    }

    created() {
        this.getIcomeInfo();
    };

    changeSmsCode(val: string) {
        this.smscode = val;
    }
    // 获取账户信息
    async getIcomeInfo() {
        const res: any = await this.$http.post("/user/Wallet/getMonthIncome");
        res.code === 200 && (this.incomeInfo = res.result);
    }
    showPopup() {
        if (this.isAll) {
            this.money = this.incomeInfo.money_over;
            this.isAll = false;
        }
        if (this.money && +this.money <= +this.incomeInfo.money_over && +this.money > 0) {
            this.show = true;
        } else if (/^(([^0][0-9]+|0)\.([0-9]{1,2}))$/.test(this.money + '')) {
            this.$toast.fail("请输入整数");
        } else {
            this.$toast.fail("请输入正确的提现金额");
        }
    };
    showAll() {
        this.isAll = true;
        this.showPopup();
    };
    async toWithdraw() {
        if (!this.smscode) {
            return this.$toast.fail("请输入提现密码");
        }
        const res: any = await this.$http.post("/User/Wallet/withdraw", { money: this.money, type: this.type, handling: this.handling, smscode: this.smscode });
        if (res.code === 200) {
            this.$toast.success(res.msg);
            this.$router.push("/wallet");
        } else {
            this.$toast.fail(res.msg);
        }
    };
    closePop() {
        this.smscode = "";
    };
};
</script>

<style lang='less' scoped>
@import url("./withdraw.less");
</style>
<style lang="less">
.commission .van-cell {
    padding: 0;
    border: 0;
}
</style>

