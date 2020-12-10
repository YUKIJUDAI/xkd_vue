<template>
    <div class="share">
        <p class="share-title">{{shareInfo.title}}</p>
        <div class="share-pic">
            <div class="share-pos" ref="shareImg">
                <img :src="shareInfo.img | qnImg" alt="" class="share-img">
                <img :src="shareInfo.code" :style="styleObject" class="share-code">
            </div>
        </div>
        <div class="xkd-btn-yellow share-btn" @click="buildCanvas">生成推广海报</div>
        <van-overlay :show="show" @click="show = false">
            <div class="wrapper" @click.stop>
                <img :src="imgUrl" alt="" v-longtap="longTap">
                <p class="colorfff" v-show="!isMobile">长按保存到相册~</p>
                <p class="colorfff" v-show="isMobile">截图保存到相册~</p>
            </div>
        </van-overlay>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import html2canvas from "html2canvas";
import { downloadImg, isMobile } from "@/utils/utils";

@Component
export default class extends Vue {
    // 遮罩开关
    show: boolean = false;
    // canvas图片路径
    imgUrl: string = "";
    // 分享信息
    shareInfo: { [propsName: string]: any } = {};

    isMobile: boolean = isMobile();

    proportion: number = (450 / 1200);

    styleObject = {
        top: "0",
        left: "0",
        width: "0",
        height: "0"
    }

    created() {
        this.getShare();
    }

    async getShare() {
        const res: any = await this.$http.post("/user/invite");
        if (res.code === 200) {
            this.shareInfo = res.result;
            this.styleObject = {
                top: +res.result.y * this.proportion + "px",
                left: +res.result.x * this.proportion + "px",
                width: 150 * this.proportion + "px",
                height: 150 * this.proportion + "px"
            }
        }
    }

    // 生成海报
    buildCanvas() {
        html2canvas(this.$refs.shareImg as any, {
            allowTaint: true,
            useCORS: true
        }).then(canvas => {
            let dataURL = canvas.toDataURL("image/png");
            this.imgUrl = dataURL;
            if (this.imgUrl !== "") {
                this.show = true;
            }
        })
    }
    // 长按
    longTap() {
        downloadImg(this.imgUrl, this.shareInfo.title);
    }
}
</script>

<style lang="less" scoped>
@import url("./share.less");
</style>