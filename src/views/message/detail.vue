<template>
    <div class="message-detail">
        <div class="message-detail-title">{{data.title}}</div>
        <div class="message-detail-msg clearfix">
            <div class="message-author fl">小科抖官方</div>
            <div class="message-time fr">{{data.create_time | changeDay}}</div>            
        </div>
        <div class="message-detail-content">{{data.content}}</div>
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
        const res: any = await this.$http.post("Message/detail", { id: this.id });
        if (res.code === 200) {
            this.data = res.result;
        }
    }

}
</script>

<style lang="less" scoped>
@import url("./message.less");
</style>