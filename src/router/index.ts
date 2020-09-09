import vue from "vue";
import Router from "vue-router";

vue.use(Router);

const routes = [
    {
        path: "/login",
        component: () => import("@/views/login/login.vue"),
    },
    {
        path: "/registered",
        component: () => import("@/views/login/registered.vue"),
    },
    {
        path: "/forget",
        component: () => import("@/views/login/forget.vue"),
    },
    {
        path: "",
        component: () => import("@/views/home/home.vue"),
    },
    {
        path: "/college",
        component: () => import("@/views/college/college.vue"),
    },
    {
        path: "/college/detail/:id",
        component: () => import("@/views/college/detail.vue"),
    },
    {
        path: "/message",
        component: () => import("@/views/message/message.vue"),
    },
    {
        path: "/message/detail/:id",
        component: () => import("@/views/message/detail.vue"),
    }
];

const router = new Router({
    mode: "history",
    routes,
});

export default router;
