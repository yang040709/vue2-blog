import request from "./request"


export async function getAbout() {
  const resq = await request("/api/about");
  return resq;
}