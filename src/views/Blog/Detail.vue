<template>
  <div class="detail-container">
    <Layout>
      <template #default>
        <div class="main-container" v-loading="isLoading" ref="mainContainer">
          <BlogDetail :blog="data" v-if="data" />
          <BlogComment v-if="!isLoading" id="blogComment" />
        </div>
      </template>
      <template #right>
        <div class="right-container" v-loading="isLoading">
          <BlogTOC :toc="data.toc" v-if="data" />
        </div>
      </template>
    </Layout>
    <ToTop />
  </div>
</template>

<script>
import Layout from "@/components/Layout";
import BlogDetail from "./components/BlogDetail.vue";
import BlogComment from "./components/BlogComment.vue";
import BlogTOC from "./components/BlogTOC.vue";
import fetchData from "@/mixins/fetchData";
import mainScroll from "@/mixins/mainScroll";
import { getBlogDetail } from "@/api/blog";
import ToTop from "@/components/ToTop";
import { titleController } from "@/utils";
export default {
  components: {
    Layout,
    BlogDetail,
    BlogTOC,
    BlogComment,
    ToTop,
  },
  mixins: [fetchData(null), mainScroll("mainContainer")],
  methods: {
    // 配合混合获取数据
    async fetchData() {
      const resq = await getBlogDetail(this.$route.params.id);
      // console.log(resq, "resq<===");
      // 假设id===-1为无文章,跳转找不到页面
      if (!resq || resq.id === "-1") {
        this.$router.push("/404");
        return;
      }

      titleController.setRouteTitle(resq.title);
      return resq;
    },
  },
  updated() {
    const hash = location.hash;
    // console.log(hash, "hash");
    location.hash = "";
    setTimeout(() => {
      // console.log(location.hash, 11);
      location.hash = hash;
    }, 50);
  },
};
</script>

<style scoped lang="less">
.detail-container {
  width: 100%;
  height: 100%;
  .main-container {
    overflow-y: scroll;
    overflow-x: hidden;
    box-sizing: border-box;
    scroll-behavior: smooth;
    height: 100%;
    padding: 20px;
    position: relative;
  }
  .right-container {
    height: 100%;
    position: relative;
    box-sizing: border-box;
    max-width: 300px;
    width: 25vw;
    min-width: 200px;
    position: relative;
  }
}
</style>