<template>
    <div class="login">
        <div class="bing-status">
            <img src="@/static/img/success.png" alt="">
            <p>绑定成功</p>
            <p class="font12 color999">请返回小科抖平台列表查看即可</p>
        </div>
        <div class="bing-status">
            <img src="@/static/img/fail.png" alt="">
            <p>绑定失败</p>
            <p class="font12 color999">请返回小科抖平台列表查看即可</p>
        </div>
        <div class="good-list">
            <p class="good-list-title">产品列表</p>
            <div class="good-list-main">
                <div class="goods-list clearfix" v-for="(item,i) in goodsList" :key="i">
                    <div class="goods-list-left fl">
                        <img src="" alt="">
                    </div>
                    <div class="goods-list-center fl">
                        <p>漫画头像生成器</p>
                        <p>小测评</p>
                    </div>
                    <div class="goods-list-right fr">
                        <div class="xkd-btn-yellow">查看</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {
    goodsList: Array<{ [propsName: string]: any }> = [];

    page: number = 1;
    limit: number = 3;

    created() {
        this.getGoods();
    }

    async getGoods() {
        const data = { is_free: 2, is_new: 2, is_hot: 2, tag: 0, page: this.page, limit: this.limit, sort: 1 };
        const res: any = await this.$http.post("Goods/index", data);
        if (res.code === 200) this.goodsList = res.result.list;
    }

}
</script>

<style lang="less" scoped>
@import url("./login.less");
</style>