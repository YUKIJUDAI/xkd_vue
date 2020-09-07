<template>
    <div class="home">
        <div class="home-fixed-top">
            <!-- head -->
            <div class="home-head">
                <div class="home-head-message">
                    <img src="@/static/img/message.png" alt="" />
                    <p v-show="unRead"></p>
                </div>
                <div class="home-head-search">
                    <img src="@/static/img/search.png" alt="" />
                    <input type="text" placeholder="活出漂亮人生" disabled />
                </div>
                <div class="home-head-feedback">
                    <img src="@/static/img/feedback.png" alt="" />
                </div>
                <div class="home-head-study">
                    <img src="@/static/img/study.png" alt="" />
                </div>
            </div>
            <!-- nav -->
            <nav class="clearfix">
                <swiper ref="nav-swiper" :options="navSwiperOptions">
                    <swiper-slide>
                        <p :class="{active:indexNav === -1}">推荐</p>
                    </swiper-slide>
                    <swiper-slide>
                        <p :class="{active:indexNav === -2}">全部</p>
                    </swiper-slide>
                    <swiper-slide>
                        <p :class="{active:indexNav === i}" v-for="(item,i) in tagList" :key="i">{{item.name}}</p>
                    </swiper-slide>
                </swiper>
            </nav>
        </div>
        <!-- swiper -->
        <div class="home-swiper">
            <swiper ref="swiper">
                <swiper-slide>
                    <div class="home-swiper-slide">slider1</div>
                </swiper-slide>
                <swiper-slide>
                    <div class="home-swiper-slide">slider2</div>
                </swiper-slide>
                <swiper-slide>
                    <div class="home-swiper-slide">slider3</div>
                </swiper-slide>
            </swiper>
        </div>
        <!-- menu -->
        <div class="home-menu">
            <ul>
                <li key={i} v-for="(item,i) in menulist" :key="i">
                    <img :src="item.src" alt="" />
                    <p>{{item.title}}</p>
                </li>
            </ul>
        </div>
        <!-- announcement -->
        <div class=" home-announcement">
            <span style="color: '#333'">系统公告</span>
            <span style="color: '#FCD000'"> | </span>
            <span>小科抖推广宣传基本要求</span>
            <p class="fr">
                <i class="right"></i>
            </p>
        </div>
        <!-- ranking -->
        <div class="home-ranking">
            <div class="home-title clearfix">
                <p class="fl">收益排行</p>
                <span class="fr">
                    全部<i class="right"></i>
                </span>
            </div>
            <p class="home-ranking-remarks">注：收益排行数据为2020-8-23用户</p>
            <Leaderboard></Leaderboard>
        </div>
        <!-- recommend -->
        <div class="border-top"></div>
        <div class="home-recommend">
            <div class="home-title clearfix">
                <p class="fl">免费推广</p>
                <span class="fr">
                    全部<i class="right"></i>
                </span>
            </div>
            <div class="home-recommend-list">
                <ul>
                    <li>
                        <div class="home-recommend-list-left">
                            <img src="" alt="" />
                        </div>
                        <div class="home-recommend-list-center">
                            <p>漫画头像生成器</p>
                            <p>
                                收益：自推<span class="color666">90%</span>
                            </p>
                            <p>
                                <i class="xingqu"></i>趣测趣玩
                            </p>
                        </div>
                        <div class="home-recommend-list-right">
                            <img src="" alt="" />
                            <p>去推广</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- recommend -->
        <div class="border-top"></div>
        <div class="home-recommend">
            <div class="home-title clearfix">
                <p class="fl">今日新品</p>
                <span class="fr">
                    全部<i class="right"></i>
                </span>
            </div>
            <div class="home-recommend-list">
                <ul>
                    <li>
                        <div class="home-recommend-list-left">
                            <img src="" alt="" />
                        </div>
                        <div class="home-recommend-list-center">
                            <p>漫画头像生成器</p>
                            <p>
                                收益：自推<span class="color666">90%</span>
                            </p>
                            <p>
                                <i class="xingqu"></i>趣测趣玩
                            </p>
                        </div>
                        <div class="home-recommend-list-right">
                            <img src="" alt="" />
                            <p>去推广</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- recommend -->
        <div class="border-top"></div>
        <div class="home-recommend">
            <div class="home-title clearfix">
                <p class="fl">热门榜单</p>
                <span class="fr">
                    全部<i class="right"></i>
                </span>
            </div>
            <div class="home-recommend-list">
                <ul>
                    <li>
                        <div class="home-recommend-list-left">
                            <img src="" alt="" />
                        </div>
                        <div class="home-recommend-list-center">
                            <p>漫画头像生成器</p>
                            <p>
                                收益：自推<span class="color666">90%</span>
                            </p>
                            <p>
                                <i class="xingqu"></i>趣测趣玩
                            </p>
                        </div>
                        <div class="home-recommend-list-right">
                            <img src="" alt="" />
                            <p>去推广</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- ScrollBack -->
        <ScrollBack></ScrollBack>
        <!-- footer -->
        <Footer :selectedTab="0"></Footer>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Footer from "@/layout/footer.vue";
import ScrollBack from "@/components/scrollBack.vue";
import Leaderboard from "@/components/leaderboard.vue";


interface MenuType {
    src: string;
    title: string;
}

@Component({
    components: { ScrollBack, Leaderboard, Footer }
})
export default class extends Vue {

    unRead: boolean = false; // 未读消息
    tagList: any[] = []; // tag列表
    indexNav: number = 0; // 选中的列表
    announcementList: any[] = []; // 公告列表
    menulist: MenuType[] = [
        {
            src: require("@/static/img/menu1.png"),
            title: "邀请好友",
        },
        {
            src: require("@/static/img/menu2.png"),
            title: "绑定抖音",
        },
        {
            src: require("@/static/img/menu3.png"),
            title: "收益报表",
        },
        {
            src: require("@/static/img/menu4.png"),
            title: "爆单分析",
        },
        {
            src: require("@/static/img/menu5.png"),
            title: "签到有礼",
        },
    ];
    navSwiperOptions: any = {
        slidesPerView: 7,
    }

    created() {
        this.getUnread();
        this.getTagList();
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
    }
}
</script>

<style lang="less" scoped>
@import url("./home.less");
</style>