import request from '@/utils/request'
import { IPage } from '@/interface';


export function getUserListApi(data: IPage) {
  return request({
    url: '/api/userList',
    method: 'get',
    params: data
  })
}
