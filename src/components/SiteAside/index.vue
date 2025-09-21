<template>
  <div class="site-aside-container">
    <template v-if="data">
      <Avatar :url="data.avatar" />
      <h1>{{ data.siteTitle }}</h1>
    </template>
    <Menu />
    <Contact v-if="data" />
  </div>
</template>

<script>
import Menu from "./Menu";
import Contact from "./Contact";
import Avatar from "@/components/Avatar";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("setting", ["data"]),
  },
  components: {
    Menu,
    Contact,
    Avatar,
  },
  // updated() {
  //   console.log(this.data);
  // },
};
</script>

<style scoped>
.site-aside-container {
  width: 100%;
  height: 100%;
  background-color: #202020;
  padding-top: 30px;
  overflow-y: auto;
  overflow-x: hidden;
}
.avatar-container {
  margin: 0 auto;
}
h1 {
  text-align: center;
  color: #ccc;
  font-size: 18px;
  margin: 0;
  padding: 20px 0;
  margin-bottom: 10px;
}
.contact-container {
  margin-top: 50px;
}
</style>