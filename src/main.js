import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import showMessage from "./utils/showMessage";
import vLoading from "./directives/v-loading";
import vLazy from "./directives/v-lazy";
import "./eventBus";
import "@/styles/global.less";
import "./mock";
Vue.config.productionTip = false;

Vue.prototype.$showMessage = showMessage;
Vue.directive("loading", vLoading);
Vue.directive("lazy", vLazy);

store.dispatch("setting/fetchSetting");

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
