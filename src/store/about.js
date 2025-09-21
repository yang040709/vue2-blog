import { getAbout } from "@/api/about"


export default {
  namespaced: true,
  actions: {
    async fetchAbout(ctx) {
      ctx.commit("setIsLoading", true);
      const resq = await getAbout();
      ctx.commit("setData", resq);
      ctx.commit("setIsLoading", false);

    }
  },
  mutations: {
    setData(state, playload) {
      state.data = playload
    },
    setIsLoading(state, playload) {
      state.isLoading = playload;
    }
  },
  state: {
    data: {},
    isLoading: false,
  }
}