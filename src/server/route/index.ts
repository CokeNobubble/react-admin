import request from '@/utils/request';
import { Icons, MenuData } from '@/server/route/type';
import { IApiRes } from '@/interface';


export function getMenuApi(): Promise<IApiRes<MenuData[]>> {
  return request({
    url: '/routes/menu',
    method: 'get',
  })
}

export function getIconsApi(): Promise<IApiRes<Icons[]>> {
  return request({
    url: '/routes/icons',
    method: 'get',
  })
}

export function addMenuApi(data: MenuData) {
  return request({
    url: '/routes/addMenu',
    method: 'post',
    data
  })
}
