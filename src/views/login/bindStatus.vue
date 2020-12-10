<template>
    <div class="login">
        <div class="bing-status" v-show="type === '1'">
            <img src="@/static/img/success.png" alt="">
            <p>绑定成功</p>
            <div class="xkd-btn-yellow" @click="$router.replace('/')">返回平台首页</div>
        </div>
        <div class="bing-status" v-show="type === '0'">
            <img src="@/static/img/fail.png" alt="">
            <p>绑定失败</p>
            <p class="font12 color999">请返回小科抖平台列表查看即可</p>
        </div>
        <div class="good-list">
            <h3 class="good-list-title">推荐产品</h3>
            <GoodsList></GoodsList>
            <!-- <div class="good-list-main">
                <div class="goods-list clearfix" v-for="(item,i) in goodsList" :key="i">
                    <div class="goods-list-left fl">
                        <img :src="item.logo | qnImg" alt="">
                    </div>
                    <div class="goods-list-center fl">
                        <p>{{item.name}}</p>
                        <p>小测评</p>
                    </div>
                    <div class="goods-list-right fr">
                        <div class="xkd-btn-yellow">查看</div>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GoodsList from "@/views/application/goods-list.vue";

@Component({
    components: { GoodsList }
})
export default class extends Vue {
    goodsList: Array<{ [propsName: string]: any }> = [];

    type: string | (string | null)[] = this.$route.params.type;

    page: number = 1;
    limit: number = 3;

    created() {
        this.getGoods();
    }

    async getGoods() {
        const data = { is_free: 0, is_new: 0, is_hot: 0, tag: 0, page: this.page, limit: this.limit, sort: 1 };
        const res: any = await this.$http.post("Goods/index", data);
        if (res.code === 200) this.goodsList = res.result.list;
    }

}
</script>

<style lang="less" scoped>
@import url("./login.less");
</style>