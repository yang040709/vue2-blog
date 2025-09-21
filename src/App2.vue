<template>
  <div>
    <Loading v-if="Loading" />
    <button @click="Loading = !Loading">切换显示</button>
  </div>
</template>

<script>
import Loading from "@/components/Loading";
export default {
  components: {
    Loading,
  },
  data() {
    return {
      Loading: true,
    };
  },
  mounted() {},
};
</script>

<style>
</style>


