import { Store, install } from "vuex"
import Vue from "vue";
import setting from "./setting";
import banner from "./bannner"
import about from "./about";
import project from "./project";
import message from "./message";


if (!window.Vuex) {
  install(Vue);
}
const store = new Store({
  modules: {
    setting,
    banner,
    about,
    project,
    message,
  }
})


export default store;