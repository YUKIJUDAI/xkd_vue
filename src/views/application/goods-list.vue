<template>
    <div>
        <router-link v-if="goodsList" tag="div" :to="'/product/detail/' + item.id" class="goods-list clearfix" v-for="(item,i) in goodsList" :key="i">
            <div class="goods-list-left fl">
                <img :src="item.logo | qnImg" alt="">
            </div>
            <div class="goods-list-center fl">
                <p>{{item.name}}</p>
                <router-link tag="p" :to="'/app/detail/' + item.app_id">
                    <img class="xingqu" :src="item.app_det.app_img | qnImg">{{item.app_det.app_name}}
                </router-link>
            </div>
            <div class="goods-list-right fr" @click.stop="createQRCode(item.url)">
                <div class="xkd-btn-yellow">推广</div>
            </div>
        </router-link>
        <router-link v-if="!goodsList" tag="div" :to="'/product/detail/' + item.id" class="goods-list clearfix" v-for="(item,i) in goodsLists" :key="i">
            <div class="leaderboard-num fl" style="color:#FCD000" v-if="i < 3 && hasleaderboard">{{i + 1}}</div>
            <div class="leaderboard-num fl color666" v-if=" i >= 3 && hasleaderboard">{{i + 1}}</div>
            <div class="goods-list-left fl">
                <img :src="item.logo | qnImg" alt="">
            </div>
            <div class="goods-list-center fl">
                <p>{{item.name}}</p>
                <router-link tag="p" :to="'/app/detail/' + item.app_id">
                    <img class="xingqu" :src="item.app_det.app_img | qnImg">{{item.app_det.app_name}}
                </router-link>
            </div>
            <div class="goods-list-right fr" @click.stop="createQRCode(item.url)">
                <div class="xkd-btn-yellow">推广</div>
            </div>
        </router-link>
        <codeOverlay v-model="show" :imgUrl="imgUrl" />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import CodeOverlay from "@/components/codeOverlay.vue";

@Component({
    components: { CodeOverlay }
})
export default class extends Vue {
    @Prop()
    readonly goodsList!: Array<{ [propsName: string]: any }>

    @Prop({ default: 5 })
    readonly limit!: number;

    @Prop({ default: false })
    readonly hasleaderboard!: boolean;

    goodsLists: Array<{ [propsName: string]: any }> = [];
    show: boolean = false;
    imgUrl: string = "";

    created() {
        !this.goodsList && this.getGoodsLists();
    }

    // 生成二维码
    createQRCode(url: string) {
        this.imgUrl = url;
        this.show = true;
    }

    async getGoodsLists() {
        const res: any = await this.$http.post("/Goods/index", { is_free: 0, is_new: 0, is_hot: 0, tag: 0, sort: 1, page: 1, limit: this.limit });
        res.code === 200 && (this.goodsLists = res.result.list);
    }



}
</script>

<style lang="less" scoped>
@import url("./application.less");
</style>