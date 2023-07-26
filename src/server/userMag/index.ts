import request from '@/utils/request'
import { IPage } from '@/interface';
import { ISearchUserData, IUpdateUserData } from '@/server/userMag/type';


/**
 * 获取用户列表
 * @param data
 */
export function getUserListApi(data: IPage) {
  return request({
    url: '/api/userList',
    method: 'get',
    params: data
  })
}

/**
 * 编辑用户
 * @param data
 */
export function updateUserApi(data: IUpdateUserData) {
  return request({
    url: '/api/userinfo/update',
    method: 'post',
    data
  })
}

export function searchUserApi(data: ISearchUserData) {
  return request({
    url: '/api/userinfo/search',
    method: 'post',
    data
  })
}
