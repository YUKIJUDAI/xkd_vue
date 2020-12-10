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
                    <div class="dy-list-li-right fr" @click="show = true,index = i">
                        ...
                    </div>
                    <van-action-sheet v-model="show" :actions="actions" :description="'绑定剩余' + dyList[index].day+ '天'" cancel-text="取消" close-on-click-action @select="onSelect" />
                </li>
            </ul>
        </div>
        <router-link to="/dy-add" tag="div" class="add clearfix">
            <img src="@/static/img/add-dy.png" alt="" class="fl">
            <p class="fl">添加抖音号</p>
            <router-link tag="span" to="/helpCenter/detail/10004" class="fr">查看教程</router-link>
        </router-link>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Dylist extends Vue {

    show: boolean = false;
    actions: Array<{ name: string }> = [
        { name: "重新授权" },
        { name: "删除抖音号" }
    ];
    dyList: Array<{ [propsNmae: string]: any }> = []; // 抖音列表

    index: number = 0; // 当前选中的index

    created() {
        this.getDyList();
    }

    onSelect(item: any, index: number) {
        switch (index) {
            case 0:
                return this.rebinding();
            case 1:
                return this.delbinding();
            default:
                return;
        }
    }

    // 重新绑定
    rebinding() {
        this.$router.push("/dy-add?show=true")
    }
    // 删除绑定
    async delbinding() {
        const res: any = await this.$http.post("/douyin/deleteAccount", { id: this.dyList[this.index].id });
        res.code === 200 && this.getDyList();  
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