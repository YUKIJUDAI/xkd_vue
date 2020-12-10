<template>
    <div class="leaderboard">
        <ul>
            <li v-for="(item,i) in revenueList" :key="i">
                <div class="leaderboard-num" style="color:#FCD000" v-if="i < 3">{{i + 1}}</div>
                <div class="leaderboard-num color666" v-else>{{i + 1}}</div>
                <div class="leaderboard-img">
                    <img :src="item.avatar | qnImg" alt="" class="leaderborder-avatar avatar1" v-if="i === 0"/>
                    <img :src="item.avatar | qnImg" alt="" class="leaderborder-avatar avatar2" v-else-if="i === 1"/>
                    <img :src="item.avatar | qnImg" alt="" class="leaderborder-avatar avatar3" v-else-if="i === 2"/>
                    <img :src="item.avatar | qnImg" alt="" class="leaderborder-avatar" v-else/>
                    <img src="@/static/img/hg1.png" alt="" class="leaderborder-crown" v-show="i === 0"/>
                    <img src="@/static/img/hg3.png" alt="" class="leaderborder-crown" v-show="i === 1"/>
                    <img src="@/static/img/hg2.png" alt="" class="leaderborder-crown" v-show="i === 2"/>
                </div>
                <div class="leaderboard-name">{{item.nickname}}</div>
                <div class="leaderboard-price color333" v-if="i < 3">{{~~item.money}}元</div>
                <div class="leaderboard-price color666" v-else>{{~~item.money}}元</div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class extends Vue {

    @Prop()
    readonly limit!: number;

    revenueList: Array<{ [propsName: string]: any }> = []; //排行榜
    
    created(){
        this.getRevenue();
    }
    
    async getRevenue() {
        const res: any = await this.$http.post("Revenue/index", { type: 1, limit: this.limit });
        if (res.code === 200) this.revenueList = res.result;
    }



}
</script>

<style lang="less" scoped>
@import url("./leaderboard.less");
</style>
