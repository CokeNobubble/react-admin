import request from '@/utils/request'
import { IExportData, ISearchUserData, IUpdateUserData } from '@/server/userMag/type';


/**
 * 获取用户列表
 * @param data
 */
export function getUserListApi(data: ISearchUserData) {
  return request({
    url: '/user/list',
    method: 'get',
    params: data
  })
}


/**
 *
 * @param id 用户id
 * @param data 更新内容
 */
export function updateUserApi(id: number, data: IUpdateUserData) {
  return request({
    url: `/user/${ id }`,
    method: 'patch',
    data
  })
}

export function exportExcelApi(data: IExportData) {
  return request({
    url: '/user/exportExcel',
    method: 'get',
    params: data
  })
}
