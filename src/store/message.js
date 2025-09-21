import { getMessage, postMessage } from "@/api/message"
import { handleImgSrc, showMessage } from "@/utils"

export default {
  namespaced: true,
  actions: {
    async fetchMessage(ctx, playload) {
      ctx.commit("setIsLoading", true);
      const resp = await getMessage(playload.page, playload.limit);

      resp.rows.forEach(i => {
        i.avatar = handleImgSrc(i.avatar);
      });

      ctx.commit("setData", resp);
      ctx.commit("setIsLoading", false);
    },
    async sendMessage(ctx, playload) {
      ctx.commit("setIsLoading", true);
      const resp = await postMessage(playload.nickName, playload.content);
      if (!resp) {

        ctx.commit("setIsLoading", false);
        return Promise.reject("No");
      }
      resp.avatar = handleImgSrc(resp.avatar);
      ctx.commit("addData", resp);
      ctx.commit("setIsLoading", false);
      return Promise.resolve("OK");
    },
    async fetchMoreMessage(ctx, playload) {
      ctx.commit("setIsLoading", true);
      const resp = await getMessage(playload.page, playload.limit);
      resp.rows.forEach(i => {
        i.avatar = handleImgSrc(i.avatar);
      });
      ctx.commit("setMoreData", resp);
      ctx.commit("setIsLoading", false);
    }
  },
  mutations: {
    setIsLoading(state, playload) {
      state.isLoading = playload;
    },
    setData(state, playload) {
      state.data = playload;
    },
    addData(state, playload) {
      state.data.rows.unshift(playload);
    },
    setMoreData(state, playload) {
      state.data.total = playload.total;
      const newRows = playload.rows.filter(newItem =>
        !state.data.rows.some(existingItem => existingItem.id === newItem.id)
      );
      state.data.rows = state.data.rows.concat(newRows);
    },
  },
  state: {
    isLoading: false,
    data: {},
  }
}