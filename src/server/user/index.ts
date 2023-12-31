import request from '@/utils/request'
import { Login_Reg_Data, ICaptchaData, IAvatarData, IRemoveData, IRouteData } from '@/server/user/type';

export function loginApi(data: Login_Reg_Data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function registerApi(data: Login_Reg_Data) {
  return request({
    url: '/auth/register',
    method: 'post',
    data
  })
}

// 获取验证码
export function getCaptchaApi(data: ICaptchaData) {
  return request({
    url: '/auth/captcha',
    method: 'get',
    params: data
  })
}


// 上传头像 通过base64
export function updateAvatar(data: IAvatarData) {
  return request({
    url: '/userinfo/updateAvatar',
    method: 'post',
    data
  })
}

// 获取用户信息
export function getUserinfoApi() {
  return request({
    url: '/user',
    method: 'get',
  })
}

export function removeUserApi(data: IRemoveData) {
  return request({
    url: '/user/remove',
    method: 'delete',
    data
  })
}


export function getRoutesApi(data: IRouteData) {
  return request({
    url: '/routes',
    method: 'get',
    params:data
  })
}
