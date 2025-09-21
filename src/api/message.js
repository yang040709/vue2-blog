import request from "./request"

export async function getMessage(page = 1, limit = 10) {
  return await request({
    url: "/api/message",
    params: {
      page,
      limit,
    }
  });
}


export async function postMessage(nickname, content) {
  return await request({
    url: "/api/message",
    method: "post",
    data: {
      nickname,
      content,
    }
  });
}