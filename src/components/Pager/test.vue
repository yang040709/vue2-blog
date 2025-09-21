<template>
  <div>
    <h1>1</h1>
    <Pager
      @pageChange="handlePageChange"
      :total="total"
      :current="current"
    ></Pager>
  </div>
</template>

<script>
import Pager from "./";

export default {
  name: "App",
  data() {
    return {
      total: 300,
      current: 1,
    };
  },
  components: {
    Pager,
  },
  methods: {
    handlePageChange(pager) {
      this.current = pager;
    },
  },
};
</script>
<style scoped>
</style>
