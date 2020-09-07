<template>
    <div class="college">
        <div class="college-carousel">
            <swiper :autoplay="3000" indicator-color="white">
                <swiper-slide class="college-swiper-slide">slider1</swiper-slide>
                <swiper-slide class="college-swiper-slide">slider2</swiper-slide>
                <swiper-slide class="college-swiper-slide">slider3</swiper-slide>
            </swiper>
        </div>
        <div class="college-tabs">
            <van-tabs color="#999" title-active-color="#FCD000" line-width="64">
                <van-tab title="心得分享">
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
                </van-tab>
                <van-tab title="高级教程">
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