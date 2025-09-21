<template>
  <div class="blog-container">
    blog
    <RightList :list="list" @select="handleSelect"></RightList>
  </div>
</template>

<script>
import RightList from "./components/RightList.vue";

export default {
  name: "Blog",
  data() {
    return {
      list: [
        {
          name: "1",
          children: [
            {
              name: "1-1",
              isSelect: true,
              children: [{ name: "1-1-1" }, { name: "1-2-2" }],
            },
            { name: "1-2" },
          ],
        },
        { name: "2" },
      ],
    };
  },
  components: {
    RightList,
  },
  methods: {
    handleSelect(item) {
      console.log(item);
    },
  },
};
</script>

<style lang="less" scoped>
</style>