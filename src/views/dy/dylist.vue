<template>
    <div class="dy-list">
        <div style="height:0.36rem"></div>
        <div class="list">
            <ul>
                <li class="dy-list-li clearfix" v-for="(item,i) in dyList" :key="i">
                    <div class="dy-list-li-left fl">
                        <img :src="item.avatar" alt="">
                    </div>
                    <div class="dy-list-li-center fl">
                        <p>{{item.nickname}}<span class="point"></span><span>剩余{{item.day}}天</span></p>
                        <p><span>粉丝数：更新中</span></p>
                    </div>
                    <div class="dy-list-li-right fr">
                        ...
                    </div>
                </li>
            </ul>
        </div>
        <router-link to="/dy-add" tag="div" class="add clearfix">
            <img src="@/static/img/add-dy.png" alt="" class="fl">
            <p class="fl">添加抖音号</p>
            <span class="fr">查看教程</span>
        </router-link>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Dylist extends Vue {

    dyList: Array<{ [propsNmae: string]: any }> = []; // 抖音列表

    created() {
        this.getDyList();
    }

    // 获取抖音列表
    async getDyList() {
        const res: any = await this.$http.post("douyin/bindList");
        res.code === 200 && (this.dyList = res.result);
    }

}
</script>

<style lang="less" scoped>
@import url("./dy.less");
</style>