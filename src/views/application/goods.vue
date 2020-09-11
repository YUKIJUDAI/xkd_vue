<template>
    <div class="goods">
        <van-list v-model="isLoading" :finished="finished" success-text="刷新成功" @load="getGoods">
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
        </van-list>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class Goods extends Vue {

    @Prop()
    readonly sort!: string;

    @Prop()
    readonly keyword!: string;
    @Watch('keyword')
    changeKey() {
        this.page = 1;
        this.getGoods();
    }

    @Prop()
    readonly tag!: string;
    @Watch('tag')
    changeTag() {
        this.page = 1;
        this.getGoods();
    }

    isLoading: boolean = false;
    finished: boolean = false;

    page: number = 1; // 页数
    limit: number = 10; // 每页条数

    goodsList: Array<{ [propsName: string]: any }> = [];

    async getGoods() {
        const data = { is_free: 2, is_new: 2, is_hot: 2, tag: this.tag, keyword: this.keyword, page: this.page, limit: this.limit, sort: this.sort };
        const res: any = await this.$http.post("Goods/index", data);
        if (res.code === 200) {
            if (this.page === 1) {
                this.goodsList = res.result.list;
            } else {
                this.goodsList = [...this.goodsList, ...res.result.list];
            }
            if (res.result.list.length === 10) {
                this.page++;
            } else {
                this.finished = true;
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import url("./application.less");
</style>