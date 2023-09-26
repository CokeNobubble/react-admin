// import { Navigate, RouteObject } from "react-router-dom";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import React, { FC, lazy, ReactElement } from "react";
import { Spin } from "antd";

import WebTitle from "@/components/WebTitle";

// 路由懒加载切换路由loading效果（必做的）
const withLoadingComponent = (comp: JSX.Element) => (
  <React.Suspense
    fallback={
      <div className="w100% h100% flex justify-center items-center">
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      </div>
    }
  >
    {comp}
  </React.Suspense>
);
const MyLayout = lazy(() => import("@/layout/index"));
const Login = lazy(() => import("@/views/Login/Login"));
const Home = lazy(() => import("@/views/Home/Home"));
const DataCenter = lazy(() => import("@/views/DataCenter/DataCenter"));
const PersonInfo = lazy(() => import("@/views/PersonInfo/PersonInfo"));
const SysManage = lazy(() => import("@/views/SysMag/SysManage"));
const UserManage = lazy(() => import("@/views/SysMag/userMag/UserManage"));

const routes: Array<RouteObject> = [
  {
    path: "/",
    element: withLoadingComponent(<MyLayout />),
    children: [
      {
        index: true,
        path: "home",
        element: (
          <WebTitle title="首页">{withLoadingComponent(<Home />)}</WebTitle>
        ),
      },
      {
        path: "sysMag",
        element: withLoadingComponent(<SysManage />),
      },
      {
        path: "userMag",
        element: (
          <WebTitle title="用户管理">
            {withLoadingComponent(<UserManage />)}
          </WebTitle>
        ),
      },
      {
        path: "dataCenter",
        element: (
          <WebTitle title="数据中心">
            {withLoadingComponent(<DataCenter />)}
          </WebTitle>
        ),
      },
      {
        path: "personInfo",
        element: (
          <WebTitle title="个人中心">
            {withLoadingComponent(<PersonInfo />)}
          </WebTitle>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <WebTitle title="登录">{withLoadingComponent(<Login />)}</WebTitle>
    ),
  },
  {
    path: "/",
    element: <Navigate to="/home"></Navigate>,
  },
];

export default routes;
