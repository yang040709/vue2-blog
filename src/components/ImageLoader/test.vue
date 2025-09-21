<template>
  <div>
    <div class="box">
      <ImageLoader
        src="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?fit=crop&crop=entropy&w=3456&h=2304"
        placeholder="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?w=100"
        :duration="500"
        @load="handleLoad"
      />
    </div>
  </div>
</template>

<script>
import ImageLoader from "./components/ImageLoader";
export default {
  name: "App",
  components: {
    ImageLoader,
  },
  methods: {
    handleLoad() {
      console.log("图片加载和过渡都完成");
    },
  },
};
</script>

<style scoped>
.box {
  margin: 0 auto;
  overflow: hidden;
  width: 300px;
  height: 300px;
  object-fit: cover;
}
</style>