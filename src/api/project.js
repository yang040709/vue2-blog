import request from "./request"

export async function getProject() {
  return await request({
    url: "/api/project",
  })
}