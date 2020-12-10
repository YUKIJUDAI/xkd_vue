<template>
    <div id="leaderboard">
        <div class="leaderboard-carousel">
            <van-swipe>
                <van-swipe-item v-for="(item,i) in adsList" :key="i">
                    <div class="leaderboard-swiper-slide">
                        <a :href="item.jump_link" target="_blank">
                            <img :src="item.img | qnImg" alt="">
                        </a>
                    </div>
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="leaderboard-tab">
            <van-tabs color="#333" title-active-color="#333">
                <van-tab title="产品排行">
                    <div class="leaderboard-tabs">
                        <GoodsList :limit="100" :hasleaderboard="true"></GoodsList>
                    </div>
                </van-tab>
                <van-tab title="收益排行">
                    <div class="leaderboard-tabs">
                        <Leaderboard :limit="100"></Leaderboard>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
        <!-- ScrollBack -->
        <ScrollBack></ScrollBack>
        <!-- footer -->
        <Footer :selectTab="2"></Footer>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Footer from "@/layout/footer.vue";
import GoodsList from "@/views/application/goods-list.vue";
import Leaderboard from "@/components/leaderboard.vue";
import ScrollBack from "@/components/scrollBack.vue";

@Component({
    components: { GoodsList, Leaderboard, Footer, ScrollBack }
})
export default class leaderboard extends Vue {
    adsList: Array<{ [propsName: string]: any }> = []; // 广告列表

    created() {
        this.getAds();
    }

    // 获取广告
    async getAds() {
        const res: any = await this.$http.post("Ads/index", { place: 2 });
        if (res.code === 200) this.adsList = res.result;
    }

}
</script>

<style lang="less" scoped>
@import url("./leaderboard.less");
</style>
