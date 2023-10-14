import { FC } from "react";
import { useRoutes } from "react-router-dom";
// import routes from "@/router";

import Router from '@/router';
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import { useSelector } from "react-redux";
import { IState } from "@/interface";

const App: FC = () => {
  //根据路由表生成对应的路由规则
  // const element = useRoutes(routes);
  // 路由出口
  const { themeColor } = useSelector((state: IState) => state.theme);
  const { themeMode } = useSelector((state: IState) => state.themeMode);
  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: themeColor }, algorithm: themeMode }}
      locale={zhCN}
    >
      {/*{element}*/}
      <Router />
    </ConfigProvider>
  );
};

export default App;
