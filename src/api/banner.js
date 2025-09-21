import request from "./request"


async function getBanner() {
  const res = await request({
    url: "/api/banner",
  })
  return res;
}

export { getBanner };

// getUserInfo().then(data => {
//   console.log(data);
// })


