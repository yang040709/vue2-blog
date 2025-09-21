<template>
  <div
    class="carouselitem-container"
    ref="container"
    @mousemove="handleMousemove"
    @mouseleave="handleMouseleave"
  >
    <div class="carousel-img" ref="image" :style="imagePositon">
      <ImageLoader :src="bigImg" :placeholder="midImg" @load="this.showWords" />
    </div>
    <div ref="title" class="title">{{ title }}</div>
    <div ref="desc" class="description">{{ description }}</div>
  </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader";
export default {
  props: {
    description: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    midImg: {
      type: String,
      required: true,
    },
    bigImg: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      containerSize: null,
      innerSize: null,
      // 鼠标相对于容器
      mouseX: 0,
      mouseY: 0,
    };
  },
  components: {
    ImageLoader,
  },
  methods: {
    showWords() {
      this.$refs.title.classList.add("text-animation");
      this.$refs.desc.classList.add("text-animation");
      setTimeout(() => {
        if (this.$refs.title && this.$refs.desc) {
          this.$refs.title.classList.remove("text-animation");
          this.$refs.desc.classList.remove("text-animation");
          this.$refs.title.style.opacity = 1;
          this.$refs.desc.style.opacity = 1;
        }
      }, 1000);
    },

    setSizes() {
      this.containerSize = {
        width: this.$refs.container.clientWidth,
        height: this.$refs.container.clientHeight,
      };
      this.innerSize = {
        width: this.$refs.image.clientWidth,
        height: this.$refs.image.clientHeight,
      };
    },
    handleMousemove(e) {
      const rect = this.$refs.container.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    },
    handleMouseleave() {
      this.mouseX = this.center.x;
      this.mouseY = this.center.y;
    },
  },

  computed: {
    imagePositon() {
      if (!this.innerSize || !this.containerSize) {
        return;
      }
      const extraWidth = this.innerSize.width - this.containerSize.width;
      const extraHeight = this.innerSize.height - this.containerSize.height;
      const left = (-extraWidth / this.containerSize.width) * this.mouseX;
      const top = (-extraHeight / this.containerSize.height) * this.mouseY;
      return {
        transform: `translate(${left}px, ${top}px)`,
      };
    },
    center() {
      return {
        x: this.containerSize.width / 2,
        y: this.containerSize.height / 2,
      };
    },
  },
  mounted() {
    this.setSizes();
    this.mouseX = this.center.x;
    this.mouseY = this.center.y;
    window.addEventListener("resize", this.setSizes);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setSizes);
  },
};
</script>

<style scoped lang="less">
@import url("~@/styles/var.less");
@import url("~@/styles/mixin.less");

.text-animation {
  animation: text-width 2s;
}

@keyframes text-width {
  0% {
    width: 0;
    opacity: 0;
  }
  100% {
    opacity: 1;
    width: 500px;
  }
}

.carouselitem-container {
  position: relative;
  width: 100%;
  height: 100%;
  color: lighten(@gray, 10%);
  background-color: @dark;
  overflow: hidden;
  .carousel-img {
    transition: 1s;
    position: absolute;
    left: 0;
    top: 0;
    // top: 0;
    // z-index: 1;
    width: 110%;
    height: 110%;
  }

  .title,
  .description {
    // width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-shadow: 1px 0 0 rgba(0, 0, 0, 0.5), -1px 0 0 rgba(0, 0, 0, 0.5),
      0 1px 0 rgba(0, 0, 0, 0.5), 0 -1px 0 rgba(0, 0, 0, 0.5);
  }

  .title {
    opacity: 0;
    position: absolute;
    top: calc(50% - 40px);
    left: 60px;
    font-size: 25px;
    font-weight: bold;
  }
  .description {
    opacity: 0;
    position: absolute;
    top: calc(50% + 20px);
    font-weight: bold;
    left: 60px;
  }
}
</style>