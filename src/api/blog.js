import request from "./request"

export async function getBlog(page = 1, limit = 10, categoryid = -1) {


  return await request({
    url: "/api/blog",
    params: {
      page,
      limit,
      categoryid
    }
  })
}

export async function getBlogType() {
  return await request({
    url: "/api/blogtype",
  })
}


export async function getBlogDetail(id) {
  return await request({
    url: `/api/blog/${id}`,
  })
}

export async function postComment(commentInfo) {
  return await request.post("/api/comment", commentInfo)
  // console.log(commentInfo);
  // const res = await request.post("/api/comment", commentInfo)
  // console.log("res=>", res);
  // return {
  //   "id": "60a3b7c6b1e1a40b9c29b0aaAAdsadsa4d5",
  //   "nickname": "评论者昵称",
  //   "content": "评论内容",
  //   "createDate": 1621234567890,
  //   "blogId": "60a3b7c6b1e1a40b9c29b0a6"

  // };
}

export async function getCommnet(blogid, page = 1, limit = 10) {
  return await request.get("/api/comment", {
    params: {
      blogid,
      page,
      limit,
    }
  })
}