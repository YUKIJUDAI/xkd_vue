<template>
    <div class="message">
        <div class="message-tab">
            <van-tabs color="#333" title-active-color="#333">
                <van-tab title="本月收益排序">
                    <div class="message-tabs">
                        <IncomeStatementList :list="cpmIncomeRankingData.month"></IncomeStatementList>
                    </div>
                </van-tab>
                <van-tab title="昨日收益排序">
                    <div class="message-tabs">
                        <IncomeStatementList :list="cpmIncomeRankingData.yes"></IncomeStatementList>
                    </div>
                </van-tab>
                <van-tab title="总收益排序">
                    <div class="message-tabs">
                        <IncomeStatementList :list="cpmIncomeRankingData.all"></IncomeStatementList>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import IncomeStatementList from "./incomeStatementList.vue";

@Component({
    components: { IncomeStatementList }
})
export default class Message extends Vue {

    cpmIncomeRankingData: any = { all: [], month: [], yes: [] };

    created() {
        this.getCpmIncomeRanking();
    }
    // 获取数据
    async getCpmIncomeRanking() {
        const res: any = await this.$http.post("/User/Wallet/cpmIncomeRanking");
        if (res.code === 200) {
            this.cpmIncomeRankingData = res.result;
        }
    }

}
</script>

<style lang="less" scoped>
@import url("./incomeStatement.less");
</style>
