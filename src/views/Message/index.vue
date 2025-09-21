<template>
  <div class="message-container" ref="mainContainer">
    <div class="message-content">
      <MessageArea
        :list="data.rows"
        title="留言板"
        :subTitle="`(${data.total})`"
        :isListLoading="isLoading"
        @submit="handleSubmit"
        :hasMore="hasMore"
      />
    </div>
    <ToTop />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import { mapState } from "vuex";
import ToTop from "@/components/ToTop";
import { throttle } from "@/utils";

export default {
  name: "message",
  data() {
    return {
      page: 1,
      limit: 10,
      scrollHandler: throttle(this.handleContainerScroll, 30),
    };
  },
  components: {
    MessageArea,
    ToTop,
  },
  computed: {
    ...mapState("message", ["data", "isLoading"]),
    hasMore() {
      if (this.data.total) {
        return this.data.total > this.data.rows.length;
      }
      return true;
    },
  },
  created() {
    this.$store.dispatch("message/fetchMessage", {
      page: this.page,
      limit: this.limit,
    });
  },
  methods: {
    handleContainerScroll() {
      if (this.data.rows.length >= this.data.total) {
        return;
      }
      const dom = this.$refs.mainContainer;
      if (this.isLoading === true || !dom) {
        return;
      }
      const range = 200;
      const desc = Math.abs(
        dom.scrollTop + dom.clientHeight - dom.scrollHeight
      );
      if (desc <= range) {
        this.page++;
        this.$store.dispatch("message/fetchMoreMessage", {
          page: this.page,
          limit: this.limit,
        });
      }
    },
    handleScrollTop() {
      this.$refs["mainContainer"].scrollTop = 0;
    },
    handleSubmit(obj, callback) {
      this.$store
        .dispatch("message/sendMessage", {
          content: obj.content,
          nickName: obj.nickName,
        })
        .then(() => {
          callback("非常感谢您的留言！！");
        })
        .catch(() => {
          callback("您留言的次数过多，请稍后再留言", "error");
        });
    },
  },
  mounted() {
    this.$refs["mainContainer"].addEventListener("scroll", this.scrollHandler);
    this.$bus.$on("mainScrollTop", this.handleScrollTop);
  },
  beforeDestroy() {
    this.$refs["mainContainer"].removeEventListener(
      "scroll",
      this.scrollHandler
    );
    this.$bus.$off("mainScrollTop", this.handleScrollTop);
  },
};
</script>

<style>
.message-container {
  width: 100%;
  height: 100%;
  scroll-behavior: smooth;
  overflow-y: scroll;
  overflow-x: hidden;
}
.message-content {
  width: 60%;
  margin: 0 auto;
}
</style>