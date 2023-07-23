import request from '@/utils/request'


export function getUserListApi() {
  return request({
    url: '/api/userList',
    method: 'get'
  })
}
