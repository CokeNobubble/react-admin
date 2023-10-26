import request from "@/utils/request";

export function getDeptListApi() {
  return request({
    url: "/department",
    method: "get",
  });
}
