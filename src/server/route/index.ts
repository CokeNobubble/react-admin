import request from "@/utils/request";
import { Icons, MenuData } from "@/server/route/type";
import { IApiRes, IPage } from "@/interface";

export function getMenuApi(): Promise<IApiRes<MenuData[]>> {
  return request({
    url: "/routes/menu",
    method: "get",
  });
}

export function getIconsApi(): Promise<IApiRes<Icons[]>> {
  return request({
    url: "/routes/icons",
    method: "get",
  });
}

export function addMenuApi(data: MenuData) {
  return request({
    url: "/routes/addMenu",
    method: "post",
    data,
  });
}

// 获取所有路由菜单
export function getAllRoutesApi(page: IPage) {
  return request({
    url: "/routes/allRoutes",
    method: "get",
    params: page,
  });
}

// 更新路由
export function updateRouteApi(data: MenuData) {
  return request({
    url: "/routes/update",
    method: "post",
    data,
  });
}

export function removeRouteApi(data: { id: number }) {
  return request({
    url: "/routes/remove",
    method: "post",
    data,
  });
}
