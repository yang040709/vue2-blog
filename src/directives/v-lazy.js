import eventBus from "@/eventBus"
import { debounce } from "@/utils"
import defaultGif from "@/assets/default.gif"


/* 
图片加入到dom节点的时候加入数组，
进行第一次处理，在视口范围内就加载，不能就使用默认加载图片，如果能加载就从数组移除，
后面由于事件总线，页面滚动会触发图片的处理，处理的情况与上面一致


*/

let imgs = [];


function setImage(img) {
  img.dom.src = defaultGif;

  const clinetHeight = document.documentElement.clientHeight;
  const rect = img.dom.getBoundingClientRect()

  if (rect.top >= -rect.height && rect.top <= clinetHeight + 500) {
    const tempImg = new Image()
    tempImg.onload = function () {
      img.dom.src = img.src;
    }
    tempImg.src = img.src;
    imgs = imgs.filter(i => i !== img);
  }

}

function setImages() {
  for (const img of imgs) {
    setImage(img);
  }
}

function handleScroll() {
  setImages();
}

// 提供事件总线来触发事件
eventBus.$on("mainScroll", debounce(handleScroll, 50))


export default {
  inserted(el, bindings) {
    const img = {
      dom: el,
      src: bindings.value,
    };
    imgs.push(img);
    setImage(img);
  },
  unbind(el) {
    imgs = imgs.filter(img => img.dom !== el)
  }
}
