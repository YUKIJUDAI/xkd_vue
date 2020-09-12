<template>
    <div class="college">
        <div class="college-carousel">
            <van-swipe>
                <van-swipe-item v-for="(item,i) in adsList" :key="i">
                    <div class="college-swiper-slide">
                        <a :href="item.jump_link" target="_blank">
                            <img :src="item.img | qnImg" alt="">
                        </a>
                    </div>
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="college-tabs">
            <van-tabs color="#999" title-active-color="#FCD000" line-width="64">
                <van-tab title="心得分享">
                    <van-list v-model="isLoading1" :finished="finished1" success-text="刷新成功" @load="getShare">
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
                                                <img :src="item.avatar | qnImg" alt="" />
                                                <span>{{item.nickname}}</span>
                                            </div>
                                            <div class="college-tabs1-btn"><a :href="item.link" target="blank">回看教程</a></div>
                                        </div>
                                    </li>
                                    <hr />
                                </template>
                            </ul>
                            <ScrollBack></ScrollBack>
                        </div>
                    </van-list>
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
                                    <div class="college-tabs1-img">{{item.number}}人已学习</div>
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

    isLoading1: boolean = false;
    finished1: boolean = false;
    isLoading2: boolean = false;
    finished2: boolean = false;

    page1: number = 1;
    page2: number = 1;

    shareList: Array<{ [propsName: string]: any }> = []; // 分享列表
    collegeList: Array<{ [propsName: string]: any }> = []; // 课程列表
    adsList: Array<{ [propsName: string]: any }> = []; // 广告列表

    created() {
        this.getShare();
        this.getCollege();
        this.getAds();
    }

    // 获取广告
    async getAds() {
        const res: any = await this.$http.post("Ads/index", { place: 1 });
        if (res.code === 200) this.adsList = res.result;
    }

    // 获取高级教程
    async getCollege() {
        this.isLoading2 = true;
        const res: any = await this.$http.post("College/index", { page: this.page2 });
        this.isLoading2 = false;
        if (res.code === 200) {
            if (this.page2 === 1) {
                this.collegeList = res.result.list;
            } else {
                this.collegeList = [...this.collegeList, ...res.result.list];
            }
            if (res.result.list.length === 10) {
                this.page2++;
            } else {
                this.finished2 = true;
            }
        }
    }
    // 获取心得分享
    async getShare() {
        this.isLoading1 = true;
        const res: any = await this.$http.post("/College/share", { page: this.page1 });
        this.isLoading1 = false;
        if (res.code === 200) {
            if (this.page1 === 1) {
                this.shareList = res.result.list;
            } else {
                this.shareList = [...this.shareList, ...res.result.list];
            }
            if (res.result.list.length === 10) {
                this.page1++;
            } else {
                this.finished1 = true;
            }
        }
    }

}
</script>

<style lang="less" scoped>
@import url("./college.less");
</style>