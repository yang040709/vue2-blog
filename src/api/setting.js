import requset from "./request"

export async function getSetting() {
  const resq = await requset("/api/setting");
  return resq;
}