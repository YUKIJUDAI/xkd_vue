import vue from "vue";
import Router from "vue-router";
import qs from "qs";
import { isWeixin } from "@/utils/utils";
import { baseURL } from "@/config/index";
import store from "@/store/index";

vue.use(Router);

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location: any) {
    return (originalPush.call(this, location) as any).catch((err: any) => err);
};

const routes = [
    {
        path: "/login",
        component: () => import("@/views/login/login.vue"),
        meta: { title: "登录", nohead: true },
    },
    {
        path: "/registered",
        component: () => import("@/views/login/registered.vue"),
        meta: { title: "注册", nohead: true },
    },
    {
        path: "/forget",
        component: () => import("@/views/login/forget.vue"),
        meta: { title: "忘记密码", nohead: true },
    },
    {
        path: "/bind-phone",
        component: () => import("@/views/login/bindPhone.vue"),
        meta: { title: "绑定手机", nohead: true },
    },
    {
        path: "/bind-status/:type",
        component: () => import("@/views/login/bindStatus.vue"),
        meta: { title: "绑定状态", nohead: true },
    },
    {
        path: "/weChat",
        component: () => import("@/views/weChat/weChat.vue"),
        meta: { title: "小科抖", nohead: true },
    },
    {
        path: "/",
        component: () => import("@/views/home/home.vue"),
        meta: { title: "小科抖", nohead: true },
        beforeEnter(to: any, from: any, next: any) {
            if (!store.state.userInfo.token || new Date().getTime() > store.state.userInfo.over_time * 1000) {
                if (isWeixin()) {
                    const invitecode = to.query.invitecode;
                    location.href = invitecode ? baseURL + "user/wechat/shouquan?" + qs.stringify({ invitecode }) : baseURL + "user/wechat/shouquan";
                } else {
                    next("/login");
                }
            } else {
                next();
            }
        },
    },
    {
        path: "/college",
        component: () => import("@/views/college/college.vue"),
        meta: { title: "分享中心", nohead: true },
    },
    {
        path: "/college/detail/:id",
        component: () => import("@/views/college/detail.vue"),
        meta: { title: "分享中心" },
    },
    {
        path: "/product/detail/:id",
        component: () => import("@/views/product/detail.vue"),
        meta: { title: "产品介绍" },
    },
    {
        path: "/app/detail/:id",
        component: () => import("@/views/app/detail.vue"),
        meta: { title: "小程序介绍" },
    },
    {
        path: "/hotOrder",
        component: () => import("@/views/hotOrder/hotOrder.vue"),
        meta: { title: "爆单分析" },
    },
    {
        path: "/hotOrder/detail/:id",
        component: () => import("@/views/hotOrder/detail.vue"),
        meta: { title: "爆单分析" },
    },
    {
        path: "/leaderboard",
        component: () => import("@/views/leaderboard/leaderboard.vue"),
        meta: { title: "排行榜", nohead: true },
    },
    {
        path: "/me",
        component: () => import("@/views/me/me.vue"),
        meta: { title: "我的", nohead: true },
    },
    {
        path: "/message",
        component: () => import("@/views/message/message.vue"),
        meta: { title: "消息" },
    },
    {
        path: "/message/detail/:id",
        component: () => import("@/views/message/detail.vue"),
        meta: { title: "消息" },
    },
    {
        path: "/announcement/detail/:id",
        component: () => import("@/views/announcement/detail.vue"),
        meta: { title: "公告" },
    },
    {
        path: "/team",
        component: () => import("@/views/team/team.vue"),
        meta: { title: "我的团队" },
    },
    {
        path: "/dylist",
        component: () => import("@/views/dy/dylist.vue"),
        meta: { title: "我的抖音" },
    },
    {
        path: "/dy-add",
        component: () => import("@/views/dy/add.vue"),
        meta: { title: "我的抖音" },
    },
    {
        path: "/dy-share",
        component: () => import("@/views/dy/share.vue"),
        meta: { title: "抖音", nohead: true },
    },
    {
        path: "/cooperation",
        component: () => import("@/views/cooperation/cooperation.vue"),
        meta: { title: "商务合作" },
    },
    {
        path: "/feedback",
        component: () => import("@/views/feedback/feedback.vue"),
        meta: { title: "投诉建议" },
    },
    {
        path: "/headFeedback/:id",
        component: () => import("@/views/feedback/headFeedback.vue"),
        meta: { title: "投诉负责人" },
    },
    {
        path: "/setting",
        component: () => import("@/views/setting/setting.vue"),
        meta: { title: "系统设置" },
    },
    {
        path: "/application",
        component: () => import("@/views/application/application.vue"),
        meta: { title: "产品大厅" },
    },
    {
        path: "/signin",
        component: () => import("@/views/signin/signin.vue"),
        meta: { title: "签到" },
    },
    {
        path: "/idea",
        component: () => import("@/views/idea/idea.vue"),
        meta: { title: "想法建议" },
    },
    {
        path: "/share",
        component: () => import("@/views/share/share.vue"),
        meta: { title: "邀请好友" },
    },
    {
        path: "/vip",
        component: () => import("@/views/vip/vip.vue"),
        meta: { title: "开通vip" },
    },
    {
        path: "/helpCenter",
        component: () => import("@/views/helpCenter/helpCenter.vue"),
        meta: { title: "帮助中心" },
    },
    {
        path: "/helpCenter/detail/:id",
        component: () => import("@/views/helpCenter/detail.vue"),
        meta: { title: "帮助中心" },
    },
    {
        path: "/single/:type",
        component: () => import("@/views/single/single.vue"),
        meta: { title: "" },
        beforeEnter: (to: any, form: any, next: any) => {
            to.meta.title = ["", "关于我们", "服务协议", "隐私政策", "推广规范"][+to.params.type];
            next();
        },
    },
    {
        path: "/wallet",
        component: () => import("@/views/wallet/wallet.vue"),
        meta: { title: "我的钱包" },
    },
    {
        path: "/verified",
        component: () => import("@/views/wallet/verified.vue"),
        meta: { title: "实名认证" },
    },
    {
        path: "/alipay",
        component: () => import("@/views/wallet/alipay.vue"),
        meta: { title: "支付宝绑定" },
    },
    {
        path: "/withdraw",
        component: () => import("@/views/wallet/withdraw.vue"),
        meta: { title: "提现" },
    },
    {
        path: "/withdrawalsRecord",
        component: () => import("@/views/wallet/withdrawalsRecord.vue"),
        meta: { title: "提现记录" },
    },
    {
        path: "/revenueRecord",
        component: () => import("@/views/wallet/revenueRecord.vue"),
        meta: { title: "收益记录" },
    },
    {
        path: "/incomeStatement",
        component: () => import("@/views/incomeStatement/incomeStatement.vue"),
        meta: { title: "收益报表" },
    },
];

const router = new Router({
    mode: "history",
    routes,
});

export default router;
