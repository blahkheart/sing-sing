import Vue from 'vue/dist/vue.js';
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import ResetPassword from "../views/ResetPassword.vue";
import NewPassword from "../views/NewPassword.vue";
import Sing from "../views/CreateSingProject.vue";
import VideoUrl from "../views/VideoUrl.vue";
import Record from "../views/Record.vue";


import * as firebase from "firebase/app";
import "firebase/auth";

import store from "../store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/sing",
    name: "sing",
    component: Sing,
    meta: {
      requiresAuth: true,
    },
  },{
    path: "/videourl",
    name: "video",
    component: VideoUrl,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/my-projects",
    name: "my-projects",
    component: () => import("../views/MyProject.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/signin",
    name: "signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/reset-password",
    name: "reset-password",
    component: ResetPassword,
  },
  {
    path: "/new-password",
    name: "new-password",
    component: NewPassword,
  },
  {
    path: "/:id/record",
    name: "record",
    component: Record,
  },
  {
    path: "/:id/project",
    name: "project",
    component: () => import("../views/Project.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/:id/compile",
    name: "compile",
    component: Signup,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/:id/birthday",
    name: "birthday",
    component: () => import("../views/Birthday.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  if (requiresAuth && !isAuthenticated) {
    store.state.pageLoading = true;
    next("/signin");
  } else {
    next();
  }
});

router.afterEach(() => {
  store.state.pageLoading = false;
});

export default router;
