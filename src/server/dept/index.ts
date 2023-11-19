import request from "@/utils/request";
import { IDeptUser } from "./type";
export function getDeptListApi() {
  return request({
    url: "/dept",
    method: "get",
  });
}

// 获取部门下的人员
export function getDepartmentUserApi(data: IDeptUser) {
  return request({
    url: "/dept/userList",
    method: "get",
    params: data,
  });
}
