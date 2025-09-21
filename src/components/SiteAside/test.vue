<template>
  <div>
    <div class="box">
      <SiteAside></SiteAside>
    </div>
  </div>
</template>

<script>
// import Menu from "./components/Menu";
import SiteAside from "./components/SiteAside";
export default {
  name: "App",
  components: {
    SiteAside,
  },
};
</script>

<style scoped>
.box {
  background-color: #333;
  width: 250px;
  height: 100vh;
}
</style>