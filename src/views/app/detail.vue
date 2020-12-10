<template>
    <div class="app-detail">
        <div class="app-detail-head">
            <div class="app-detail-head-left">
                <img :src="appDetail.app_img | qnImg" alt="" />
            </div>
            <div class="app-detail-head-center">
                <p>{{appDetail.app_name}}</p>
                <p>
                    已有{{appDetail.people}}人推广
                </p>
            </div>
            <div class="app-detail-head-right" @click="createQRCode(appDetail.url)">
                <div class="xkd-btn-download">推广</div>
            </div>
        </div>
        <div class="app-detail-main">
            <p class="app-content color666">{{appDetail.app_description}}</p>
            <div class="xkd-title">产品推荐</div>
            <GoodsList ref="goodsList"></GoodsList>
        </div>
        <div class="app-income">
            <van-popup round v-model="show" position="bottom" :style="{ height: '30%' }">
                <van-datetime-picker v-model="currentDate" :visible-item-count="3" type="year-month" title="选择年月" @confirm="confirm" @cancel="show = false" />
            </van-popup>
            <div class="app-h"></div>
            <div class="app-data">
                <div class="xkd-title">个人收益
                    <img class="reload" src="~@/static/img/reload.png"></img>
                </div>
                <div class="app-date">
                    <p @click="show = true">{{date | changeDay("YYYY-MM")}}<span class="down"></span></p>
                </div>
                <div class="app-table">
                    <div class="app-title">今日CPM收益<i class="help"></i></div>
                    <van-grid :column-num="2" :border="false">
                        <van-grid-item>
                            <p class="font16 color333">{{today_price === 0 ? '待统计' : today_price}}</p>
                            <p class="font12 color666">本日预估收益</p>
                        </van-grid-item>
                        <van-grid-item>
                            <p class="font16 color333">{{ total_price }}</p>
                            <p class="font12 color666">本月收益</p>
                        </van-grid-item>
                        <van-grid-item>
                            <p class="font16 color333">{{ avg_price }}</p>
                            <p class="font12 color666">本月预估eCPM</p>
                        </van-grid-item>
                        <van-grid-item>
                            <p class="font16 color333">{{ yes_price === 0 ? '计算中' : yes_price }}</p>
                            <p class="font12 color666">昨日eCPM</p>
                        </van-grid-item>
                    </van-grid>
                </div>
            </div>
            <div class="app-h"></div>
            <div class="app-chart">
                <charts v-model="chartsNum" title="本月收益走势" :data="app_price" :date="days"></charts>
            </div>
            <div class="app-h"></div>
            <div class="app-chart">
                <charts v-model="chartsNum" title="本月访问" :data="visit" :date="days"></charts>
            </div>
            <div class="app-h"></div>
            <div class="app-chart">
                <charts v-model="chartsNum" title="本月eCPM走势" :data="ecmp_price" :date="days"></charts>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import dayjs from "dayjs";
import GoodsList from "@/views/application/goods-list.vue";
import charts from "@/components/charts.vue";

@Component({
    components: { GoodsList, charts }
})
export default class extends Vue {

    // 产品详情
    appDetail: { [propsName: string]: any } = {};

    currentDate: Date | null = null;
    date: number = new Date().getTime() / 1000;
    show: boolean = false;
    chartsNum: number = 0;

    today_price: number = 0;
    total_price: number = 0;
    avg_price: number = 0;
    yes_price: number = 0;

    days: Array<string> = [];
    app_price: Array<number> = [];
    ecmp_price: Array<number> = [];
    visit: Array<number> = [];

    created() {
        this.getAppDetail();
        this.getCoodsIncome();
    }

    confirm() {
        this.show = false;
        if (!this.currentDate) return;
        this.date = this.currentDate.getTime() / 1000;
        this.getCoodsIncome();
    }

    // 生成二维码
    createQRCode(url: string) {
        (this.$refs.goodsList as any).imgUrl = url;
        (this.$refs.goodsList as any).show = true;
    }

    // 获取商品详情
    async getAppDetail() {
        const res: any = await this.$http.post("/Applets/index", { id: this.$route.params.id });
        if (res.code === 200) {
            this.appDetail = res.result;
        }
    }

    // 获取收入图表
    async getCoodsIncome() {
        const currentDate = this.currentDate ? this.currentDate : new Date();
        const year: number = dayjs(currentDate).year();
        const month: number = dayjs(currentDate).month();
        const start: number = new Date(year, month, 1).getTime() / 1000;
        const res: any = await this.$http.post("/Goods/income", { start, app_id: this.$route.params.id });
        if (res.code === 200) {
            this.today_price = res.result.today_price;
            this.total_price = res.result.total_price;
            this.avg_price = res.result.avg_price;
            this.yes_price = res.result.yes_price;
            this.days = [];
            this.app_price = [];
            this.ecmp_price = [];
            this.visit = [];
            for (let index = 0; index < res.result.data.length; index++) {
                this.days.push(res.result.data[index].day);
                this.app_price.push(+res.result.data[index].total_price);
                this.ecmp_price.push(+res.result.data[index].app_price);
                this.visit.push(+res.result.data[index].visit);
            }
            this.$nextTick(() => {
                this.chartsNum++;
            })
        }


    }

}
</script>

<style lang="less" scoped>
@import url("./app.less");
</style>