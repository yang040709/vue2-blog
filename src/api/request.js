import axios from "axios"
import { showMessage } from "@/utils";


const ins = axios.create({})

ins.interceptors.response.use((response) => {
  // console.log(response, 1);
  if (response.data.code === 0) {
    return response.data.data;
  }
  else {
    showMessage({ content: response.data.msg ? response.data.msg : "您访问了不存在的资源", type: "error", duration: 5000 })
    return null;
  }
})

export default ins;
