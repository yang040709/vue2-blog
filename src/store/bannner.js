import { getBanner } from "@/api/banner"
import { handleImgSrc } from "@/utils"

export default {
  namespaced: true,
  actions: {
    async fetchBanner(ctx) {
      ctx.commit("setIsloading", true);
      const resp = await getBanner();
      // console.log(resp, "<===resp", "1");
      resp.forEach(i => {
        i.bigImg = handleImgSrc(i.bigImg);
        i.midImg = handleImgSrc(i.midImg);
      });
      ctx.commit("setData", resp);
      ctx.commit("setIsloading", false);
    }
  },
  mutations: {
    setData(state, playload) {
      state.data = playload;
    },
    setIsloading(state, playload) {
      state.isLoading = playload;
    }
  },
  state: {
    isLoading: false,
    data: {},
  }
}