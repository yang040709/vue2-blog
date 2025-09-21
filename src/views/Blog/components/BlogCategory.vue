<template>
  <div class="blog-category-container" v-loading="isLoading">
    <div class="title">文章分类</div>
    <RightList :list="list" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from "../components/RightList.vue";
import { getBlogType } from "@/api/blog";
import fetchData from "@/mixins/fetchData";

export default {
  mixins: [fetchData([])],
  methods: {
    async fetchData() {
      return await getBlogType();
    },
    handleSelect(item) {
      const query = {
        page: 1,
        limit: this.limit,
      };
      // 跳转到当前的分类id，页容量，页码
      if (item.id === -1) {
        this.$router.push({
          name: "blog",
          query,
        });
      } else {
        this.$router
          .push({
            name: "categoryBlog",
            params: {
              categoryId: item.id,
            },
            query,
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  components: {
    RightList,
  },
  computed: {
    categoryId() {
      // console.log("route change", this.$route.params.categoryId);
      return this.$route.params.categoryId || -1;
    },
    limit() {
      return +this.$route.query.limit || 10;
    },
    list() {
      const totalArticleCount = this.data.reduce((a, b) => {
        return a + b.articleCount;
      }, 0);
      const result = [
        { name: "全部", id: -1, articleCount: totalArticleCount },
        ...this.data,
      ];
      // console.log(result, this.categoryId, "$=>");
      return result.map((it) => ({
        isSelect: this.categoryId === it.id,
        aside: `${it.articleCount}篇`,
        ...it,
      }));
    },
  },
};
</script>

<style scoped lang="less">
.blog-category-container {
  box-sizing: border-box;
  max-width: 300px;
  width: 25vw;
  min-width: 200px;
  padding: 20px;
  position: relative;
  height: 100%;
  overflow-y: auto;
  .title {
    margin-bottom: 20px;
    font-size: 1em;
    font-weight: bold;
    letter-spacing: 2px;
  }
}
</style>