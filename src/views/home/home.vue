<template>
    <div class="home">
        <!-- head -->
        <div class="home-head">
            <router-link tag="div" class="home-head-message" to="/message">
                <img src="@/static/img/message.png" alt="" />
                <p v-show="unRead"></p>
            </router-link>
            <div class="home-head-search" @click="toApplication('0')">
                <img src="@/static/img/search.png" alt="" />
                <input type="text" placeholder="测一测你的九型人格" disabled />
            </div>
            <router-link tag="div" class="home-head-feedback" to="/idea">
                <img src="@/static/img/feedback.png" alt="" />
            </router-link>
            <router-link tag="div" class="home-head-study" to="/college">
                <img src="@/static/img/study.png" alt="" />
            </router-link>
        </div>
        <!-- nav -->
        <nav>
            <div class="nav">
                <van-tabs animated swipeable color='#666' title-active-color='#333' @click="toApplication">
                    <van-tab name="0" title="推荐">
                        <template #title>推荐</template>
                    </van-tab>
                    <van-tab name="0" title="全部"></van-tab>
                    <van-tab :name="item.id" v-for="(item,i) in tagList" :key="i" :title="item.name"></van-tab>
                </van-tabs>
            </div>
        </nav>
        <!-- </div> -->
        <!-- swiper -->
        <div class="home-swiper">
            <van-swipe>
                <van-swipe-item v-for="(item,i) in adsList" :key="i">
                    <div class="home-swiper-slide">
                        <a :href="item.jump_link" target="_blank">
                            <img :src="item.img | qnImg" alt="">
                        </a>
                    </div>
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- menu -->
        <div class="home-menu">
            <ul>
                <router-link :to="item.router" tag="li" v-for="(item,i) in menulist" :key="i">
                    <img :src="item.src" alt="" />
                    <p>{{item.title}}</p>
                </router-link>
            </ul>
        </div>
        <!-- announcement -->
        <div class="home-announcement">
            <div class="home-announcement-main">
                <van-swipe vertical autoplay="3000" style="height:0.6rem" :show-indicators="false">
                    <van-swipe-item v-for="(item,i) in announcementList" :key="i" style="height:0.6rem" @click="$router.push('/announcement/detail/' + item.id)">
                        <span style="color: '#333'">系统公告</span>
                        <span style="color: '#FCD000'"> | </span>
                        <span>{{item.title}}</span>
                        <p class="fr">
                            <i class="right"></i>
                        </p>
                    </van-swipe-item>
                </van-swipe>
            </div>
        </div>
        <!-- ranking -->
        <div class="home-ranking">
            <div class="home-title clearfix">
                <p class="fl">收益排行</p>
                <router-link tag="span" to="/leaderboard" class="fr">
                    全部<i class="right"></i>
                </router-link>
            </div>
            <p class="home-ranking-remarks">注：收益排行数据为2020-8-23用户</p>
            <Leaderboard :limit="3"></Leaderboard>
        </div>
        <!-- recommend -->
        <Recommend title="免费推广" :is_free="1"></Recommend>
        <!-- recommend -->
        <Recommend title="今日新品" :is_new="1"></Recommend>
        <!-- recommend -->
        <Recommend title="热门榜单" :is_hot="1"></Recommend>
        <!-- ScrollBack -->
        <ScrollBack></ScrollBack>
        <!-- footer -->
        <Footer :selectTab="0"></Footer>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Footer from "@/layout/footer.vue";
import ScrollBack from "@/components/scrollBack.vue";
import Leaderboard from "@/components/leaderboard.vue";
import Recommend from "@/components/recommend.vue";


interface MenuType {
    src: string;
    title: string;
    router?: string;
}

@Component({
    components: { ScrollBack, Leaderboard, Footer, Recommend }
})
export default class Home extends Vue {

    navFlag: boolean = false;

    unRead: boolean = false; // 未读消息
    tagList: Array<{ [propsName: string]: any }> = []; // tag列表
    adsList: Array<{ [propsName: string]: any }> = []; // 广告列表
    indexNav: number = 0; // 选中的列表
    announcementList: Array<{ [propsName: string]: any }> = []; // 公告列表
    menulist: MenuType[] = [
        {
            src: require("@/static/img/menu1.png"),
            title: "邀请好友",
            router: "/share"
        },
        {
            src: require("@/static/img/menu2.png"),
            title: "绑定抖音",
            router: "/dylist",
        },
        {
            src: require("@/static/img/menu3.png"),
            title: "收益报表",
            router: "/incomeStatement"
        },
        {
            src: require("@/static/img/menu4.png"),
            title: "爆单分析",
            router: "/hotOrder"
        },
        {
            src: require("@/static/img/menu5.png"),
            title: "签到有礼",
            router: "/signin"
        },
    ];
    navSwiperOptions: any = {
        slidesPerView: 7,
    }
    navSwiperOptions1: any = {
        direction: 'vertical',
        height: 30,
        slidesPerView: 1,
    }

    created() {
        this.getUnread();
        this.getTagList();
        this.getAds();
        this.getAnn();
    }

    // 跳转到应用
    toApplication(name: string | number) {
        this.$router.push("/application?tag=" + name);
    }

    // 获取广告
    async getAds() {
        const res: any = await this.$http.post("Ads/index", { place: 1 });
        if (res.code === 200) this.adsList = res.result;
    }

    // 获取公告
    async getAnn() {
        const res: any = await this.$http.post("Announcement/index", { number: 3 });
        if (res.code === 200) this.announcementList = res.result;
    }

    // 获取未读消息
    async getUnread() {
        const res: any = await this.$http.post("Message/unread");
        if (res.code === 200) this.unRead = Boolean(res.result);
    }

    // 获取tag列表
    async getTagList() {
        const res: any = await this.$http.post("Tag/index");
        if (res.code === 200) this.tagList = res.result;
        this.$nextTick(() => this.navFlag = true);
    }
}
</script>

<style lang="less" scoped>
@import url("./home.less");
</style>
<style lang="less">
.home {
    .van-tab {
        font-size: 0.28rem !important;
    }
    .van-tabs__nav .van-tab:first-of-type {
        padding-left: 0;
    }
    .van-tabs__line {
        left: -0.12rem;
        bottom: 0.1rem;
        width: 0.36rem;
        border-radius: 2px;
    }
    .van-tab--active .van-tab__text {
        font-size: 0.34rem;
    }
    .van-tabs__nav--line {
        padding-bottom: 0;
    }
    .van-tabs__wrap--scrollable .van-tabs__nav--complete {
        padding: 0;
    }
}
</style>