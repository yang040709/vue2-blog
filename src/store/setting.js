import { getSetting } from "@/api/setting"
import { titleController, handleImgSrc } from "@/utils"

export default {
  namespaced: true,
  actions: {
    async fetchSetting(ctx) {
      ctx.commit("setLoading", true);
      const resp = await getSetting();
      resp.avatar = handleImgSrc(resp.avatar);
      resp.qqQrCode = handleImgSrc(resp.qqQrCode);
      resp.weixinQrCode = handleImgSrc(resp.weixinQrCode);


      ctx.commit("setData", resp)
      ctx.commit("setLoading", false);
      if (resp.favicon) {
        // <link rel="shortcut icon " type="images/x-icon" href="./favicon.ico">
        let link = document.querySelector("link[ref='shortcut icon']");
        if (link) {
          return;
        }
        link = document.createElement("link");
        link.rel = "shortcut icon";
        link.type = "images/x-icon";
        link.href = resp.favicon;
        document.querySelector("head").appendChild(link);
      }
      if (resp.siteTitle) {
        titleController.setSiteTitle(resp.siteTitle);
      }
    }
  },
  mutations: {
    setData(state, playload) {
      state.data = playload;
    },
    setLoading(state, playload) {
      state.isLoading = playload;
    }
  },
  state: {
    data: null,
    isLoading: false,
  }
}