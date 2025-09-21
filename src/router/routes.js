import "nprogress/nprogress.css";
import NotFind from "@/views/NotFind"
import { start, done, configure } from "nprogress";

configure({
  trickleSpeed: 20,
  showSpinner: false,
});

function delay(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration)
  })
}


function getPageComponent(pageCompResolver) {
  return async () => {
    start();
    if (process.env.NODE_ENV === "development") {
      await delay(50);
    }
    const comp = await pageCompResolver();
    done();
    return comp;
  };
}



export default [
  {
    name: "home", path: "/", component:
      getPageComponent(() => import("@/views/Home"))
    ,
    meta: {
      title: "首页",
    }
  },
  {
    name: "about", path: "/about", component: getPageComponent(() => import("@/views/About")),
    meta: {
      title: "关于我",
    }
  },
  {
    name: "blog", path: "/blog", component: getPageComponent(() => import("@/views/Blog")),
    meta: {
      title: "文章",
    }
  },
  {
    name: "categoryBlog", path: "/blog/cate/:categoryId", component: getPageComponent(() => import("@/views/Blog")),
    meta: {
      title: "文章",
    }
  },
  {
    name: "blogDetail", path: "/blog/:id", component: getPageComponent(() => import("@/views/Blog/Detail.vue")),
    meta: {
      title: "文章详情",
    }
  },
  {
    name: "message", path: "/message", component: getPageComponent(() => import("@/views/Message")),
    meta: {
      title: "留言板",
    }
  },
  {
    name: "project", path: "/project", component: getPageComponent(() => import("@/views/Project")),
    meta: {
      title: "项目",
    }
  },
  {
    name: "notfind", path: "*", component: NotFind,
    meta: {
      title: "404",
    }
  },
]
