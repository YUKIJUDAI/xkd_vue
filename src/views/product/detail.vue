<template>
    <div class="product-detail">
        <div class="product-detail-head">
            <div class="product-detail-head-left">
                <img :src="goodsDetail.logo | qnImg" alt="" />
            </div>
            <div class="product-detail-head-center">
                <p>{{goodsDetail.name}}</p>
                <p>
                    <img :src="goodsDetail.app_det.app_img | qnImg" class="xingqu">{{goodsDetail.app_det.app_name}}
                </p>
            </div>
        </div>
        <div class="product-detail-main">
            <h3>截图素材下载</h3>
            <ul>
                <li v-for="(item,i) in goodsDetail.images" :key="i">
                    <img :src="item | qnImg" alt="">
                    <div class="xkd-btn-download" @click="downloadImg(item,goodsDetail.app_det.app_name)">下载</div>
                </li>
            </ul>
            <div class="xkd-title">产品推荐</div>
            <GoodsList></GoodsList>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GoodsList from "@/views/application/goods-list.vue";
import { downloadImg } from "@/utils/utils";

@Component({
    components: { GoodsList }
})
export default class extends Vue {

    // 产品详情
    goodsDetail: { [propsName: string]: any } = { app_det: {}, images: [] };

    created() {
        this.getGoodsDetail();
    }

    // 获取商品详情
    async getGoodsDetail() {
        const res: any = await this.$http.post("/Goods/detail", { id: this.$route.params.id });
        if (res.code === 200) {
            res.result.images && (res.result.images = res.result.images.split(","));
            this.goodsDetail = res.result;
        }
    }

    // 下载图片
    downloadImg(url: string, title: string) {
        downloadImg(url, title);
    }

}
</script>

<style lang="less" scoped>
@import url("./product.less");
</style>