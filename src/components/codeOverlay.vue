<template>
    <div>
        <van-overlay :show="value" @click="$emit('input',false)" z-index="99">
            <div class="xcp-wrapper" @click.stop>
                <div class="xcp-code">
                    <img :src="codeUrl" alt="">
                    <p class="color666 font12">长按二维码或者截图保存到相册</p>
                </div>
            </div>
        </van-overlay>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { createQRCode } from "@/utils/utils";

@Component
export default class extends Vue {

    // 开关
    @Prop({ default: false })
    value!: boolean;

    // 图片地址
    @Prop({ default: "" })
    imgUrl!: string;

    // 二维码地址
    codeUrl: string = "";

    @Watch("value")
    changeValue(val: string) {
        val && createQRCode(this.imgUrl).then((res: string) => {
            this.codeUrl = res;
        })
    }

}
</script>

<style lang="less" scoped>
.xcp-wrapper {
    text-align: center;
    margin-top: 3rem;
    .xcp-code {
        background: #fff;
        width: 60%;
        padding: 0.5rem;
        margin: 0 auto;
        border-radius: 5px;
        img {
            width: 2.96rem;
            height: 2.96rem;
            border: 3px solid #000;
            border-radius: 5px;
        }
        p {
            margin-top: 0.2rem;
        }
    }
}
</style>