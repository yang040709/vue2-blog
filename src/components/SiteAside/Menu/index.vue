<template>
  <div class="menu-container">
    <div class="items">
      <router-link
        v-for="item in menuData"
        :key="item.href"
        :to="{ name: item.name }"
        :exact="item.exact"
      >
        <Icon :type="item.iconType" /> {{ item.content }}
      </router-link>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon";

export default {
  name: "Menu",
  data() {
    return {
      menuData: [
        {
          name: "home",
          iconType: "home",
          content: "首页",
          exact: true,
        },
        {
          name: "blog",
          iconType: "blog",
          content: "文章",
          exact: false,
        },
        {
          name: "about",
          iconType: "about",
          content: "关于我",
          exact: true,
        },
        {
          name: "project",
          iconType: "code",
          content: "项目&效果",
          exact: true,
        },
        {
          name: "message",
          iconType: "chat",
          content: "留言板",
          exact: true,
        },
      ],
    };
  },
  methods: {
    /* isSelected(item) {
      var link = item.href.toLowerCase();
      var curPathname = location.pathname.toLowerCase();
      if (item.startWith) {
        return curPathname.startsWith(link);
      }
      return link === curPathname;
    }, */
  },
  components: {
    Icon,
  },
};
</script>

<style scoped lang="less">
@import url(~@/styles/var.less);
.menu-container {
  .items {
    overflow: auto;
    a {
      padding: 4px;
      padding-left: 30px;
      color: @gray;
      font-size: 18px;
      line-height: 30px;
      // width: 100%;
      display: flex;
      align-items: center;
      &.router-link-active {
        background-color: rgba(255, 255, 255, 0.1);
        a {
          color: #fff;
        }
      }
      .icon-container {
        margin: 5px;
      }
    }
  }
}
</style>