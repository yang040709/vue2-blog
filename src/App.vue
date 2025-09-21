<template>
  <div class="app-container">
    <Layout>
      <template #left>
        <div class="aside">
          <SiteAside />
        </div>
      </template>
      <template #default>
        <router-view></router-view>
      </template>
    </Layout>
  </div>
</template>

<script>
import SiteAside from "./components/SiteAside";
import Layout from "./components/Layout";
export default {
  name: "App",
  components: {
    Layout,
    SiteAside,
  },
};
</script>

<style scoped lang="less">
@import url("~@/styles/mixin.less");
.app-container {
  .self-fill(fixed);
  .aside {
    width: 250px;
    height: 100%;
  }
}
</style>