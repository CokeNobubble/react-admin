import React, { useEffect } from 'react'
import { useLocation, useNavigate  } from 'react-router-dom';
import { getToken, getUserinfo } from '@/utils/auth';
import { getUserinfoApi } from '@/server/user';
import { useDispatch } from 'react-redux';
import { SET_USERINFO } from '@/store/contant';
/*
 采用高阶组件做路由守卫
 */

const indexRoute = '/home'
const loginRoute = '/login'
const whiteList = ['/login']

function ToLogin() {
  const navigateTo = useNavigate()
  useEffect(() => {
    navigateTo(loginRoute)
  }, [])
  return <div></div>
}

function ToHome() {
  const navigateTo = useNavigate()
  useEffect(() => {
    navigateTo(indexRoute)
  }, [])
  return <div></div>
}

function ToGetUserinfo() {
  const dispatch = useDispatch()
  const navigateTo = useNavigate()
  useEffect(() => {
    // 先请求用户信息
    getUserinfoApi().then(res => {
      console.log(res, 'user')
      dispatch({ type: SET_USERINFO, data: res.data })
      navigateTo(indexRoute)
    })
  }, [])
  return <div></div>
}

type RouteProps = {
  children?: React.ReactNode
}

const AuthRoute: React.FC<RouteProps> = (props) => {
  const location = useLocation()
  const { children } = props
  let hasToken = getToken()
  if (hasToken) {
    // 如果有token 且在登录页直接跳转首页
    // 获取用户信息
    const hasUserinfo = getUserinfo();
    if (!hasUserinfo) {
      return <ToGetUserinfo/>
    }
    if (location.pathname === loginRoute) {
      return <ToHome/>
    } else {
      return <>{ children }</>
    }
  } else {
    // 无token的状态下，如果跳转白名单，直接放行
    if (whiteList.indexOf(location.pathname) !== -1) {
      return <>{ children }</>
    } else {
      // 否在直接跳转登录页
      return <ToLogin></ToLogin>
    }
  }
}


export default AuthRoute
