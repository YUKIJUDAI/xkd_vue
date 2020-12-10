<template>
    <div class="me">
        <div class="me-head">
            <div class="me-nav clearfix">
                <router-link tag="div" class="me-nav-message fl" to="/message">
                    <img src="@/static/img/message-w.png" alt="" />
                    <p v-show="unRead"></p>
                </router-link>
                <router-link tag="div" to="/setting" class="me-nav-config fr">
                    <img src="@/static/img/me-config.png" alt="">
                </router-link>
                <div class="me-nav-customer fr">
                    <img src="@/static/img/me-customer.png" alt="">
                </div>
            </div>
            <div class="me-user clearfix">
                <div class="me-user-left fl" :style="{'border':is_vip && '0.08rem solid #f8dfae'}">
                    <img :src="$store.state.userInfo.headimgurl ? $store.state.userInfo.headimgurl : require('@/static/img/default-avatar.png')" alt="">
                </div>
                <div class="me-user-center fl">
                    <p v-if="$store.state.userInfo.wechat"><img class="vip-icon" src="@/static/img/vip-icon.png" v-show="is_vip">{{$store.state.userInfo.nickname}}</p>
                    <p v-else><img class="vip-icon" src="@/static/img/vip-icon.png" v-show="is_vip">{{$store.state.userInfo.user_phone | addMosaic}}</p>
                    <p>手机号：{{$store.state.userInfo.user_phone}}</p>
                </div>
                <router-link to="/signin" class="me-user-right fr">
                    <p>签到有礼</p>
                    <img src="@/static/img/me-signin.png" alt="">
                </router-link>
            </div>
        </div>
        <div class="me-wallet">
            <div class="me-wallet-main">
                <div class="me-trapezoid">{{is_vip ? '邀请好友一起来玩' : '开通会员享受更多福利'}}</div>
                <div class="me-vip">{{is_vip ? 'VIP已开通' : '未开通会员'}} <img src="@/static/img/vip-arrow.png"></div>
                <div class="me-withdraw">
                    <div class="me-withdraw-left">
                        <p>可提现总额度（元）</p>
                        <p>{{incomeInfo.money_over}}</p>
                    </div>
                    <router-link to="/wallet" tag="div" class="me-withdraw-right">
                        <p>我的钱包</p>
                    </router-link>
                </div>
                <div class="me-income">
                    <ul>
                        <li>
                            <p>{{incomeInfo.money_income_total}}</p>
                            <p>总收益</p>
                        </li>
                        <li>
                            <p>{{incomeInfo.money_income_one_day}}</p>
                            <p>今日预估收益</p>
                        </li>
                        <li>
                            <p>{{incomeInfo.money_income_two_day}}</p>
                            <p>昨日收益</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="me-team">
            <div class="me-team-top flexsb font14">
                <div class="flexsb me-team-left">
                    <img :src="headInfo.headimgurl" alt="" class="headimgurl"></p>
                    <div>
                        <p class="color333 font14">{{headInfo.nickname}}</p>
                        <p class="me-team-left-name">团队负责人</p>
                    </div>
                </div>
                <div class="me-team-right">
                    <p class="team-btn" @click="copy">联系导师</p>
                    
                </div>
            </div>
            <div class="me-team-bottom">
                <ul>
                    <router-link tag="li" to="/dyList">
                        <img src="@/static/img/wddy.png" alt="">
                        <p>我的抖音</p>
                    </router-link>
                    <router-link tag="li" to="/team">
                        <img src="@/static/img/wdtd.png" alt="">
                        <p>我的团队</p>
                    </router-link>
                    <li @click="headFlag = true">
                        <img src="@/static/img/jlq.png" alt="">
                        <p>交流群</p>
                    </li>
                    <li @click="customerServiceFlag = true">
                        <img src="@/static/img/gfkf.png" alt="">
                        <p>官方客服</p>
                    </li>
                </ul>
                <codeOverlay v-model="customerServiceFlag" :imgUrl="wechat"></codeOverlay>
                <van-overlay :show="headFlag" z-index="99" @click="headFlag = false">
                    <div class="head-wrapper" @click.stop>
                        <div class="head-code">
                            <div class="head-img">
                                <img :src="headInfo.headimgurl" alt="">
                            </div>
                            <p class="head-name font20">
                                {{headInfo.nickname}}
                            </p>
                            <p class="head-msg">
                                点击复制按钮，联系负责人加入群聊
                            </p>
                            <div class="xkd-btn-primary" @click.stop="copy">复制微信号</div>
                            <router-link tag="p" :to="'/headFeedback/' + headInfo.id" class="color999 head-wrapper-complaint">投诉负责人</router-link>
                        </div>
                    </div>
                </van-overlay>
            </div>
        </div>
        <div class="me-openvip">
            <router-link tag="div" to="/vip" class="me-vip-left">
                <img src="@/static/img/me-vip.png" alt="">
                <div>
                    <p>开通会员</p>
                    <p>解锁专属课程导师</p>
                </div>
            </router-link>
            <router-link tag="div" to="/share" class="me-vip-right">
                <img src="@/static/img/me-friend.png" alt="">
                <div>
                    <p>邀请好友</p>
                    <p>分享得3天VIP</p>
                </div>
            </router-link>
        </div>
        <div class="me-list">
            <van-cell-group :border="false">
                <van-cell title-class="color666" title="学习中心" to="/college" is-link size="large"></van-cell>
                <van-cell title-class="color666" title="帮助中心" to="/helpCenter" is-link size="large"></van-cell>
                <van-cell title-class="color666" title="系统通知" to="/message" is-link size="large"></van-cell>
                <van-cell title-class="color666" title="商务合作" to="/cooperation" is-link size="large"></van-cell>
                <van-cell title-class="color666" title="投诉建议" to="/feedback" is-link size="large" :border="false"></van-cell>
                <div style="height:0.2rem;background:#f5f6f9"></div>
                <van-cell title-class="color666" title="关于我们" to="/single/1" is-link size="large"></van-cell>
                <van-cell title-class="color666" title="系统设置" to="/setting" is-link size="large" :border="false"></van-cell>
            </van-cell-group>
        </div>
        <!-- ScrollBack -->
        <ScrollBack></ScrollBack>
        <!-- footer -->
        <Footer :selectTab="3"></Footer>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import copy from "copy-to-clipboard";

import Footer from "@/layout/footer.vue";
import ScrollBack from "@/components/scrollBack.vue";
import CodeOverlay from "@/components/codeOverlay.vue";

@Component({
    components: { ScrollBack, Footer, CodeOverlay }
})
export default class Me extends Vue {
    unRead: boolean = false;
    customerServiceFlag: boolean = false;
    headFlag: boolean = false;

    // 客服微信
    wechat: number | null = null;
    // 团长信息
    headInfo: { [propsName: string]: any } = {};
    // 用户信息
    userInfo: { [propsName: string]: any } = {};
    // 余额信息
    incomeInfo: { [propsName: string]: any } = {};
    // 是否vip
    is_vip: boolean = Boolean(+this.$store.state.userInfo.user_level);

    created() {
        this.getHead();
        this.getWechat();
        this.getIncome();
    }

    // 获取余额信息
    async getIncome() {
        const res: any = await this.$http.post("/User/Wallet/getIncome");
        res.code === 200 && (this.incomeInfo = res.result);
    }

    // 获取用户信息
    async getUserInfo() {
        const res: any = await this.$http.post("/user/getUserInfo");
        res.code === 200 && (this.userInfo = res.result);
    }

    // 获取客服微信
    async getWechat() {
        const res: any = await this.$http.post("/system/wechat");
        if (res.code === 200) {
            this.wechat = +res.result;
        }
    }

    // 获取团长信息
    async getHead() {
        const res: any = await this.$http.post("/user/getHead")
        if (res.code === 200) {
            this.headInfo = res.result;
        }
    }

    copy() {
        copy(this.headInfo.wechat);
        this.$toast.success("复制成功");
    }
}
</script>

<style lang="less" scoped>
@import url("./me.less");
</style>