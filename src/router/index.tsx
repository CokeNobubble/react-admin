import { Navigate, RouteObject } from "react-router-dom";
import React, { lazy, ReactElement } from "react";
import { Spin } from "antd";

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

type MetaType = {
  title: string;
};

type RouteType = {
  path: string;
  element: ReactElement;
  children?: RouteType[];
  meta?: MetaType;
  index?: boolean;
};

const routes: Array<RouteObject> = [
  {
    path: "/",
    element: withLoadingComponent(<MyLayout />),
    children: [
      {
        index: true,
        path: "home",
        element: withLoadingComponent(<Home />),
      },
      {
        path: "sysMag",
        element: withLoadingComponent(<SysManage />),
      },
      {
        path: "userMag",
        element: withLoadingComponent(<UserManage />),
      },
      {
        path: "dataCenter",
        element: withLoadingComponent(<DataCenter />),
      },
      {
        path: "personInfo",
        element: withLoadingComponent(<PersonInfo />),
      },
    ],
  },
  {
    path: "/login",
    element: withLoadingComponent(<Login />),
  },
  {
    path: "/",
    element: <Navigate to="/home"></Navigate>,
  },
];

export default routes;
