<template>
    <div class="college">
        <div class="college-carousel">
            <van-swipe :autoplay="3000" indicator-color="white">
                <van-swipe-item class="college-swiper-slide">slider1</van-swipe-item>
                <van-swipe-item class="college-swiper-slide">slider2</van-swipe-item>
                <van-swipe-item class="college-swiper-slide">slider3</van-swipe-item>
            </van-swipe>
        </div>
        <div class="college-tabs">
            <van-tabs color="#333" title-active-color="#333">
                <van-tab>
                    <div class="college-tabs1">
                        <ul class="college-tabs1-list">
                            <li>
                                <div class="college-tabs1-list-left">
                                    <img src="" alt="" />
                                </div>
                                <div class="college-tabs1-list-right">
                                    <p>打破固有思维，换种…</p>
                                    <p>时长：60分钟</p>
                                    <div class="college-tabs1-user">
                                        <img src="" alt="" />
                                        <span>小老师</span>
                                    </div>
                                    <div class="college-tabs1-btn">回看教程</div>
                                </div>
                            </li>
                            <hr />
                        </ul>
                        <ScrollBack></ScrollBack>
                    </div>
                    <div class="college-tabs2">
                        <ul class="college-tabs1-list">
                            <li>
                                <div class="college-tabs1-list-left">
                                    <img src="" alt="" />
                                </div>
                                <div class="college-tabs1-list-right">
                                    <p>抖音新手实操指南</p>
                                    <p>介绍抖音基础资料完善，素材准备 视频制作</p>
                                    <div class="college-tabs1-img">1340人已学习</div>
                                </div>
                            </li>
                        </ul>
                        <ScrollBack></ScrollBack>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
        <Footer :selectedTab="1"></Footer>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import ScrollBack from "@/components/scrollBack.vue";
import Footer from "@/layout/footer.vue";

@Component
export default class extends Vue {

}
</script>

<style lang="less" scoped>
@import url("./college.less");
</style>