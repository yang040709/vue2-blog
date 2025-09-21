<template>
  <div class="blog-container">
    <Layout>
      <template #default>
        <BlogList />
      </template>
      <template #right>
        <BlogCategory />
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from "@/components/Layout";
import BlogList from "./components/BlogList.vue";
import BlogCategory from "./components/BlogCategory.vue";

export default {
  name: "Blog",
  data() {
    return {
      blogType: [],
    };
  },
  components: {
    Layout,
    BlogList,
    BlogCategory,
  },
};
</script>

<style lang="less" scoped>
.blog-container {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>