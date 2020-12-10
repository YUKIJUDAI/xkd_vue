<template>
    <div class="helpCenter">
        <van-list v-model="isLoading" :finished="finished" success-text="刷新成功" @load="getHelpCenterList">
            <div class="helpCenter clearfix" v-for="(item,i) in helpCenterList" :key="i" @click="$router.push('/helpCenter/detail/' + item.id)">
                <div class="helpCenter-left fl">
                    <p>{{item.title}}</p>
                </div>
                <div class="helpCenter-right fr">
                    <p>{{item.create_time | changeDay('MM-DD HH:mm')}}</p>
                </div>
            </div>
        </van-list>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {

    helpCenterList: Array<{ [PropName: string]: any }> = [];
    page: number = 1; // 分页
    finished: boolean = false; // 结束
    isLoading: boolean = false; // 是否加载中

    created() {
        this.getHelpCenterList();
    }

    async getHelpCenterList() {
        this.isLoading = true;
        const res: any = await this.$http.post("/Help/index", { page: this.page, limit: 10 });
        this.isLoading = false;
        if (res.code === 200) {
            if (this.page === 1) {
                this.helpCenterList = res.result.list;
            } else {
                this.helpCenterList = [...this.helpCenterList, ...res.result.list];
            }
            if (this.helpCenterList < res.result.total) {
                this.page++;
            } else {
                this.finished = true;
            }
        }
    }

}
</script>

<style lang="less" scoped>
@import url("./helpCenter.less");
</style>