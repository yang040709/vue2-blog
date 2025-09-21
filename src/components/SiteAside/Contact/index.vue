<template>
  <div class="contact-container">
    <div class="item">
      <Icon type="github" />
      <a :href="data.github"> {{ data.githubName }} </a>
    </div>
    <div class="item">
      <Icon type="mail" />
      <a :href="emailURl"> {{ data.mail }}</a>
    </div>
    <div class="item">
      <div class="qr-code">
        <img :src="data.qqQrCode" alt="" />
      </div>
      <Icon type="qq" />
      <a :href="qqURl"> {{ data.qq }}</a>
    </div>
    <div class="item">
      <div class="qr-code">
        <img :src="data.weixinQrCode" alt="" />
      </div>
      <Icon type="weixin" class="weixin-icon" />
      <a href="">{{ data.weixin }}</a>
    </div>
  </div>
</template>


<script>
import Icon from "@/components/Icon";
import { mapState } from "vuex";

export default {
  name: "Contact",
  components: {
    Icon,
  },
  computed: {
    ...mapState("setting", ["data"]),
    emailURl() {
      return `mailto:${this.data.mail}@qq.com`;
    },
    qqURl() {
      return `tencent://message/?Menu=yes&uin=${this.data.qq}&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`;
    },
  },
};
</script>

<style scoped lang="less">
@import url(~@/styles/var.less);

.qr-code {
  position: absolute;
  bottom: 42px;
  width: 200px;
  height: 200px;
  opacity: 0;
  left: 50%;
  transform: translate(-50%, 0) scale(1, 0);
  transform-origin: bottom center;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s;
  img {
    width: 150px;
    height: 150px;
  }
  &::after {
    content: "";
    border: 10px solid transparent;
    border-top: 10px solid #fff;
    position: absolute;
    bottom: -19px;
    left: 50%;
    transform: translate(-50%, 0);
  }
}

.contact-container {
  padding-left: 12px;
  .item {
    position: relative;
    display: grid;
    grid-template-columns: 34px 1fr;
    justify-items: flex-start;
    align-items: center;
    gap: 6px;
    width: 100%;

    .icon-container {
      margin: 6px;
      font-size: 25px;
      color: @gray;
    }
    .weixin-icon {
      font-size: 30px;
      transform: translateX(-2.5px);
    }
    a {
      color: @gray;
      vertical-align: middle;
      font-size: 14px;
    }
    &:hover {
      .icon-container,
      a {
        color: @primary;
      }
      .qr-code {
        transform: translate(-50%, 0) scale(1, 1);
        display: flex;
        height: 200px;
        opacity: 1;
      }
    }
  }
}
</style>