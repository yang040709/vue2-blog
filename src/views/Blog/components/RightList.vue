<template>
  <ul class="right-list-container">
    <li v-for="(item, i) in list" :key="i">
      <span :class="{ active: item.isSelect }" @click="handleSelect(item)">
        {{ item.name }}
      </span>
      <span
        class="aside"
        v-if="item.aside"
        @click="handleSelect(item)"
        :class="{ active: item.isSelect }"
        >{{ item.aside }}</span
      >
      <RightList
        @select="handleSelect"
        :list="item.children"
        v-if="item.children"
      />
    </li>
  </ul>
</template>

<script>
export default {
  name: "RightList",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleSelect(item) {
      this.$emit("select", item);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.right-list-container {
  li {
    min-height: 40px;
    line-height: 40px;
    cursor: pointer;
    .active {
      color: @warn;
      font-weight: bold;
    }
  }
  .right-list-container {
    margin-left: 1em;
    li {
      min-height: 40px;
      line-height: 40px;
      cursor: pointer;
      .active {
        color: @warn;
        font-weight: bold;
      }
    }
  }
}
.aside {
  margin-left: 5px;
  font-size: 12px;
  color: gray;
}
</style>