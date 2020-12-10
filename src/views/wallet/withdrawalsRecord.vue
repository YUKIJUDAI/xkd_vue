<template>
    <div class="withdrawalsRecord">
        <div class="withdrawalsRecord-title">
            <p>已提现总额</p>
            <p>{{incomeInfo.money_withdraw_total}}</p>
        </div>
        <div class="withdrawalsRecord-tab">
            <div class="withdrawalsRecord-tabs">
                <van-list v-model="isLoading" :finished="finished" success-text="刷新成功" @load="onLoad">
                    <div class="messages clearfix" v-for="(item,i) in list" :key="i" @click="$router.push('/message/detail/' + item.id)">
                        <div class="messages-left fl">
                            <p>{{item.create_time | changeDay('MM-DD HH:mm')}}</p>
                        </div>
                        <div class="messages-center fl">
                            您的银行卡有误
                        </div>
                        <div class="messages-right fr">
                            <p>{{item.money}}元</p>
                            <p :style="{color:['','#e5a8a6','#939393','red'][+item.status]}">{{["","提现中","已到账","已驳回"][+item.status]}}</p>
                        </div>
                    </div>
                </van-list>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class withdrawalsRecord extends Vue {
    list: Array<{ [propsName: string]: any }> = [];
    page: number = 1; // 分页
    finished: boolean = false; // 结束
    isLoading: boolean = false; // 是否加载中

    // 账户信息
    incomeInfo: { [propsName: string]: any } = {};

    created() {
        this.onLoad();
        this.getIcomeInfo();
    }

    // 获取账户信息
    async getIcomeInfo() {
        const res: any = await this.$http.post("/user/Wallet/getMonthIncome");
        res.code === 200 && (this.incomeInfo = res.result);
    }

    async onLoad() {
        this.isLoading = true;
        const res: any = await this.$http.post("/User/Wallet/withdrawLists", { page: this.page });
        this.isLoading = false;
        if (res.code === 200) {
            if (this.page === 1) {
                this.list = res.result.list;
            } else {
                this.list = [...this.list, ...res.result.list];
            }
            if (this.list < res.result.total) {
                this.page++;
            } else {
                this.finished = true;
            }
        }
    }

}
</script>

<style lang="less" scoped>
@import url("./withdrawalsRecord.less");
</style>
