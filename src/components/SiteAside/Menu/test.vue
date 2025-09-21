<template>
  <div>
    <div class="box">
      <Menu></Menu>
    </div>
  </div>
</template>

<script>
import Menu from "./components/Menu";

export default {
  name: "App",
  components: {
    Menu,
  },
};
</script>

<style scoped>
.box {
  background-color: #333;
  width: 500px;
  height: 500px;
}
</style>