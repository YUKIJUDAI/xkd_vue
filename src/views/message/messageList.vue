<template>
    <van-list v-model="isLoading" :finished="finished" success-text="刷新成功" @load="onLoad">
        <div class="messages clearfix">
            <div class="messages-left">
                <p></p>
                <p></p>
            </div>
            <div class="messages-left">
                <p></p>
                <p></p>
            </div>
        </div>
    </van-list>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class extends Vue {
    @Prop(Number) 
    readonly type!: string;

    page: number = 1; // 分页
    finished: boolean = false; // 结束

    created() {
        this.onLoad();
    }

    async onLoad() {
        const res: any = this.$http.post("/Message/index", { type: this.type, page: this.page });
        // res.code === 0 && ()
    }


    isLoading: boolean = false;

}
</script>

<style scoped>
</style>