import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { message } from 'antd';
import { getToken } from '@/utils/auth';
import { IApiRes } from '@/interface';
import { Navigate, } from 'react-router-dom';

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json; charset=utf-8', },
});

service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();
      if (token) {
        //如果有token
        config.headers.Authorization = `Bearer ${ token }`;
      }
      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    }
);

service.interceptors.response.use(
    (response: AxiosResponse) => {
      console.log(response, 'resp');
      const { code, msg } = response.data as IApiRes<any>;
      if (code !== 0) {

      } else {
        console.log(response.data)
        return response.data;
      }
    },
    (err: any) => {
      console.log(err, 'error');
      const { status, data } = err.response;
      switch (status) {
        case 400:
          err.message = data.msg;
          break;
        case 401:
          err.message = '未授权，请登录';
          localStorage.clear();
          return <Navigate to={ '/login' }></Navigate>;
        case 403:
          err.message = '拒绝访问';
          break;
        case 404:
          err.message = `请求地址出错: ${ err.response.config.url }`;
          break;
        case 408:
          err.message = '请求超时';
          break;
        case 500:
          err.message = '服务器内部错误';
          break;
        case 501:
          err.message = '服务未实现';
          break;
        case 502:
          err.message = '请稍等，系统正在更新…';
          break;
        case 503:
          err.message = '服务不可用';
          break;
        case 504:
          err.message = '网关超时';
          break;
        case 505:
          err.message = 'HTTP版本不受支持';
          break;
        default:
      }
      message.error(err.message);
      return Promise.reject(err);
    }
);

export default service


