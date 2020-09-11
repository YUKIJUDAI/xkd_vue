<template>
    <div class="application">
        <van-search v-model="keyword" placeholder="请输入搜索关键词" />
        <div class="application-main">
            <div class="xkd-check">
                <ul>
                    <li :class="{active : tag === '0'}" @click="tag = '0'">全部</li>
                    <li v-for="(item,i) in tagList" :key="i" :class="{active : tag == item.id}" @click="tag = item.id">
                        {{item.name}}
                    </li>
                </ul>
            </div>
            <van-tabs color='#FF9900' title-active-color='#FF9900' line-width="64">
                <van-tab title="热门单品" :title-style="{'font-size': '0.32rem'}">
                    <Goods :sort="1" :keyword="keyword" :tag="tag"></Goods>   
                </van-tab>
                <van-tab title="最新上新" :title-style="{'font-size': '0.32rem'}">
                    <Goods :sort="2" :keyword="keyword" :tag="tag"></Goods> 
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Goods from "./goods.vue";

@Component({
    components: { Goods }
})
export default class Application extends Vue {

    goodsList: Array<{ [propsName: string]: any }> = [];

    // 搜索内容
    keyword: string = "";
    // 标签
    tag: string | (string | null)[] = this.$route.query.tag;
    tagList: Array<{ [propsName: string]: any }> = [];

    created() {
        this.getTag();
    }

    async getTag() {
        const res: any = await this.$http.post("Tag/index");
        res.code === 200 && (this.tagList = res.result);
    }
}
</script>

<style lang="less" scoped>
@import url("./application.less");
</style>