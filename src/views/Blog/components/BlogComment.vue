<template>
  <div class="blog-comment-container">
    <MessageArea
      :subTitle="`(${data.total})`"
      title="评论列表"
      :list="data.rows"
      :isListLoading="isLoading"
      :hasMore="hasMore"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixins/fetchData";
import { getCommnet, postComment } from "@/api/blog";
import { throttle } from "@/utils";
import { handleImgSrc } from "@/utils";
export default {
  mixins: [fetchData({ rows: [], total: 0 })],
  data() {
    return {
      page: 1,
      limit: 10,
      debounceHandler: throttle(this.handleScroll, 50),
    };
  },
  components: {
    MessageArea,
  },
  computed: {
    hasMore() {
      return this.data.rows.length < this.data.total;
    },
  },
  methods: {
    async fetchData() {
      const resp = await getCommnet(
        this.$route.params.id,
        this.page,
        this.limit
      );
      resp.rows.forEach((e) => {
        e.avatar = handleImgSrc(e.avatar);
      });
      return resp;
    },
    async fetchMore() {
      if (!this.hasMore) {
        return;
      }
      this.isLoading = true;
      this.page++;
      const resp = await this.fetchData();
      resp.rows.forEach((e) => {
        e.avatar = handleImgSrc(e.avatar);
      });
      this.data.total = resp.total;
      this.data.rows = this.data.rows.concat(resp.rows);
      this.isLoading = false;
    },
    async handleSubmit(info, callback) {
      // console.log(info, "<==info");
      const infoHandler = {};
      infoHandler.content = info.content;
      infoHandler.nickname = info.nickName;
      const result = await postComment({
        ...infoHandler,
        blogId: this.$route.params.id,
      });
      if (!result) {
        callback("您评论的次数过多，请稍后再评论", "error");
        return;
      }
      result.avatar = handleImgSrc(result.avatar);
      this.data.total++;
      this.data.rows.unshift(result);
      callback("评论成功");
    },
    handleScroll(dom) {
      // console.log("1");

      if (this.isLoading || !dom) {
        return;
      }
      const range = 100;
      const desc = Math.abs(
        dom.scrollTop + dom.clientHeight - dom.scrollHeight
      );
      if (desc <= range) {
        this.fetchMore();
      }
    },
  },
  created() {
    this.$bus.$on("mainScroll", this.debounceHandler);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.debounceHandler);
  },
};
</script>

<style scoped lang="less">
.blog-comment-container {
  position: relative;
}
</style>