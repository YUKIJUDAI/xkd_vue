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
                            <template v-for="(item,i) in shareList">
                                <li :key="i">
                                    <div class="college-tabs1-list-left">
                                        <img :src="item.img | qnImg" alt="" />
                                    </div>
                                    <div class="college-tabs1-list-right">
                                        <p>{{item.title}}</p>
                                        <p>时长：{{item.length}}分钟</p>
                                        <div class="college-tabs1-user">
                                            <img src="" alt="" />
                                            <span>小老师</span>
                                        </div>
                                        <div class="college-tabs1-btn">回看教程</div>
                                    </div>
                                </li>
                                <hr />
                            </template>
                        </ul>
                        <ScrollBack></ScrollBack>
                    </div>
                </van-tab>
                <van-tab title="高级教程">
                    <div class="college-tabs2">
                        <ul class="college-tabs1-list">
                            <li v-for="(item,i) in collegeList" :key="i">
                                <div class="college-tabs1-list-left">
                                    <img :src="item.img | qnImg" alt="" />
                                </div>
                                <div class="college-tabs1-list-right">
                                    <p>{{item.title}}</p>
                                    <p>{{item.description}}</p>
                                    <div class="college-tabs1-img">{{item.sort}}人已学习</div>
                                </div>
                            </li>
                        </ul>
                        <ScrollBack></ScrollBack>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
        <Footer :selectTab="1"></Footer>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import ScrollBack from "@/components/scrollBack.vue";
import Footer from "@/layout/footer.vue";

@Component({
    components: { ScrollBack, Footer }
})
export default class College extends Vue {


    shareList: Array<{ [propsName: string]: any }> = [];
    collegeList: Array<{ [propsName: string]: any }> = [];

    created() {
        this.getShare();
        this.getCollege();
    }
    // 获取高级教程
    async getCollege() {
        const res: any = await this.$http.post("College/index");
        res.code === 200 && (this.collegeList = res.result);
    }
    // 获取心得分享
    async getShare() {
        const res: any = await this.$http.post("/College/share");
        res.code === 200 && (this.shareList = res.result);
    }

}
</script>

<style lang="less" scoped>
@import url("./college.less");
</style>