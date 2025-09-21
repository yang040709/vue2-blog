import { getProject } from "@/api/project"
import { handleImgSrc } from "@/utils"

export default {
  namespaced: true,
  actions: {
    async fetchProject(ctx) {
      ctx.commit("setIsLoading", true);
      const resp = await getProject();
      resp.forEach(i => {
        i.thumb = handleImgSrc(i.thumb);
      });
      ctx.commit("setData", resp);
      ctx.commit("setIsLoading", false);
    }
  },
  mutations: {
    setIsLoading(state, playload) {
      state.isLoading = playload;
    },
    setData(state, playload) {
      state.data = playload;
    }
  },
  state: {
    isLoading: false,
    data: {},
  }
}