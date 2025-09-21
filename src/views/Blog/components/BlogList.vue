<template>
  <div class="blog-list-container" v-loading="isLoading" ref="mainContainer">
    <ul>
      <li v-for="item in data.rows" :key="item.id">
        <div class="thumb" v-if="item.thumb">
          <router-link
            :to="{
              name: 'blogDetail',
              params: {
                id: item.id,
              },
            }"
          >
            <img v-lazy="item.thumb" :alt="item.title" :title="item.title" />
          </router-link>
        </div>
        <div class="main">
          <router-link
            :to="{
              name: 'blogDetail',
              params: {
                id: item.id,
              },
            }"
          >
            <h2>{{ item.title }}</h2>
          </router-link>
          <div class="aside">
            <span>日期：{{ formatDate(item.createDate) }}</span>
            <span>浏览：{{ item.scanNumber }}</span>
            <span>评论{{ item.commentNumber }}</span>
            <router-link
              :to="{
                name: 'categoryBlog',
                params: {
                  categoryId: item.category ? item.category.id : '-1',
                },
              }"
              >{{ item.category ? item.category.name : "无分类" }}</router-link
            >
            <!-- <a href="/blog/cate/8" class="">{{ item.category.name }}</a> -->
          </div>
          <div class="desc">
            {{ item.description }}
          </div>
        </div>
      </li>
    </ul>
    <Empty v-if="data.total === 0" />
    <Pager
      @pageChange="handlePageChange"
      :current="routeInfo.page"
      :total="data.total"
      :limit="routeInfo.limit"
      :visibleNumber="visibleNumber"
    />
    <!-- 分页放到这里 -->
    <ToTop />
  </div>
</template>

<script>
import { getBlog } from "@/api/blog";
import Pager from "@/components/Pager";
import fetchData from "@/mixins/fetchData";
import mainScroll from "@/mixins/mainScroll";
import { formatDate } from "@/utils";
import ToTop from "@/components/ToTop";
import Empty from "@/components/Empty";
import { handleImgSrc } from "@/utils";
/* 
必须是监听路由的变化来获取数据的，不能一上来就获取数据
*/
export default {
  data() {
    return {
      visibleNumber: 10,
    };
  },
  mixins: [fetchData([]), mainScroll("mainContainer")],
  components: {
    Pager,
    ToTop,
    Empty,
  },
  methods: {
    async fetchData() {
      const resp = await getBlog(
        this.routeInfo.page,
        this.routeInfo.limit,
        this.routeInfo.categoryId
      );
      if (!resp) {
        this.$router.push("/404");
        return;
      }
      resp.rows.forEach((e) => {
        e.thumb = handleImgSrc(e.thumb);
      });
      return resp;
    },

    handlePageChange(newPage) {
      const query = {
        page: newPage,
        limit: this.routeInfo.limit,
      };
      // 跳转到当前的分类id，页容量，页码
      if (this.routeInfo.categoryId === -1) {
        this.$router.push({
          name: "blog",
          query,
        });
      } else {
        this.$router.push({
          name: "categoryBlog",
          params: {
            categoryId: this.routeInfo.categoryId,
          },
          query,
        });
      }
    },
    formatDate,
  },
  computed: {
    // 获取路由信息
    routeInfo() {
      const categoryId = this.$route.params.categoryId || -1;
      const page = +this.$route.query.page || 1;
      const limit = +this.$route.query.limit || 10;
      return {
        categoryId,
        page,
        limit,
      };
    },
  },
  watch: {
    // 观察数据
    // route也会赋值新的对象
    async $route() {
      this.isLoading = true;
      this.$refs.mainContainer.scrollTop = 0;
      this.data = await this.fetchData();

      this.isLoading = false;
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.blog-list-container {
  scroll-behavior: smooth;
  line-height: 1.7;
  position: relative;
  padding: 20px;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
li {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid @gray;
  .thumb {
    flex: 0 0 auto;
    margin-right: 15px;
    img {
      display: block;
      max-width: 200px;
      border-radius: 5px;
    }
  }
  .main {
    flex: 1 1 auto;
    h2 {
      margin: 0;
    }
  }
  .aside {
    font-size: 12px;
    color: @gray;
    span {
      margin-right: 15px;
    }
  }
  .desc {
    margin: 15px 0;
    font-size: 14px;
  }
}
</style>
