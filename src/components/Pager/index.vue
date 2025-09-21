<template>
  <div class="pager-container" v-if="pageNumber > 1">
    <a @click="pageChange(1)" :class="{ disable: current === 1 }">|&lt;&lt;</a>
    <a @click="pageChange(current - 1)" :class="{ disable: current === 1 }"
      >&lt;&lt;</a
    >
    <a
      @click="pageChange(n)"
      v-for="(n, i) in pageArr"
      :key="i"
      :class="{ active: n === current }"
      >{{ n }}</a
    >
    <a
      @click="pageChange(current + 1)"
      :class="{ disable: current === pageNumber }"
      >&gt;&gt;</a
    >
    <a
      @click="pageChange(pageNumber)"
      :class="{ disable: current === pageNumber }"
      >&gt;&gt;|</a
    >
  </div>
</template>

<script>
export default {
  name: "Pager",
  props: {
    current: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
    limit: {
      type: Number,
      default: 10,
    },
    visibleNumber: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    pageNumber() {
      return Math.ceil(this.total / this.limit);
    },
    min() {
      let num = this.current - Math.floor(this.visibleNumber / 2);
      if (num <= 0) {
        num = 1;
      }
      return num;
    },
    max() {
      let num = this.min + this.visibleNumber - 1;
      if (num > this.pageNumber) {
        num = this.pageNumber;
      }
      return num;
    },
    pageArr() {
      const arr = [];
      for (let i = this.min; i <= this.max; i++) {
        arr.push(i);
      }
      return arr;
    },
  },
  methods: {
    pageChange(number) {
      if (number < 1) {
        number = 1;
      }
      if (number > this.pageNumber) {
        number = this.pageNumber;
      }
      if (number === this.current) {
        return;
      }
      this.$emit("pageChange", number);
    },
  },
};
</script>

<style scoped lang="less">
@import url("~@/styles/var.less");

.pager-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  a {
    margin: 0 8px;
    color: @primary;
    cursor: pointer;
    &.active {
      color: @words;
      font-weight: bold;
      cursor: text;
    }
    &.disable {
      color: @gray;
      cursor: not-allowed;
    }
  }
}
</style>