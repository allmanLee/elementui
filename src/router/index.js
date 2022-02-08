import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/button",
    name: "button",
    component: () => import(/* webpackChunkName: "button" */ "../views/button.vue"),
  },
  {
    path: "/checkbox",
    name: "checkbox",
    component: () => import(/* webpackChunkName: "checkbox" */ "../views/checkbox.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
