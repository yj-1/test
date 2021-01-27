import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import store from "@/store/index";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    meta: {
      title: "首页",
    },
    component: () => import("@/views/Home.vue")
  }, // 首页
  {
    path: "/register",
    name: "register",
    meta: {
      hideMenu: true,
      NoRouterMenu: true,
    },
    component: () => import("@/views/Register.vue")
  }, // 注册页
  {
    path: "/login",
    name: "login",
    meta: {
      hideMenu: true,
      NoRouterMenu: true,
    },
    component: () => import("@/views/Login.vue")
  }, // 登录页
  {
    path: "/user",
    name: "user",
    meta: {
      title: "用户管理",
    },
    component: () => import("@/views/User.vue")
  } // 用户管理
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if(to?.meta?.NoRouterMenu) {
    store.commit("setRouterView", false)
  } 
  if(!/^\/(login|register)/.test(to.fullPath)) {
    if (!sessionStorage.getItem("Authorization")) {
      router.replace('/login')
    }
  }
  next()
}) // 路由进入之前拦截

router.beforeResolve((to, from) => {
  if (!to?.meta?.NoRouterMenu) {
    store.commit("setRouterView", true)
  }
}) // 路由离开之前拦截

export const routerPush = router.push
export const routerReplace = router.replace

export default router;
