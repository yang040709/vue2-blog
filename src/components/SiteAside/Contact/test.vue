<template>
  <div>
    <div class="box">
      <Contact />
    </div>
  </div>
</template>

<script>
import Contact from "./components/Contact";
export default {
  name: "App",
  components: {
    Contact,
  },
};
</script>

<style scoped lang="less">
@import url(./styles/var.less);

.box {
  margin-top: 400px;
  width: 400px;
  background-color: #333;
  height: 300px;
}
</style>