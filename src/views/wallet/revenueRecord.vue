<template>
    <div class="revenueRecord">
        <div class="revenueRecord-title">
            <p @click="show = true">{{date | changeDay("YYYY-MM")}}<span class="down"></span></p>
            <p><span class="font16 color333"> +{{total}}</span></p>
        </div>
        <div class="revenueRecord-tab">
            <div class="revenueRecord-tabs">
                <van-list v-model="isLoading" :finished="finished" success-text="刷新成功" @load="onLoad">
                    <div class="messages" v-for="(item,i) in list" :key="i">
                        <div class="messages-left">
                            <p class="font16">CPM收益</p>
                            <p class="color999" style="margin-top:0.1rem">{{item.day | changeDay('MM-DD HH:mm')}}</p>
                        </div>
                        <div class="messages-right">
                            <p class="font16" style="color:#f8dfae">+{{item.money}}</p>
                        </div>
                    </div>
                </van-list>
                <van-popup round v-model="show" position="bottom" :style="{ height: '30%' }">
                    <van-datetime-picker v-model="currentDate" :visible-item-count="3" type="year-month" title="选择年月" @confirm="confirm" @cancel="show = false" />
                </van-popup>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import dayjs from "dayjs";

@Component
export default class revenueRecord extends Vue {
    list: Array<{ [propsName: string]: any }> = [];
    finished: boolean = false; // 结束
    isLoading: boolean = false; // 是否加载中

    currentDate: Date | null = null;
    date: number = new Date().getTime() / 1000;
    show: boolean = false;
    total: string = "";

    created() {
        this.onLoad();
    }

    confirm() {
        this.show = false;
        if (!this.currentDate) return;
        this.date = this.currentDate.getTime() / 1000;
    }

    async onLoad() {
        const currentDate = this.currentDate ? this.currentDate : new Date();
        const year: number = dayjs(currentDate).year();
        const month: number = dayjs(currentDate).month();
        const start: number = new Date(year, month, 1).getTime() / 1000;
        this.isLoading = true;
        const res: any = await this.$http.post("/User/Wallet/cpmIncomeDetail", { start });
        this.isLoading = false;
        if (res.code === 200) {
            this.list = res.result.lists;
            this.total = res.result.total;
            this.finished = true;
        }
    }

}
</script>

<style lang="less" scoped>
@import url("./revenueRecord.less");
</style>
