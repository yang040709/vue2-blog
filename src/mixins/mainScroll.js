

export default function (refValue) {
  return {
    mounted() {
      this.$refs[refValue].addEventListener("scroll", this.handleContainerScroll);
      this.$bus.$on("mainScrollTop", this.handleScrollTop);
    },
    beforeDestroy() {
      this.$bus.$emit("mainScroll");
      this.$refs[refValue].removeEventListener("scroll", this.handleContainerScroll);
      this.$bus.$off("mainScrollTop", this.handleScrollTop);
    },
    methods: {
      handleContainerScroll() {
        this.$bus.$emit("mainScroll", this.$refs[refValue]);
      },
      handleScrollTop() {
        this.$refs[refValue].scrollTop = 0;
      },
    }
  }
}

