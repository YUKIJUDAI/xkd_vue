<template>
    <div class="signin">
        <div class="signin-top">
            <div class="rule" @click="showRule">签到规则</div>
            <p>累计已获得{{total_lottery_num}}积分</p>
            <div class="signin-panel">
                <ul>
                    <li v-for="(item,i) in sign_detail" :key="i" :class="{ 'double' : i === 6 }">
                        <div class="signin-panel-li">
                            <img src="@/static/img/signin-check.png" class="checked" v-show="item.is_sign === 1"></img>
                            <p>{{ item.is_sign === 0 ? dayArr[i] : '已领取'}}</p>
                            <div :class="{ mask:(i < +day - 1 || (i  === +day - 1 && is_sign === 1)) }">
                                <img src="@/static/img/double-gold.png" alt="" v-if="i === 6">
                                <img src="@/static/img/gold.png" alt="" v-else>
                                <span>+{{item.number}}金币</span>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="sign-in" @click="sign">立即签到</div>
            </div>
            <div class="signin-integral">
                <div class="lottery">
                    <p>积分抽奖</p>
                    <span>敬请期待</span>
                </div>
                <div class="mall">
                    <p>积分商城</p>
                    <span>敬请期待</span>
                </div>
            </div>
        </div>
        <div class="more">更多推广</div>
        <div style="height:0.2rem"></div>
        <Goods sort="1" keyword="" tag="0" class="signin-goods"></Goods>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Goods from "@/views/application/goods.vue";

@Component({
    components: { Goods }
})
export default class signin extends Vue {

    is_sign: 0 | 1 = 0; // 是否已签到
    sign_detail: Array<{ [propsName: string]: any }> = [];
    day: number = 0;
    total_lottery_num: number = 0; //累计积分
    dayArr = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期天"]

    created() {
        this.getSign();
    }

    // 签到
    async sign() {
        if (this.is_sign === 0) {
            const res: any = await this.$http.post("user/sign/sign");
            if (res.code === 200) {
                this.$toast.success(res.msg);
                this.getSign();
            } else {
                this.$toast.fail(res.msg);
            }
        }
    }

    // 获取签到信息
    async getSign() {
        const res: any = await this.$http.post("/user/sign/index");
        if (res.code === 200) {
            this.is_sign = res.result.is_sign;
            this.sign_detail = res.result.sign_detail;
            this.day = res.result.day;
            this.total_lottery_num = res.result.total_lottery_num;
        }
    }

    // 查看规则
    showRule() {
        this.$dialog.alert({
            title: "签到规则",
            message: '1.每日签到可以获得日签奖励，在单个周期内连续签到可以获得连签奖励，同1个周期内最多可领取1次;\n 2.每日最多可签到1次，断签则会重新计算连签天数; \n3.活动以及奖励最终解释权归商家所有。',
            messageAlign: "left",
            theme: 'round-button',
            showCancelButton: true,
            confirmButtonColor: "#FCD000",
            cancelButtonColor: "#eee"
        }).then();
    }

}
</script>

<style lang="less" scoped>
@import url("./signin.less");
</style>