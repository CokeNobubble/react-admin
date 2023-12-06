import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getToken } from "@/utils/auth";
import { getRoutesApi, getUserinfoApi } from "@/server/user";
import { useDispatch, useSelector } from "react-redux";
import { SET_ROUTES, SET_USERINFO } from "@/store/contant";
import { IUserinfo } from "@/store/reducers/userinfo";
import { IState } from "@/interface";
import { generateRouter } from "@/utils/routes";
import { RouterBody } from "@/router";
import { routes } from "@/router";

/*
 采用高阶组件做路由守卫
 */

const indexRoute = "/home";
const loginRoute = "/login";
const whiteList = ["/login"];

function ToLogin() {
  const navigateTo = useNavigate();
  useEffect(() => {
    navigateTo(loginRoute);
  }, []);
  return <div></div>;
}

function ToHome() {
  const navigateTo = useNavigate();
  useEffect(() => {
    navigateTo(indexRoute);
  }, []);
  return <div></div>;
}

function ToGetUserinfo() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const location = useLocation();

  // 先请求用户信息
  async function getUserinfo() {
    return new Promise(async (resolve, reject) => {
      const res = await getUserinfoApi();
      dispatch({ type: SET_USERINFO, data: res.data });
      console.log("获取用户信息", res);
      resolve(res.data);
    });
  }

  // 获取路由表信息

  async function getDynamicRoute(data: IUserinfo) {
    const res = await getRoutesApi({ role: data.roles[0] });
    console.log("获取路由表", res);
    const asyncRoutes: RouterBody[] = generateRouter(res.data);
    dispatch({ type: SET_ROUTES, data: asyncRoutes });
    asyncRoutes.forEach((route: RouterBody) => {
      routes.unshift(route);
    });
    navigateTo(location.pathname);
  }

  useEffect(() => {
    getUserinfo().then((data) => {
      getDynamicRoute(data as IUserinfo);
    });
  }, []);
  return <div></div>;
}

type RouteProps = {
  children?: React.ReactNode;
};

const AuthRoute: React.FC<RouteProps> = (props) => {
  const location = useLocation();
  const userinfo: IUserinfo = useSelector(
    (state: IState) => state.userinfoReducer
  );
  const { children } = props;

  let hasToken = getToken();
  if (hasToken) {
    // 如果有token 且在登录页直接跳转首页
    // 获取用户信息

    const hasUserinfo = userinfo.roles && userinfo.roles.length > 0; // 这里到时候根据返回的用户权限数组去判断
    console.log(hasUserinfo, "hasUserinfo");
    if (!hasUserinfo) {
      return <ToGetUserinfo />;
    }

    if (location.pathname === loginRoute) {
      return <ToHome />;
    } else {
      return <>{children}</>;
    }
  } else {
    // 无token的状态下，如果跳转白名单，直接放行
    if (whiteList.indexOf(location.pathname) !== -1) {
      return <>{children}</>;
    } else {
      // 否在直接跳转登录页
      return <ToLogin></ToLogin>;
    }
  }
};

export default AuthRoute;
