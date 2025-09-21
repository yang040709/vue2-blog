import loading from "@/assets/loading.svg"
import styles from "./loading.module.less"



function getLoadingImg(el) {
  return el.querySelector("img[data-role=loading]")
}

function createLoadingImg() {
  const img = document.createElement("img");
  img.src = loading;
  img.className = styles.loading;
  img.dataset.role = "loading";
  return img;
}

export default function (el, binding) {
  const loadingImg = getLoadingImg(el);
  if (binding.value) {
    if (!loadingImg) {
      const img = createLoadingImg();
      el.appendChild(img);
    }
  }
  else {
    if (loadingImg) {
      el.removeChild(loadingImg);
    }
  }
}

