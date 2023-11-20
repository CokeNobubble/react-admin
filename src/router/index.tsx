// // import { Navigate, RouteObject } from "react-router-dom";
// import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
// import React, { FC, lazy, ReactElement } from 'react';
// import { Spin } from 'antd';
import WebTitle from "@/components/WebTitle";
// import { Suspense } from 'react';
//
// // 路由懒加载切换路由loading效果（必做的）
// export const withLoadingComponent = (comp:any) => (
//     <Suspense
//         fallback={
//           <div className="w100% h100% flex justify-center items-center">
//             <Spin tip="Loading" size="large">
//               <div className="content"/>
//             </Spin>
//           </div>
//         }
//     >
//       { comp }
//     </Suspense>
// );
// const MyLayout = lazy(() => import('@/layout'));
// const Login = lazy(() => import('@/views/Login'));
// const NotFound = lazy(() => import('@/views/NotFound'));
// const Home = lazy(() => import('@/views/Home'));
// const DataCenter = lazy(() => import('@/views/DataCenter'));
// const PersonInfo = lazy(() => import('@/views/PersonInfo'));
// const SysManage = lazy(() => import('@/views/SysMag'));
// const UserManage = lazy(() => import('@/views/userMag'));
// const DepartmentMag = lazy(() => import('@/views/DepartmentMag'));
//
// const routes: Array<RouteObject> = [
//   {
//     path: '/',
//     element: withLoadingComponent(<MyLayout/>),
//     children: [
//       {
//         index: true,
//         path: 'home',
//         element: (
//             <WebTitle title="首页">{ withLoadingComponent(<Home/>) }</WebTitle>
//         ),
//       },
//       {
//         path: 'sysMag',
//         element: withLoadingComponent(<SysManage/>),
//       },
//       {
//         path: 'userMag',
//         element: (
//             <WebTitle title="用户管理">
//               { withLoadingComponent(<UserManage/>) }
//             </WebTitle>
//         ),
//       },
//       {
//         path: 'dataCenter',
//         element: (
//             <WebTitle title="数据中心">
//               { withLoadingComponent(<DataCenter/>) }
//             </WebTitle>
//         ),
//       },
//       {
//         path: 'personInfo',
//         element: (
//             <WebTitle title="个人信息">
//               { withLoadingComponent(<PersonInfo/>) }
//             </WebTitle>
//         ),
//       },
//       {
//         path: 'departmentMag',
//         element: (
//             <WebTitle title="部门管理">
//               { withLoadingComponent(<DepartmentMag/>) }
//             </WebTitle>
//         ),
//       }
//     ],
//   },
//   {
//     path: '/login',
//     element: (
//         <WebTitle title="登录">{ withLoadingComponent(<Login/>) }</WebTitle>
//     ),
//   },
//   {
//     path: '/',
//     element: <Navigate to="/home"></Navigate>,
//   },
//   {
//     path: '*',
//     element: (
//         <WebTitle title="404">
//           { withLoadingComponent(<NotFound/>) }
//         </WebTitle>
//     )
//   }
// ];
//
//
// export default routes;

import React, { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { Spin } from "antd";

interface Meta {
  title?: string;
  icon?: string | null;
}

export interface RouterBody {
  name?: string;
  path: string;
  component?: any;
  element?: any;
  children?: Array<RouterBody>;
  meta?: Meta;
}

export const routes: Array<RouterBody> = [
  {
    path: "/login",
    name: "login",
    component: lazy(() => import("@/views/Login")),
  },
  {
    path: '/home',
    component: lazy(() => import("@/views/Home")),
  },
  {
    path: "*",
    component: lazy(() => import("@/views/NotFound")),
  },
];

// 路由处理方式
const withLoadingComponent = (routers: Array<RouterBody>): any => {
  return routers.map((item) => {
    if (item.children) {
      item.children = withLoadingComponent(item.children);
    }
    item.element = (
      <Suspense
        fallback={
          <div className="wh-full f-c-c">
            <Spin tip="Loading" size="large">
              <div className="content" />
            </Spin>
          </div>
        }
      >
        {/* 把懒加载的异步路由变成组件装载进去 */}
        <item.component />
      </Suspense>
    );
    return item;
  });
};

// 必须这样子，不然会报什么hook错误的问题

const Router = () => useRoutes(withLoadingComponent(routes));

export default Router;
