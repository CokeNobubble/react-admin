import request from '@/utils/request'
import { Login_Reg_Data, ICaptchaData, IAvatarData } from '@/server/user/types';

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
    url: '/api/userinfo/updateAvatar',
    method: 'post',
    data
  })
}

// 获取用户信息
export function getUserinfoApi() {
  return request({
    url: '/api/userinfo',
    method: 'get',
  })
}
