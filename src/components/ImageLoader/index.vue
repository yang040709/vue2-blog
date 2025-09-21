<template>
  <div class="image-loader-container">
    <img v-if="!isDurationEnd" class="placeholder" :src="placeholder" />
    <img
      @load="originLoaded"
      :src="src"
      :style="{
        opacity: opacityNum,
        transition: duration + 'ms',
      }"
    />
  </div>
</template>

<script>
export default {
  name: "ImageLoader",
  data() {
    return {
      isLoaded: false,
      isDurationEnd: false,
    };
  },
  props: {
    src: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 500,
    },
  },
  computed: {
    opacityNum() {
      return this.isLoaded ? 1 : 0;
    },
  },
  methods: {
    originLoaded() {
      this.isLoaded = true;
      setTimeout(() => {
        this.isDurationEnd = true;
        this.$emit("load");
      }, this.duration);
    },
  },
};
</script>

<style scoped lang="less">
@import url("~@/styles/mixin.less");

.image-loader-container {
  position: relative;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    .self-fill();
  }
  .placeholder {
    filter: blur(2em);
  }
  transition: all 1s;
}
</style>