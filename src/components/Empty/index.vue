<template>
  <div class="empty-container">
    <Icon type="empty" />
    <p>
      {{ text }}
    </p>
  </div>
</template>

<script>
import Icon from "../Icon";

export default {
  name: "Empty",
  props: {
    text: {
      type: String,
      default: "无数据",
    },
  },
  components: {
    Icon,
  },
};
</script>

<style scoped lang="less">
@import url("~@/styles/var.less");
.empty-container {
  height: 100%;
  color: @gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  .icon-container {
    font-size: 150px;
  }
  p {
    font-size: 20px;
  }
}
</style>