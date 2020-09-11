<template>
    <div class="college-detail">
        <div class="college-carousel">
            <div class="college-swiper-slide">slider1</div>
        </div>
        <div class="college-detail-main">
            <div class="college-detail-nav">课程介绍</div>
            <div class="college-detail-title">抖音新手实操指南</div>
            <div class="college-detail-title college-detail-info">介绍抖音基础资料完善、素材准备、视频制作、发布。如果刷垂直和运营中遇到的那些坑，一个优秀视频具备的维度。</div>
            <div class="college-detail-class">共6课时/已更新6课时</div>
            <div>
                <ul class="college-detail-list">
                    <hr />
                    <li>
                        <div class="college-detail-list-left">
                            <p>01.小科抖介绍</p>
                            <p>时长：6分42秒</p>
                        </div>
                        <div class="college-detail-list-right">
                            <img src="" alt="" />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <ScrollBack></ScrollBack>
        <Footer :selectedTab="1"></Footer>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import ScrollBack from "@/components/scrollBack.vue";
import Footer from "@/layout/footer.vue";

@Component
export default class Detail extends Vue {

}
</script>

<style lang="less" scoped>
@import url("./college.less");
</style>

import React, { Component } from "react";

import ScrollBack from "../common/scrollBack";
import Footer from "../layout/footer";

import "./college.less";

export default class Detail extends Component {
    render() {
        return (
            <div class="college-detail">
                <div class="college-carousel">
                    <div class="college-swiper-slide">slider1</div>
                </div>
                <div class="college-detail-main">
                    <div class="college-detail-nav">课程介绍</div>
                    <div class="college-detail-title">抖音新手实操指南</div>
                    <div class="college-detail-title college-detail-info">介绍抖音基础资料完善、素材准备、视频制作、发布。如果刷垂直和运营中遇到的那些坑，一个优秀视频具备的维度。</div>
                    <div class="college-detail-class">共6课时/已更新6课时</div>
                    <div>
                        <ul class="college-detail-list">
                            <hr />
                            <li>
                                <div class="college-detail-list-left">
                                    <p>01.小科抖介绍</p>
                                    <p>时长：6分42秒</p>
                                </div>
                                <div class="college-detail-list-right">
                                    <img src="" alt="" />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <ScrollBack></ScrollBack>
                <Footer selectedTab={1}></Footer>
            </div>
        );
    }
}
