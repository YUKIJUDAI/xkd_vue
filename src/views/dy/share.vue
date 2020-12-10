<template>
    <div class="dy-share">
        <div class="dy-share-main">
            <img :src="appDetail.app_img | qnImg" alt="">
            <div class="dy-share-info">
                <img :src="appDetail.app_img | qnImg" alt="">
                <span class="font18">{{appDetail.app_name}}</span>
            </div>
            <p class="font14">{{appDetail.app_name}}-获取专属测试答案</p>
            <div class="dy-share-btn font16" @click="open">打开小程序</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {

    app_id: string = (this.$route.query.app_id as string);
    id: string = (this.$route.query.id as string);

    appDetail: { [key: string]: any } = {};

    created() {
        this.getApp();
    }

    async getApp() {
        const res: any = await this.$http.post("/Applets/index", { id: this.app_id });
        res.code === 200 && (this.appDetail = res.result);
    }

    open() {
        // window.location.href = 'snssdk1128://microapp?version=v2&app_id=ttbe68c8d5215310a5&scene=0&version_type=current&start_page=pages/login/login?appname=douyin';
        window.location.href = `snssdk1128://microapp?version=v2&app_id=ttbe68c8d5215310a5&scene=0&version_type=current&start_page=pages/login/login?jump=/pages/dotests/dotests?id=${this.id}&appname=douyin&gid=630&datakey=Z1pOemlwaTRnRWZua0R2VGZvcXJjUT09`;
    }
}
</script>

<style lang="less" scoped>
@import url("./dy.less");
</style>