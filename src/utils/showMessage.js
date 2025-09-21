import getComponentRootDom from "./getComponentRootDom"
import Icon from "@/components/Icon"
import styles from "./showMessage.module.less"

/**
 * 
 * @param {*} content 消息内容 
 * @param {*} type 消息类型 
 * info error success warn
 * @param {*} duration 多久后消息
 * @param {*} container 容器，消息会显示上容器的正中，不传则在页面中间
 * @param {*} callback 执行后的回调函数
 */

export default function (options = {}) {
  const content = options.content || "";
  const type = options.type || "info";
  const duration = options.duration || 2000;
  const container = options.container || document.body;


  const div = document.createElement("div");
  const iconDom = getComponentRootDom(Icon, { type });

  div.innerHTML = `<span class="${styles.icon}"> ${iconDom.outerHTML} ${content}</span>`
  div.className = `${styles.message} ${styles["message-" + type]}`;

  if (getComputedStyle(container).position === "static") {
    container.style.position = "relative";
  }


  container.appendChild(div);
  // 浏览器强行渲染
  // 导致重排
  div.clientHeight;
  div.style.opacity = 1;
  div.style.transform = "translate(-50%, -50%)"


  setTimeout(() => {
    div.style.opacity = 0;
    div.style.transform = "translate(-50%, -50%) translateY(-25px)"
    div.addEventListener("transitionend", () => {
      div.remove();
      options.callback && options.callback();
    }, { once: true })
  }, duration)
}
