<template>
  <div class="data-list-container">
    <div class="item" v-for="item in list" :key="item.id">
      <div class="left">
        <Avatar :size="35" :url="item.avatar" />
      </div>
      <div class="right">
        <div class="username">{{ item.nickname }}</div>
        <div class="content">
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar";
export default {
  props: ["list"],
  components: {
    Avatar,
  },
};
</script>

<style scoped lang="less">
@import url(~@/styles/var.less);
.data-list-container {
  position: relative;
  margin-top: 10px;
  .item {
    display: flex;
    border-bottom: 1px solid #ccc;
    padding: 13px 0;
    .left {
      width: 50px;
    }
    .right {
      flex: 1;
      .username {
        color: rgb(88, 133, 20);
        font-size: 14px;
        margin-bottom: 6px;
      }
      .content {
        font-size: 12px;
        font-weight: 500;
      }
    }
  }
}
</style>