<template>
  <div class="message-area-container">
    <DataForm @submit="handleSubmit" />
    <div class="list-title">
      <span class="title" v-if="title">{{ title }}</span>
      <span class="subTitle" v-show="subTitle && !isListLoading">{{
        subTitle
      }}</span>
    </div>
    <DataList v-if="list" :list="list" />
    <div class="loading" v-loading="isListLoading"></div>
    <div class="bottombar" v-if="!hasMore && !isListLoading">
      没有更多的评论
    </div>
  </div>
</template>

<script>
import DataForm from "./DataForm.vue";
import DataList from "./DataList.vue";

export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    subTitle: {
      type: String,
      default: "",
    },
    list: {
      type: Array,
      default: () => [],
    },
    isListLoading: {
      type: Boolean,
      default: false,
    },
    hasMore: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    DataForm,
    DataList,
  },
  methods: {
    handleSubmit(info, callback) {
      this.$emit("submit", info, callback);
    },
  },
};
</script>

<style scoped lang="less">
.list-title {
  margin: 25px 0;
}
.subTitle {
  margin: 0 5px;
}
.loading {
  position: relative;
  height: 100px;
}
.bottombar {
  margin-top: -60px;
  text-align: center;
  font-size: 12px;
  color: gray;
}
</style>