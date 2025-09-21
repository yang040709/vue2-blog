<template>
  <div class="blog-detail-container">
    <h1>{{ blog.title }}</h1>
    <div class="aside">
      <span>日期：{{ formatDate(blog.createDate) }}</span>
      <span>浏览：{{ blog.scanNumber }}</span>
      <span>
        <a href="#blogComment"> 评论：{{ blog.commentNumber }} </a>
      </span>
      <span>
        <router-link
          :to="{
            name: 'categoryBlog',
            params: {
              categoryId: blog.category.id,
            },
          }"
        >
          {{ blog.category.name }}
        </router-link>
      </span>
    </div>
    <div class="markdown-body" v-html="blog.htmlContent"></div>
  </div>
</template>

<script>
import "@/styles/markdown.css";
import "highlight.js/styles/github.css";
import { formatDate } from "@/utils";

export default {
  props: ["blog"],
  methods: {
    formatDate,
  },
};
</script>

<style scoped lang="less">
.blog-detail-container {
  position: relative;
  padding-top: 20px;
  // height: 100%;
  min-height: 100vh;
  .aside {
    font-size: 12px;
    color: gray;
    margin: 15px 0;
    span {
      margin: 0 5px;
    }
    margin-bottom: 30px;
  }
}
</style>