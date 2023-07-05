import request from '@/utils/request'
import { Login_Reg_Data, ICaptchaData } from '@/server/user/types';

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
