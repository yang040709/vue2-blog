<template>
  <div class="not-find-container">
    <div class="content">
      <div class="left">
        <h2>404</h2>
        <p>你似乎来到了没有知识存在的荒原</p>
        <button @click="handleClick">去往首页</button>
      </div>
      <img
        src="https://static.zhihu.com/heifetz/assets/liukanshan_wire.dc5adecf.svg"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      console.log("1");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped lang="less">
.not-find-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .content {
    margin: 250px auto;
    display: flex;
    justify-content: center;
    .left {
      button {
        width: 90px;
        height: 33px;
        color: #fff;
        border: 0;
        border-radius: 3px;
        background-color: #1772f6;
      }
    }
    img {
    }
  }
}
</style>