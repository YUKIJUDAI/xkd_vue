<template>
    <van-list v-model="isLoading" :finished="finished" success-text="刷新成功" @load="onLoad">
        <div class="messages clearfix" v-for="(item,i) in list" :key="i" @click="$router.push('/message/detail/' + item.id)">
            <div class="messages-left fl">
                <p><span :class="{active:item.is_read === 0}"></span>{{item.title}}</p>
            </div>
            <div class="messages-right fr">
                <p>{{item.create_time | changeDay('MM-DD HH:mm')}}</p>
            </div>
        </div>
    </van-list>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class MessageList extends Vue {
    @Prop(Number)
    readonly type!: string;

    list: Array<{ [propsName: string]: any }> = [];
    page: number = 1; // 分页
    finished: boolean = false; // 结束
    isLoading: boolean = false; // 是否加载中

    created() {
        this.onLoad();
    }

    async onLoad() {
        this.isLoading = true;
        const res: any = await this.$http.post("/Message/index", { type: this.type, page: this.page });
        this.isLoading = false;
        if (res.code === 200) {
            if (this.page === 1) {
                this.list = res.result.list;
            } else {
                this.list = [...this.list, ...res.result.list];
            }
            if (this.list < res.result.total) {
                this.page++;
            } else {
                this.finished = true;
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import url("./message.less");
</style>