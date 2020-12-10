<template>
    <div class="helpCenter-detail">
        <div class="helpCenter-detail-title">{{data.title}}</div>
        <div class="helpCenter-detail-msg clearfix">
            <div class="helpCenter-author fl">小科抖官方</div>
            <div class="helpCenter-time fr">{{data.create_time | changeDay}}</div>            
        </div>
        <div class="helpCenter-detail-content" v-html="data.content"></div>
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
        const res: any = await this.$http.post("/Help/dateil", { id: this.id });
        if (res.code === 200) {
            this.data = res.result;
        }
    }

}
</script>

<style lang="less" scoped>
@import url("./helpCenter.less");
</style>