<template>
    <div class="hotOrder">
        <div class="xkd-title">爆单资讯</div>
        <van-list v-model="isLoading" :finished="finished" success-text="刷新成功" @load="getHotOrder">
            <div class="hotOrder-list">
                <ul>
                    <router-link tag="li" :to="'/hotOrder/detail/' + item.id" v-for="(item,i) in list" :key="i">
                        <div class="hotOrder-list-left">
                            <img :src="item.pic | qnImg" alt="" />
                        </div>
                        <div class="hotOrder-list-center">
                            <p>{{item.title}}</p>
                            <p>{{item.create_time | changeDay}}</p>
                        </div>
                    </router-link>
                </ul>
            </div>
        </van-list>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {
    isLoading: boolean = false;
    finished: boolean = false;

    page: number = 1; // 页数
    limit: number = 10; // 每页条数
    list: Array<{ [propsName: string]: any }> = [];

    created() {
        this.getHotOrder();
    }

    async getHotOrder() {
        this.isLoading = true;
        const res: any = await this.$http.post("/Burst/index", { page: this.page });
        this.isLoading = false;
        if (res.code === 200) {
            if (this.page === 1) {
                this.list = res.result.list;
            } else {
                this.list = [...this.list, ...res.result.list];
            }
            if (this.list.length < res.result.total) {
                this.page++;
            } else {
                this.finished = true;
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import url("./hotOrder.less");
</style>