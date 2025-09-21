<template>
  <div class="blog-toc-container">
    <div class="title">目录</div>
    <RightList :list="tocHandled" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from "./RightList.vue";
import { debounce } from "@/utils";

export default {
  components: {
    RightList,
  },
  props: {
    toc: {
      type: Array,
    },
  },
  data() {
    return {
      selectAnchor: "",
      debouncedHandler: debounce(this.handleMainScroll, 50),
    };
  },
  computed: {
    tocHandled() {
      let handleArr = (lists = []) => {
        let newArr = lists.map((i) => {
          if (i.children) {
            i.children = handleArr(i.children);
          }
          return {
            ...i,
            isSelect: i.anchor === this.selectAnchor,
          };
        });
        return newArr;
      };
      return handleArr(this.toc);
    },
    doms() {
      const arr = [];
      let handleDoms = (arrs) => {
        arrs.forEach((i) => {
          arr.push({
            dom: document.getElementById(i.anchor),
            anchor: i.anchor,
          });
          if (i.children && i.children.length) {
            handleDoms(i.children);
          }
        });
      };
      handleDoms(this.toc);
      return arr;
    },
  },
  methods: {
    handleSelect(item) {
      location.hash = item.anchor;
    },
    handleMainScroll() {
      this.selectAnchor = "";
      const range = 100;
      this.doms.forEach((i) => {
        if (!i.dom) {
          return;
        }
        const distance = i.dom.getBoundingClientRect().top;
        if (distance < range) {
          this.selectAnchor = i.anchor;
        }
      });
    },
  },
  beforeMount() {
    this.$bus.$on("mainScroll", this.debouncedHandler);
  },
  beforeDestroy() {
    this.$bus.$off("mainScroll", this.debouncedHandler);
  },
};
</script>

<style scoped lang="less">
.blog-toc-container {
  position: relative;
  overflow-y: auto;
  width: 100%;
  padding: 20px;
  height: 100%;
  .title {
    margin-bottom: 20px;
    font-size: 1em;
    font-weight: bold;
    letter-spacing: 2px;
  }
}
</style>