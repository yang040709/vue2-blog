<template>
  <div class="about-container" v-loading="isLoading || !srcLoaded">
    <iframe
      class="about-content"
      :src="data"
      frameborder="0"
      @load="srcLoaded = true"
    ></iframe>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "About",
  data() {
    return {
      srcLoaded: false,
    };
  },
  computed: {
    ...mapState("about", ["data", "isLoading"]),
  },
  created() {
    this.$store.dispatch("about/fetchAbout");
  },
};
</script>

<style scoped lang="less">
.about-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.about-content {
  width: 100%;
  height: 100%;
  display: block;
  box-sizing: border-box;
}
</style>