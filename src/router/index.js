import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from "./routes"
import { titleController } from "@/utils"


if (!window.VueRouter) {
  Vue.use(VueRouter);
}

const router = new VueRouter({
  mode: "history",
  routes,
})



router.afterEach((to, from) => {
  if (to.meta.title) {
    titleController.setRouteTitle(to.meta.title);
  }
})





/*
 快时不打扰，慢时有反馈 的优质用户体验。


避免过度使用：短于 300ms 的加载无需显示进度条,所以不使用了
import { start, done, configure } from "nprogress"


configure({
  trickleSpeed: 10,
  showSpinner: false,
})
router.beforeEach((to, from, next) => {
  if (to.meta.title != from.meta.title) {
    start();
  }
  next();
})

router.afterEach((to, from) => {
  if (to.meta.title != from.meta.title) {
    done();
  }
  if (to.meta.title) {
    titleController.setRouteTitle(to.meta.title);
  }
}) */


export default router;