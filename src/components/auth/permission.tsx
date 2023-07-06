import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { getToken } from '@/utils/auth';


/*
 采用高阶组件做路由守卫
 */

type RouteProps = {
  children?: React.ReactNode
}
const indexRoute = '/'
const loginRoute = '/login'

const whiteList = ['/login']
const AuthRoute: React.FC<RouteProps> = (props) => {
  const location = useLocation()
  const { children } = props
  let hasToken = getToken()
  if (hasToken) {
    // 如果有token 且在登录页直接跳转首页
    if (location.pathname === loginRoute) {
      return <Navigate to={ indexRoute }></Navigate>
    } else {
      return <>{ children }</>
    }
  } else {
    // 无token的状态下，如果跳转白名单，直接放行
    if (whiteList.indexOf(location.pathname) !== -1) {
      return <>{ children }</>
    } else {
      // 否在直接跳转登录页
      return <Navigate to={ loginRoute }></Navigate>
    }
  }
}


export default AuthRoute
