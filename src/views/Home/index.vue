<template>
  <div
    v-loading="isLoading"
    class="home-container"
    ref="container"
    @wheel="handleWheel"
  >
    <!-- 类似于轮播图 -->

    <ul
      class="carousel-items"
      :style="{
        marginTop,
      }"
      @transitionend="handleTransitionend"
    >
      <li v-for="item in data" :key="item.id">
        <Carouselitem
          :description="item.description"
          :title="item.title"
          :midImg="item.midImg"
          :bigImg="item.bigImg"
          ref="banner"
        />
      </li>
    </ul>
    <div @click="switchTo(index - 1)" class="icon icon-up" v-show="index >= 1">
      <Icon type="arrowUp" />
    </div>
    <div
      @click="switchTo(index + 1)"
      class="icon icon-down"
      v-show="index < data.length - 1"
    >
      <Icon type="arrowDown" />
    </div>
    <ul class="indicator">
      <li
        @click="switchTo(i)"
        v-for="(item, i) in data"
        :key="item.id"
        :class="{ active: i === index }"
      ></li>
    </ul>
  </div>
</template>

<script>
import Carouselitem from "./Carouselitem.vue";
import Icon from "@/components/Icon";
import { mapState } from "vuex";
// import { getBanner } from "@/api/banner";

export default {
  name: "Home",
  // mixins: [fetchData([])],
  data() {
    return {
      index: 0, //当前显示第几张轮播图
      containerHeight: 0,
      switching: false,
    };
  },
  components: {
    Carouselitem,
    Icon,
  },
  methods: {
    // async fetchData() {
    //   return await getBanner();
    // },
    switchTo(i) {
      if (this.index === i) {
        return;
      }
      this.$refs.banner[i].showWords();
      this.index = i;
    },
    handleWheel(e) {
      if (this.switching) {
        return;
      }
      if (e.deltaY < -5 && this.index > 0) {
        this.switching = true;
        this.switchTo(this.index - 1);
      } else if (e.deltaY > 5 && this.index < this.data.length - 1) {
        this.switching = true;
        this.switchTo(this.index + 1);
      }
    },
    handleTransitionend() {
      this.switching = false;
    },
    handleResize() {
      this.containerHeight = this.$refs.container.clientHeight;
    },
  },
  computed: {
    marginTop() {
      return -this.index * this.containerHeight + "px";
    },
    ...mapState("banner", ["data", "isLoading"]),
  },
  async created() {
    await this.$store.dispatch("banner/fetchBanner");
  },
  mounted() {
    this.containerHeight = this.$refs.container.clientHeight;
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style lang="less" scoped>
@import url("~@/styles/mixin.less");
@import url("~@/styles/var.less");

@jump: 5px;

.home-container {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: @dark;

  // width: 500px;
  // height: 400px;
  // overflow: scroll;
  // margin: 100px auto;
}
.icon {
  font-size: 30px;
  color: @gray;
  .self-center();
  transform: translateX(-50%);
  cursor: pointer;
  &.icon-up {
    top: 15px;
    animation: jump-up 2s infinite;
  }
  &.icon-down {
    top: auto;
    bottom: 15px;
    animation: jump-down 2s infinite;
  }
  @keyframes jump-up {
    0% {
      transform: translate(-50%, @jump);
    }
    50% {
      transform: translate(-50%, -@jump);
    }
    100% {
      transform: translate(-50%, @jump);
    }
  }
  @keyframes jump-down {
    0% {
      transform: translate(-50%, -@jump);
    }
    50% {
      transform: translate(-50%, @jump);
    }
    100% {
      transform: translate(-50%, -@jump);
    }
  }
}

.indicator {
  .self-center();
  li {
    width: 5px;
    height: 5px;
    border: 1px solid #fff;
    border-radius: 50%;
    margin: 8px;
    // background-color: @gray;
    cursor: pointer;
    &.active {
      background-color: #fff;
    }
  }
  right: 1vw;
  left: auto;
  display: flex;
  flex-direction: column;
  transform: translate(0, -50%);
}

.carousel-items {
  // overflow: hidden;
  width: 100%;
  height: 100%;
  transition: all 0.5s;
  li {
    width: 100%;
    height: 100%;
    // background-color: red;
  }
}
</style>