import { Navigate, RouteObject } from 'react-router-dom'
import React, { lazy, ReactElement } from 'react';
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

type MetaType = {
  title: string
}

type RouteType = {
  path: string,
  element: ReactElement,
  children?: RouteType[],
  meta?: MetaType,
  index?: boolean
}

const routes: Array<RouteType> = [
  {
    path: '/',
    element: withLoadingComponent(<MyLayout/>),
    children: [
      {
        index: true,
        path: '/home',
        element: withLoadingComponent(<Home/>),
        meta: {
          title: '首页'
        },
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
