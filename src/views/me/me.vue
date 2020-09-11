<template>
    <div class="me">
        <div class="me-head">
            <div class="me-nav clearfix">
                <router-link tag="div" class="me-nav-message fl" to="/message">
                    <img src="@/static/img/message-w.png" alt="" />
                    <p v-show="unRead"></p>
                </router-link>
                <div class="me-nav-config fr">
                    <img src="@/static/img/me-config.png" alt="">
                </div>
                <div class="me-nav-customer fr">
                    <img src="@/static/img/me-customer.png" alt="">
                </div>
            </div>
            <div class="me-user clearfix">
                <div class="me-user-left fl">
                    <img src="@/static/img/default-avatar.png" alt="">
                </div>
                <div class="me-user-center fl">
                    <p>磷叶石</p>
                    <p>手机号：15356120589</p>
                    <p>微信：wxid_dhefhf</p>
                </div>
                <div class="me-user-right fr">
                    <p>签到有礼</p>
                    <img src="@/static/img/me-signin.png" alt="">
                </div>
            </div>
        </div>
        <div class="me-wallet">
            <div class="me-wallet-main">
                <div class="me-trapezoid">推广更多小程序</div>
                <div class="me-vip">vip已开通 <img src="@/static/img/vip-arrow.png"></div>
                <div class="me-withdraw">
                    <div class="me-withdraw-left">
                        <p>可提现总额度（元）</p>
                        <p>8,652.19</p>
                    </div>
                    <div class="me-withdraw-right">
                        <p>我的钱包</p>
                    </div>
                </div>
                <div class="me-income">
                    <ul>
                        <li>
                            <p>总收益</p>
                            <p>8,652.19</p>
                        </li>
                        <li>
                            <p>今日预估收益</p>
                            <p>8,652.19</p>
                        </li>
                        <li>
                            <p>昨日收益</p>
                            <p>8,652.19</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="me-openvip">
            <div class="me-vip-left">
                <img src="@/static/img/me-vip.png" alt="">
                <div>
                    <p>开通会员</p>
                    <p>解锁专属课程导师</p>
                </div>
            </div>
            <div class="me-vip-right">
                <img src="@/static/img/me-friend.png" alt="">
                <div>
                    <p>邀请好友</p>
                    <p>分享得3天VIP</p>
                </div>
            </div>
        </div>
        <div class="me-team">
            <div class="me-team-top">
                <p>团队负责人</p>
                <p><img src="@/static/img/default-avatar.png" alt="">张三</p>
            </div>
            <div class="me-team-bottom">
                <ul>
                    <router-link tag="li" to="/dyList">
                        <img src="@/static/img/wddy.png" alt="">
                        <p>我的抖音</p>
                    </router-link>
                    <li>
                        <img src="@/static/img/wdtd.png" alt="">
                        <p>我的团队</p>
                    </li>
                    <li>
                        <img src="@/static/img/jlq.png" alt="">
                        <p>交流群</p>
                    </li>
                    <li>
                        <img src="@/static/img/gfkf.png" alt="">
                        <p>官方客服</p>
                    </li>
                </ul>
            </div>
        </div>
        <div style="height:0.2rem;background:#f5f6f9"></div>
        <div class="me-list">
            <ul>
                <router-link to="" tag="li">
                    <p><img src="@/static/img/me-list1.png" alt="">学习中心</p>
                </router-link>
                <router-link to="" tag="li">
                    <p><img src="@/static/img/me-list2.png" alt="">关于我们</p>
                </router-link>
                <router-link to="/cooperation" tag="li">
                    <p><img src="@/static/img/me-list3.png" alt="">商务合作</p>
                </router-link>
                <router-link to="/feedback" tag="li">
                    <p><img src="@/static/img/me-list4.png" alt="">投诉建议</p>
                </router-link>
                <router-link to="/message" tag="li">
                    <p><img src="@/static/img/me-list5.png" alt="">系统通知</p>
                </router-link>
                <router-link to="/setting" tag="li">
                    <p><img src="@/static/img/me-list6.png" alt="">系统设置</p>
                </router-link>
                <router-link to="" tag="li">
                    <p><img src="@/static/img/me-list7.png" alt="">帮助中心</p>
                </router-link>
            </ul>
        </div>
        <!-- ScrollBack -->
        <ScrollBack></ScrollBack>
        <!-- footer -->
        <Footer :selectTab="3"></Footer>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Footer from "@/layout/footer.vue";
import ScrollBack from "@/components/scrollBack.vue";

@Component({
    components: { ScrollBack, Footer }
})
export default class Me extends Vue {
    unRead: boolean = false;
}
</script>

<style lang="less" scoped>
@import url("./me.less");
</style>