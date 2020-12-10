<template>
    <div class="hotOrder-detail">
        <div class="hotOrder-detail-title">{{data.title}}</div>
        <div class="hotOrder-detail-msg clearfix">
            <div class="hotOrder-author fl">小科抖官方</div>
            <div class="hotOrder-time fr">{{data.create_time}}</div>
        </div>
        <div class="hotOrder-detail-content" v-html="data.content"></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Detail extends Vue {

    id: string = this.$route.params.id;

    data: { [propsName: string]: any } = {};

    created() {
        this.getDetail();
    }

    async getDetail() {
        const res: any = await this.$http.post("/Burst/detail", { id: this.id });
        if (res.code === 200) {
            this.data = res.result;
        }
    }

}
</script>

<style lang="less" scoped>
@import url("./hotOrder.less");
</style>