import request from '@/utils/request';


export function getIconsApi() {
  return request({
    url: '/icons',
    method: 'get',
  })
}
