<template>
  <div>
    <h1>1</h1>
    <div class="box">
      <Empty :text="'当前目录没有任何资源'" />
    </div>
  </div>
</template>

<script>
import Empty from "./components/Empty";

export default {
  name: "App",
  components: {
    Empty,
  },
};
</script>
<style scoped>
.box {
  width: 500px;
  height: 500px;
  margin: 0 auto;
  border: 1px solid red;
}
</style>
