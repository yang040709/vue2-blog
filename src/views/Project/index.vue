<template>
  <div class="project-container" v-loading="isLoading" ref="mainContainer">
    <ul>
      <li v-for="item in data" :key="item.id">
        <div class="item">
          <a :href="item.url">
            <img v-if="item.thumb" v-lazy="item.thumb" alt="" />
          </a>

          <div class="right">
            <a :href="item.url" class="title">{{ item.name }}</a>
            <p v-for="(desc, i) in item.description" :key="i">
              {{ desc }}
            </p>
          </div>
        </div>
      </li>
    </ul>
    <ToTop />
  </div>
</template>

<script>
import { mapState } from "vuex";
import mainScroll from "@/mixins/mainScroll";
import ToTop from "@/components/ToTop";

export default {
  name: "Project",
  mixins: [mainScroll("mainContainer")],
  components: {
    ToTop,
  },
  computed: {
    ...mapState("project", ["data", "isLoading"]),
  },
  created() {
    this.$store.dispatch("project/fetchProject");
  },
};
</script>

<style scoped lang="less">
.project-container {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;
  scroll-behavior: smooth;
  ul {
    padding: 30px;
    li {
      padding: 20px;
      .item {
        display: flex;
        overflow: hidden;
        min-width: 0;

        img {
          width: 250px;
          height: 200px;
          border-radius: 5px;
          object-fit: cover;
        }
        .right {
          padding: 6px;
          padding-left: 15px;
          flex: 1 1 0;
          .title {
            // height: 22px;
            line-height: 22px;
            font-size: 22px;
            font-weight: bold;
            margin-bottom: 25px;
          }
          p {
            overflow-wrap: break-word;
            word-break: break-word;
          }
        }
      }
      transition: all 0.3s;
      &:hover {
        box-shadow: 3px 3px 5px 0 #ccc, -3px -3px 5px 0 #ccc;
        transform: scale(1.0015) translate(0.0759064px, -0.0759064px);
      }
    }
  }
}
</style>