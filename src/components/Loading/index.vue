<template>
  <img :src="loadingUrl" alt="" class="loading-container" />
</template>

<script>
// 如果路径是动态的
import loadingUrl from "@/assets/loading.svg";

export default {
  data() {
    return {
      loadingUrl: loadingUrl,
    };
  },
};
</script>

<style lang="less" scoped>
@import url("~@/styles/mixin.less");
.loading-container {
  .self-center();
}
</style>