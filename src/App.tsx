import { FC } from "react";
import { useRoutes } from "react-router-dom";
import routes from "@/router";

const App: FC = () => {
  //根据路由表生成对应的路由规则
  const element = useRoutes(routes);
  // 路由出口
  return <>{element}</>;
};

export default App;
