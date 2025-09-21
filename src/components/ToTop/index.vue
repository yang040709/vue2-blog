<template>
  <div class="to-top" @click="handleClick" v-show="isShow" ref="toTop">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      aria-hidden="true"
      class="Zi Zi--BackToTop"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M13.204 3.107a1.75 1.75 0 0 0-2.408 0L3.806 9.73c-1.148 1.088-.378 3.02 1.204 3.02h2.24V20c0 .966.784 1.75 1.75 1.75h6A1.75 1.75 0 0 0 16.75 20v-7.25h2.24c1.582 0 2.353-1.932 1.204-3.02l-6.99-6.623Z"
        clip-rule="evenodd"
      ></path>
    </svg>
  </div>
</template>

<script>
import { debounce } from "@/utils";
import "@/styles/animation.less";

export default {
  data() {
    return {
      isShow: false,
      debounceHandle: debounce(this.handleScroll, 100),
      isHandling: false,
    };
  },
  methods: {
    handleClick() {
      this.$bus.$emit("mainScrollTop");
    },
    handleScroll(dom) {
      if (!dom) {
        return;
      }
      if (this.isHandling) {
        return;
      }
      if (dom.scrollTop < 500 && this.isShow === true) {
        this.$refs.toTop.style.animation = "leave 0.5s";
        this.isHandling = true;
        setTimeout(() => {
          this.isShow = false;
          this.isHandling = false;
        }, 500);
        return;
      } else if (this.isShow === true) {
        return;
      } else {
        if (dom.scrollTop > 500) {
          this.$refs.toTop.style.animation = "show 0.5s";
          this.isShow = true;
        }
      }
    },
  },
  created() {
    this.$bus.$on("mainScroll", this.debounceHandle);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.debounceHandle);
  },
};
</script>

<style lang="less" scoped>
.to-top {
  position: fixed;
  right: 20px;
  bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #eee;
  color: rgb(132, 145, 165);
  z-index: 99;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px;
  // animation: show 0.5s;
  transition: all 0.5s;
  &:hover {
    background: rgb(196, 199, 206);
  }
}
</style>