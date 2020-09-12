import vue from "vue";
import Router from "vue-router";

vue.use(Router);

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location: any) {
    return (originalPush.call(this, location) as any).catch((err:any) => err);
};

const routes = [
    {
        path: "/login",
        component: () => import("@/views/login/login.vue"),
        meta: { title: "登录" },
    },
    {
        path: "/registered",
        component: () => import("@/views/login/registered.vue"),
        meta: { title: "注册" },
    },
    {
        path: "/forget",
        component: () => import("@/views/login/forget.vue"),
        meta: { title: "忘记密码" },
    },
    {
        path: "/bind-phone",
        component: () => import("@/views/login/bindPhone.vue"),
        meta: { title: "绑定手机" },
    },
    {
        path: "/bind-status",
        component: () => import("@/views/login/bindStatus.vue"),
        meta: { title: "绑定状态" },
    },
    {
        path: "/",
        component: () => import("@/views/home/home.vue"),
        meta: { title: "首页" },
    },
    {
        path: "/college",
        component: () => import("@/views/college/college.vue"),
        meta: { title: "分享中心" },
    },
    {
        path: "/college/detail/:id",
        component: () => import("@/views/college/detail.vue"),
        meta: { title: "分享中心" },
    },
    {
        path: "/me",
        component: () => import("@/views/me/me.vue"),
        meta: { title: "我的" },
    },
    {
        path: "/message",
        component: () => import("@/views/message/message.vue"),
        meta: { title: "消息" },
    },
    {
        path: "/message/detail/:id",
        component: () => import("@/views/message/detail.vue"),
        meta: { title: "消息详情" },
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
        path: "/setting",
        component: () => import("@/views/setting/setting.vue"),
        meta: { title: "系统设置" },
    },
    {
        path: "/application",
        component: () => import("@/views/application/application.vue"),
        meta: { title: "系统设置" },
    },
    {
        path: "/signin",
        component: () => import("@/views/signin/signin.vue"),
        meta: { title: "签到" },
    },
];

const router = new Router({
    mode: "history",
    routes,
});

export default router;
