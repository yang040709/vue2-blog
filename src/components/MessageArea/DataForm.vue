<template>
  <div class="data-form-container">
    <form action="" @submit.prevent="handleSubmit">
      <div class="nick-name">
        <input
          type="text"
          maxlength="10"
          v-model="info.nickName"
          placeholder="用户昵称"
        />
        <div class="txt-num">{{ info.nickName.length }}/10</div>
        <div class="err">{{ err.nickName }}</div>
      </div>
      <div class="content" ref="content">
        <textarea
          name=""
          maxlength="300"
          id=""
          placeholder="输入内容"
          v-model="info.content"
        ></textarea>
        <div class="txt-num">{{ info.content.length }}/300</div>
        <div class="err">{{ err.content }}</div>
      </div>
      <button class="submit" :disabled="isSubimting">
        {{ isSubimting ? "提交中...." : "提交" }}
      </button>
    </form>
  </div>
</template>

<script>
import { showMessage } from "@/utils/index";

export default {
  data() {
    return {
      info: {
        nickName: "",
        content: "",
      },
      err: {
        nickName: "",
        content: "",
      },
      isSubimting: false,
    };
  },
  methods: {
    handleSubmit() {
      this.err.nickName = this.info.nickName ? "" : "昵称不能为空";
      this.err.content = this.info.content ? "" : "评论的内容不能为空";
      if (this.err.nickName || this.err.content) {
        return;
      }
      this.isSubimting = true;
      this.$emit("submit", this.info, (successMsg, mode = "success") => {
        if (mode === "success") {
          showMessage({
            content: successMsg,
            type: "success",
            duration: 1000,
            container: this.$refs.content,
            callback: () => {
              this.isSubimting = false;
              this.info.nickName = "";
              this.info.content = "";
            },
          });
        } else {
          showMessage({
            content: successMsg,
            type: "warn",
            duration: 1000,
            container: this.$refs.content,
            callback: () => {
              this.isSubimting = false;
              this.info.nickName = "";
              this.info.content = "";
            },
          });
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
@import url("~@/styles/var.less");
.data-form-container {
  margin-top: 30px;
  width: 100%;
  input,
  textarea {
    border: 1px dotted @gray;
    outline: 0;
    padding: 6px;
    border-radius: 5px;
    padding-left: 8px;
    font-size: 13px;
    font-weight: normal;
    font-family: "-apple-system", "BlinkMacSystemFont", "Roboto",
      "Helvetica Neue", "微软雅黑", sans-serif;
    position: relative;
  }
  .txt-num {
    position: absolute;
    bottom: 5px;
    right: 3px;
    color: @gray;
    font-size: 10px;
  }
  .err {
    color: @danger;
    font-size: 12px;
    line-height: 30px;
    height: 30px;
  }
  .nick-name {
    // margin: 20px;
    position: relative;
    .txt-num {
      bottom: 32px;
      right: 50%;
      transform: translate(6px, 0px);
    }
    input {
      width: 50%;
      height: 20px;
    }
  }
  .content {
    position: relative;
    .txt-num {
      bottom: 38px;
      right: -6px;
    }
    textarea {
      width: 100%;
      height: 100px;
      resize: none;
    }
  }
  .submit {
    border: 0px;
    color: #fff;
    width: 80px;
    height: 32px;
    background-color: @primary;
    border-radius: 5px;
  }
  .submit[disabled] {
    cursor: not-allowed;
    background-color: rgb(200, 224, 234);
  }
}
</style>