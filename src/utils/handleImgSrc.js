export const SERVE_BASE_URL = "http://localhost:7001"

export default function handleImgSrc(url) {

  if (url && url.startsWith("/static/upload/")) {
    url = SERVE_BASE_URL + url;
    return url;
  }
  else if (url && url.startsWith("/static/avatar/")) {
    url = SERVE_BASE_URL + url;
    return url;
  }
  return url;
}
