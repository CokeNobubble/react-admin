import { FC, useEffect } from "react";

import Router from "@/router";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import { useSelector } from "react-redux";
import { IState } from "@/interface";

const App: FC = () => {
  useEffect(() => {
    // 防止刷新页面后丢失主题
    document.documentElement.className = localStorage.getItem("theme") || "";
  }, []);
  //根据路由表生成对应的路由规则
  // const element = useRoutes(routes);
  // 路由出口
  const { themeColor } = useSelector((state: IState) => state.theme);
  const { themeMode } = useSelector((state: IState) => state.themeMode);
  const token = {
    colorPrimary: themeColor,
    colorBgLayout: "var(--colorBgLayout)",
    borderRadius: 3,
  };
  return (
    <ConfigProvider
      theme={{
        token: token,
        algorithm: themeMode,
      }}
      locale={zhCN}
    >
      {/*{element}*/}
      <Router />
    </ConfigProvider>
  );
};

export default App;
