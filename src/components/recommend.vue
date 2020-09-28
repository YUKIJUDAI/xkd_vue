<template>
    <div class="recommend">
        <div class="border-top"></div>
        <div class="home-recommend">
            <div class="home-title clearfix">
                <p class="fl">{{title}}</p>
                <router-link tag="span" to="/application" class="fr">
                    全部<i class="right"></i>
                </router-link>
            </div>
            <div class="home-recommend-list">
                <ul>
                    <li v-for="(item,i) in list" :key="i">
                        <div class="home-recommend-list-left">
                            <img :src="item.logo | qnImg" alt="" />
                        </div>
                        <div class="home-recommend-list-center">
                            <p>{{item.name}}</p>
                            <p>
                                收益：自推<span class="color666">90%</span>
                            </p>
                            <p>
                                <i class="xingqu"></i>趣测趣玩
                            </p>
                        </div>
                        <div class="home-recommend-list-right">
                            <img src="@/static/img/ewm.png" alt="" />
                            <p>去推广</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {
    @Prop({ default: 2 })
    readonly title!: string;

    @Prop({ default: 2 })
    readonly is_free!: number;

    @Prop({ default: 2 })
    readonly is_new!: number;

    @Prop({ default: 2 })
    readonly is_hot!: number;


    list: Array<{ [propsName: string]: any }> = [];
    page: number = 1;
    limit: number = 3;

    created() {
        this.getGoods();
    }

    async getGoods() {
        const data = { is_free: this.is_free, is_new: this.is_new, is_hot: this.is_hot, tag: 0, sort: 1, page: this.page, limit: this.limit };
        const res: any = await this.$http.post("Goods/index", data);
        res.code === 200 && (this.list = res.result.list);
    }

}
</script>

<style lang="less" scoped>
@import url("~@/views/home/home.less");
</style>