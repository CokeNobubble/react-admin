import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { message } from 'antd';
import { getToken } from '@/utils/auth';
import { IApiRes } from '@/interface';

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json; charset=utf-8' }
})

service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getToken()
  if (token) { //如果有token
    config.headers.Authorization = token
  }
  return config
}, (error: any) => {
  return Promise.reject(error)
})

service.interceptors.response.use((response: AxiosResponse) => {
  console.log(response, 'resp')
  const { code, msg } = response.data as IApiRes
  if (code === 200) {
    return response.data
  }
  message.error(msg || '系统出错')
  return Promise.reject(new Error(msg || 'Error'))
}, (error: any) => {
  console.log(error, 'error')
  const { code, msg } = error.response.data
  if (code === 400) {
    message.error(msg || '系统出错');
  } else if (code === 401) {
    message.error(msg || 'token失效')
  }
  return Promise.reject(error.message)
})


export default service


