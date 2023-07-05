import { Navigate, RouteObject } from 'react-router-dom'
import React, { lazy } from 'react';
import { Spin } from 'antd';

// 路由来加载切换路由loading效果（必做的）
const withLoadingComponent = (comp: JSX.Element) => (
    <React.Suspense fallback={
      <div className="w100% h100% flex justify-center items-center">
        <Spin tip="Loading" size="large">
          <div className="content"/>
        </Spin>
      </div>
    }>{ comp }</React.Suspense>
)
const MyLayout = lazy(() => import('@/layout/index'))
const Login = lazy(() => import('@/views/Login'))
const Home = lazy(() => import('@/views/Home'))
const DataCenter = lazy(() => import('@/views/DataCenter'))
const PersonInfo = lazy(() => import('@/views/PersonInfo'))
const routes: Array<RouteObject> = [
  {
    path: '/',
    element: withLoadingComponent(<MyLayout/>),
    children: [
      {
        index: true,
        path: '/home',
        element: withLoadingComponent(<Home/>)
      },
      {
        path: '/dataCenter',
        element: withLoadingComponent(<DataCenter/>)
      },
      {
        path: '/personInfo',
        element: withLoadingComponent(<PersonInfo/>)
      },
    ]
  },
  {
    path: '/login',
    element: withLoadingComponent(<Login/>)
  },
  {
    path: '/',
    element: <Navigate to={ '/home' }></Navigate>
  }
]

export default routes
