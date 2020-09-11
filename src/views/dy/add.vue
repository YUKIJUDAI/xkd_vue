<template>
    <div class="dy-add">
        <img src="@/static/img/dy-bg.png" class="dy-bg" alt="">
        <div class="info">
            <p class="color999">授权抖音号您可:</p>
            <ul>
                <li>
                    <img src="@/static/img/dy-true.png" alt="">
                    <span>一键发布视频到抖音</span>
                </li>
                <li>
                    <img src="@/static/img/dy-true.png" alt="">
                    <span>查看小程序收益数据</span>
                </li>
                <li>
                    <img src="@/static/img/dy-true.png" alt="">
                    <span>获取抖音粉丝用户画像以及活跃度</span>
                </li>
            </ul>
        </div>
        <div class="xkd-btn-yellow" @click="show=true">添加抖音号</div>
        <p class="dy-help color999">查看教程</p>
        <van-dialog v-model="show" :showConfirmButton="false" closeOnClickOverlay class="dy-dialog">
            <div class="dy-dialog-title">抖音APP扫码授权</div>
            <div class="color666 font14">截图进入抖音APP扫码授权</div>
            <img src="" alt="">
            <div class="info">
                <p class="color999">授权抖音号您可:</p>
                <ul>
                    <li>
                        <img src="@/static/img/dy-true.png" alt="">
                        <span>一键发布视频到抖音</span>
                    </li>
                    <li>
                        <img src="@/static/img/dy-true.png" alt="">
                        <span>查看小程序收益数据</span>
                    </li>
                    <li>
                        <img src="@/static/img/dy-true.png" alt="">
                        <span>获取抖音粉丝用户画像以及活跃度</span>
                    </li>
                </ul>
            </div>
        </van-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Add extends Vue {
    show: boolean = false;
}
</script>

<style lang="less" scoped>
@import url("./dy.less");
</style>