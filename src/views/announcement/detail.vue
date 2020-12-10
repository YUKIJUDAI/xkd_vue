<template>
    <div class="announcement-detail">
        <div class="announcement-detail-title">{{data.title}}</div>
        <div class="announcement-detail-msg clearfix">
            <div class="announcement-author fl">小科抖官方</div>
            <div class="announcement-time fr">{{data.create_time | changeDay}}</div>
        </div>
        <div class="announcement-detail-content" v-html="data.content"></div>
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
        const res: any = await this.$http.post("/Announcement/detail", { id: this.id });
        if (res.code === 200) {
            this.data = res.result;
        }
    }

}
</script>

<style lang="less" scoped>
@import url("./announcement.less");
</style>