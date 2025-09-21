<template>
  <img
    :src="url"
    alt=""
    class="avatar-container"
    :style="{
      width: size + 'px',
      height: size + 'px',
    }"
  />
</template>

<script>
export default {
  name: "Avatar",
  props: {
    url: {
      type: String,
      required: true,
    },
    // 让使用的人尽量方便
    size: {
      // type: Number,
      default: 150,
    },
  },
};
</script>

<style scoped>
.avatar-container {
  border-radius: 50%;
  object-fit: cover;
  display: block;
}
</style>